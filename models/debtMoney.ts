import type { Dayjs } from "dayjs"
import { QueryDocumentSnapshot, Timestamp, type DocumentData, type SnapshotOptions } from "firebase/firestore"

export interface IDebtMoney {
  id: string
  rode: number
  description: string
  createdAt: Dayjs | Timestamp | Date
  uid: string

  createdAtForm?: Dayjs
}

export class DebtMoney implements Omit<IDebtMoney, "id"> {
  rode: number
  description: string
  createdAt: Dayjs | Timestamp | Date
  uid: string

  constructor(rode: number, description: string, createdAt: Dayjs | Timestamp | Date, uid: string) {
    this.rode = rode
    this.description = description
    this.createdAt = createdAt
    this.uid = uid
  }
}

export const debtMoneyConverter = {
  toFirestore: (debt: IDebtMoney) => {
    return {
      rode: debt.rode,
      description: debt.description ?? null,
      createdAt: debt.createdAt,
      uid: debt.uid,
    }
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot<IDebtMoney, DocumentData>, options: SnapshotOptions) => {
    const data = snapshot.data(options)
    data.id = snapshot.id
    data.createdAt = (data.createdAt as Timestamp)?.toDate()
    return data
  },
}
