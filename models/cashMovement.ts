import { QueryDocumentSnapshot, type DocumentData, type SnapshotOptions, Timestamp } from "firebase/firestore"
import type { Dayjs } from "dayjs"
import type { IPaymentReason } from "./paymentReason"
import { EBank, type EWayToPay } from "~/enums"

export interface ICashMovement {
  id: string
  wayToPay: EWayToPay
  paymentReason: IPaymentReason
  rode: number
  description: string
  createdAt: Timestamp | Dayjs | Date
  distributionId: string
  uid: string
  bank: EBank

  timestamp: Timestamp | Dayjs | Date
  updatedAt: Timestamp | Dayjs | Date

  createdAtForm?: Dayjs
}

export class CashMovement implements Omit<ICashMovement, "id"> {
  wayToPay: EWayToPay
  paymentReason: IPaymentReason
  rode: number
  description: string
  createdAt: Timestamp | Dayjs | Date
  distributionId: string
  uid: string
  bank: EBank
  timestamp: Timestamp | Dayjs | Date
  updatedAt: Timestamp | Dayjs | Date

  constructor(
    wayToPay: EWayToPay,
    paymentReason: IPaymentReason,
    rode: number,
    description: string,
    createdAt: Timestamp | Dayjs | Date,
    distributionId: string,
    uid: string,
    bank: EBank,
    timestamp: Timestamp | Dayjs | Date,
    updatedAt: Timestamp | Dayjs | Date,
  ) {
    this.wayToPay = wayToPay
    this.paymentReason = paymentReason
    this.rode = rode
    this.description = description
    this.createdAt = createdAt
    this.distributionId = distributionId
    this.uid = uid
    this.bank = bank
    this.timestamp = timestamp
    this.updatedAt = updatedAt
  }
}

export const cashMovementConverter = {
  toFirestore: (cashMovement: ICashMovement) => {
    return {
      wayToPay: cashMovement.wayToPay,
      paymentReason: cashMovement.paymentReason,
      rode: cashMovement.rode,
      description: cashMovement.description ?? null,
      createdAt: cashMovement.createdAt,
      distributionId: cashMovement.distributionId ?? null,
      uid: cashMovement.uid,
      bank: cashMovement.bank ?? null,
      timestamp: cashMovement.timestamp ?? null,
      updatedAt: cashMovement.updatedAt ?? null,
    }
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot<ICashMovement, DocumentData>, options: SnapshotOptions) => {
    const data = snapshot.data(options)
    data.id = snapshot.id
    data.createdAt = (snapshot.data().createdAt as Timestamp)?.toDate()
    data.updatedAt = (snapshot.data().updatedAt as Timestamp)?.toDate()
    data.timestamp = (snapshot.data().timestamp as Timestamp)?.toDate()
    return data
  },
}
