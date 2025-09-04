import type { Dayjs } from "dayjs"
import { QueryDocumentSnapshot, Timestamp, type DocumentData, type SnapshotOptions } from "firebase/firestore"
import type { IAudit } from "./audit"
import type { EBank, EWayToPay } from "~/enums"

export interface IDebt extends IAudit {
  id: string
  date: Timestamp | Dayjs | Date
  rode: number
  wayToPay: EWayToPay
  description: string
  bank: EBank
  uid: string
}

export class Debt implements Omit<IDebt, "id"> {
  date: Timestamp | Dayjs | Date
  rode: number
  wayToPay: EWayToPay
  description: string
  uid: string
  bank: EBank
  updatedAt: Timestamp | Dayjs | Date
  createdAt: Timestamp | Dayjs | Date

  constructor(
    date: Timestamp | Dayjs | Date,
    rode: number,
    wayToPay: EWayToPay,
    description: string,
    bank: EBank,
    uid: string,
    updatedAt: Timestamp | Dayjs | Date,
    createdAt: Timestamp | Dayjs | Date,
  ) {
    this.date = date
    this.rode = rode
    this.wayToPay = wayToPay
    this.description = description
    this.createdAt = createdAt
    this.bank = bank
    this.uid = uid
    this.updatedAt = updatedAt
    this.createdAt = createdAt
  }
}

export const debtConverter = {
  toFirestore: (debt: IDebt) => {
    return {
      date: debt.date,
      rode: debt.rode,
      wayToPay: debt.wayToPay,
      description: debt.description ?? null,
      bank: debt.bank ?? null,
      uid: debt.uid,
      updatedAt: debt.updatedAt ?? null,
      createdAt: debt.createdAt,
    }
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot<IDebt, DocumentData>, options: SnapshotOptions) => {
    const data = snapshot.data(options)

    data.id = snapshot.id
    data.date = (data.date as Timestamp)?.toDate()
    data.updatedAt = (data.updatedAt as Timestamp)?.toDate()
    data.createdAt = (data.createdAt as Timestamp)?.toDate()

    return data
  },
}
