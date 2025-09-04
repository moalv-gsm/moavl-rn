import { QueryDocumentSnapshot, Timestamp, type DocumentData, type SnapshotOptions } from "firebase/firestore"
import type { Dayjs } from "dayjs"
import type { IAudit } from "./audit"
import type { ETypeProduct } from "~/enums"

export interface IUselessReason extends IAudit {
  id: string
  type: ETypeProduct
  name: string
}

export class UselessReason implements Omit<IUselessReason, "id"> {
  type: ETypeProduct
  name: string
  updatedAt: Dayjs
  createdAt: Dayjs

  constructor(type: ETypeProduct, name: string, updatedAt: Dayjs, createdAt: Dayjs) {
    this.type = type
    this.name = name
    this.updatedAt = updatedAt
    this.createdAt = createdAt
  }
}

export const uselessReasonConverter = {
  toFirestore: (uselessReason: IUselessReason) => {
    return {
      type: uselessReason.type,
      name: uselessReason.name,
      updatedAt: uselessReason.updatedAt,
      createdAt: uselessReason.createdAt,
    }
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot<IUselessReason, DocumentData>, options: SnapshotOptions) => {
    const data = snapshot.data(options)
    data.id = snapshot.id
    data.createdAt = (snapshot.data().createdAt as Timestamp)?.toDate()
    data.updatedAt = (snapshot.data().updatedAt as Timestamp)?.toDate()
    return data
  },
}
