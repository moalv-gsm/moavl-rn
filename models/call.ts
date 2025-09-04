import { QueryDocumentSnapshot, Timestamp, type DocumentData, type SnapshotOptions } from "firebase/firestore"
import type { Dayjs } from "dayjs"
import type { IAudit } from "./audit"

export interface ICall extends IAudit {
  id: string
  date: Dayjs | Timestamp | Date
  description: string
  uid: string
}

export class Call implements Omit<ICall, "id"> {
  date: Dayjs | Timestamp | Date
  description: string
  uid: string
  updatedAt: Dayjs | Timestamp | Date
  createdAt: Dayjs | Timestamp | Date

  constructor(
    date: Dayjs | Timestamp | Date,
    description: string,
    uid: string,
    updatedAt: Dayjs | Timestamp | Date,
    createdAt: Dayjs | Timestamp | Date,
  ) {
    this.date = date
    this.description = description
    this.uid = uid
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}

export const callConverter = {
  toFirestore: (call: ICall) => {
    return {
      date: call.date,
      description: call.description,
      uid: call.uid,
      createdAt: call.createdAt,
      updatedAt: call.updatedAt,
    }
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot<ICall, DocumentData>, options: SnapshotOptions) => {
    const data = snapshot.data(options)
    data.id = snapshot.id
    data.date = (snapshot.data().date as Timestamp)?.toDate()
    data.createdAt = (snapshot.data().createdAt as Timestamp)?.toDate()
    data.updatedAt = (snapshot.data().updatedAt as Timestamp)?.toDate()
    return data
  },
}
