import { QueryDocumentSnapshot, type DocumentData, type SnapshotOptions } from "firebase/firestore"

export interface IBrand {
  id: string
  name: string
}

export class Brand implements Omit<IBrand, "id"> {
  name: string

  constructor(name: string) {
    this.name = name
  }
}

export const brandConverter = {
  toFirestore: (brand: IBrand) => {
    return {
      name: brand.name,
    }
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot<IBrand, DocumentData>, options: SnapshotOptions) => {
    const data = snapshot.data(options)
    data.id = snapshot.id
    return data
  },
}
