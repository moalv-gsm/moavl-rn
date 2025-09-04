import {
  collection,
  db,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "@/lib/firebase/firebaseConfig";
import { IAudit } from "@/models/audit";
import { Dayjs } from "dayjs";
import {
  DocumentData,
  FirestoreDataConverter,
  getDoc,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
  WithFieldValue,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

type Primitive = string | number | boolean | Date;
type MatchMode =
  | "equals"
  | "startsWith"
  | "array-contains"
  | "array-contains-any"
  | "in";
interface PaginationState {
  pageSize: number;
  currentPageIndex: number;
  total: number;
  cursors: { first: any | null; last: any | null }[];
}
interface SortState {
  sortBy: string;
  sortDir: "asc" | "desc";
}
interface ICreateConverter extends IAudit {
  id: string;
  date?: Dayjs | Timestamp | Date;
}

function createConverter<
  T extends ICreateConverter
>(): FirestoreDataConverter<T> {
  return {
    toFirestore(modelObject: WithFieldValue<T>): DocumentData {
      // 🔹 eliminamos `id` antes de guardar
      const { id, ...rest } = modelObject as any;
      return rest;
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): T {
      const data = snapshot.data(options);

      // 🔹 Convertir fechas de Timestamp a Date
      data.id = snapshot.id;
      data.date = (data.date as Timestamp)?.toDate();
      data.createdAt = (data.createdAt as Timestamp)?.toDate();
      data.updatedAt = (data.updatedAt as Timestamp)?.toDate();

      return data as T;
    },
  };
}

const useFirestoreCrud = <T extends ICreateConverter>(
  collectionPath: string,
  defaultFilters: Record<string, any>,
  defaultSort: SortState
) => {
  const converter = createConverter<T>();
  const colRef = collection(db, collectionPath).withConverter(converter);

  const [items, setItems] = useState<T[]>([]);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [item, setItem] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>(defaultFilters);
  const [sort, setSort] = useState<SortState>(defaultSort);
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: 10,
    currentPageIndex: 0,
    total: 0,
    cursors: [],
  });

  const buildQuery = useCallback(
    (extra: any[] = [], withLimit = true) => {
      const constraints: any[] = [];

      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "" && value !== "all") {
          constraints.push(where(key, "==", value));
        }
      });

      // Apply sorting
      constraints.push(orderBy(sort.sortBy, sort.sortDir));

      // Apply pagination limit
      if (withLimit) constraints.push(limit(pagination.pageSize));

      // Apply extra constraints
      constraints.push(...extra);

      return query(colRef, ...constraints);
    },
    [filters, sort, pagination.pageSize]
  );

  const subscribe = useCallback(
    async (extra: any[] = []) => {
      setLoading(true);
      const q = buildQuery(extra);

      const unsubscribe = onSnapshot(q, (snap) => {
        setItems(snap.docs.map((d) => d.data() as T));

        if (snap.docs.length > 0) {
          setPagination((prevState) => ({
            ...prevState,
            cursors: [
              ...prevState.cursors,
              { first: snap.docs[0], last: snap.docs[snap.docs.length - 1] },
            ],
          }));
        }

        setLoading(false);
      });

      return unsubscribe;
    },
    [buildQuery]
  );

  const add = async (data: Omit<T, "id">) => {
    const refDoc = doc(colRef);
    await setDoc(refDoc, data);
    return refDoc.id;
  };

  const update = async (id: string, data: Partial<T>) => {};

  const remove = async (id: string) => {
    await deleteDoc(doc(colRef, id));
  };

  const getByField = async (
    fieldPath: string,
    value: Primitive | Primitive[],
    matchMode: MatchMode = "equals"
  ) => {
    const constraints: any[] = [];

    switch (matchMode) {
      case "equals":
        constraints.push(where(fieldPath, "==", value));
        break;
      case "startsWith": {
        const val = (value as string).toLowerCase();
        constraints.push(where(fieldPath, ">=", val));
        constraints.push(where(fieldPath, "<", val + "\uf8ff"));
        break;
      }
      case "array-contains":
        constraints.push(where(fieldPath, "array-contains", value));
        break;
      case "array-contains-any":
        constraints.push(
          where(fieldPath, "array-contains-any", value as Primitive[])
        );
        break;
      case "in":
        constraints.push(where(fieldPath, "in", value as Primitive[]));
        break;
    }

    const q = buildQuery(constraints, true);
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data());
  };

  const getById = async (id: string): Promise<T | null> => {
    if (!id || id.trim() === "") {
      setSelectedItem(null);
      return Promise.resolve(null);
    }

    const refDoc = doc(colRef, id).withConverter(converter);

    const snapshot = await getDoc(refDoc);
    return snapshot.data() as T;

    // return refDoc.ge().then((docSnapshot) => {
    //   if (docSnapshot.exists) {
    //     const data = docSnapshot.data() as T;
    //     setSelectedItem(data);
    //     return data;
    //   } else {
    //     setSelectedItem(null);
    //     return null;
    //   }
    // });
  };

  const fetchTotal = async () => {
    const q = buildQuery([], false);
    const snapshot = await getDocs(q);
    setPagination((prevState) => ({ ...prevState, total: snapshot.size }));
  };

  useEffect(() => {
    // Suscribirse
    const unsubscribe = subscribe();

    // Limpiar la suscripción cuando el componente se desmonte
    return () => {
      unsubscribe.then((unsubscribeFn) => {
        // Llamamos a la función de desinscripción
        unsubscribeFn();
      });
    };
  }, [subscribe]);

  return {
    items,
    selectedItem,
    loading,
    pagination,
    add,
    update,
    remove,
    subscribe,
    setFilters,
    setSort,
    setPagination,
    getByField,
    getById,
    fetchTotal,
  };
};

export default useFirestoreCrud;
