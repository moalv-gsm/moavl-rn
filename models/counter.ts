import { QueryDocumentSnapshot, type DocumentData, type SnapshotOptions } from "firebase/firestore"

export interface ICounter {
  id: string
  count: number
}

export class Counter implements Omit<ICounter, "id"> {
  count: number

  constructor(count: number) {
    this.count = count
  }
}

export const counterConverter = {
  toFirestore: (counter: ICounter) => {
    return {
      count: counter.count,
    }
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot<ICounter, DocumentData>, options: SnapshotOptions) => {
    const data = snapshot.data(options)
    data.id = snapshot.id
    return data
  },
}
