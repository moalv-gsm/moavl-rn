import { QueryDocumentSnapshot, type DocumentData, type SnapshotOptions } from "firebase/firestore"

export interface ICategoryCustomer {
  id: string
  name: string
}

export class CategoryCustomer implements Omit<ICategoryCustomer, "id"> {
  name: string

  constructor(name: string) {
    this.name = name
  }
}

export const categoryCustomerConverter = {
  toFirestore: (categoryCustomer: ICategoryCustomer) => {
    return {
      name: categoryCustomer.name,
    }
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot<ICategoryCustomer, DocumentData>, options: SnapshotOptions) => {
    const data = snapshot.data(options)
    data.id = snapshot.id
    return data
  },
}
