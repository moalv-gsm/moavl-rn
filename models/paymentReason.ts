import { QueryDocumentSnapshot, type DocumentData, type SnapshotOptions } from "firebase/firestore"
import type { ETypePaymentReason } from "~/enums"

export interface IPaymentReason {
  id: string
  name: string
  type: ETypePaymentReason
  isCalculated: boolean
}

export class PaymentReason implements Omit<IPaymentReason, "id"> {
  name: string
  type: ETypePaymentReason
  isCalculated: boolean

  constructor(name: string, type: ETypePaymentReason, isCalculated: boolean) {
    this.name = name
    this.type = type
    this.isCalculated = isCalculated
  }
}

export const paymentReasonConverter = {
  toFirestore: (paymentReason: IPaymentReason) => {
    return {
      name: paymentReason.name,
      type: paymentReason.type,
      isCalculated: paymentReason.isCalculated ?? null,
    }
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot<IPaymentReason, DocumentData>, options: SnapshotOptions) => {
    const data = snapshot.data(options)
    data.id = snapshot.id
    return data
  },
}
