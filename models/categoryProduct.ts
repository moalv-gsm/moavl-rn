import { QueryDocumentSnapshot, type DocumentData, type SnapshotOptions } from "firebase/firestore"

export interface ICategoryProduct {
  id: string
  name: string
}

export class CategoryProduct implements Omit<ICategoryProduct, "id"> {
  name: string

  constructor(name: string) {
    this.name = name
  }
}

export const categoryProductConverter = {
  toFirestore: (categoryProduct: ICategoryProduct) => {
    return {
      name: categoryProduct.name,
    }
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot<ICategoryProduct, DocumentData>, options: SnapshotOptions) => {
    const data = snapshot.data(options)
    data.id = snapshot.id
    return data
  },
}
