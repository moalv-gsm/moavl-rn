import { QueryDocumentSnapshot, type DocumentData, type SnapshotOptions, Timestamp } from "firebase/firestore"
import type { Dayjs } from "dayjs"
import type { IAudit } from "./audit"
import type { IVoucherResponse } from "~/interfaces/sunat/voucher"

export interface ISunatVoucher extends IAudit {
  id: string
  voucherIds: string[]
  nubeFactVoucherResponse: IVoucherResponse
  uid: string
}

export class SunatVoucher implements Omit<ISunatVoucher, "id"> {
  voucherIds: string[]
  nubeFactVoucherResponse: IVoucherResponse
  uid: string
  updatedAt: Dayjs | Timestamp | Date
  createdAt: Dayjs | Timestamp | Date

  constructor(
    voucherIds: string[],
    nubeFactVoucherResponse: IVoucherResponse,
    uid: string,
    updatedAt: Dayjs | Timestamp | Date,
    createdAt: Dayjs | Timestamp | Date,
  ) {
    this.voucherIds = voucherIds
    this.nubeFactVoucherResponse = nubeFactVoucherResponse
    this.uid = uid
    this.updatedAt = updatedAt
    this.createdAt = createdAt
  }
}

export const SunatVoucherConverter = {
  toFirestore: (SunatVoucher: ISunatVoucher) => {
    return {
      voucherIds: SunatVoucher.voucherIds,
      nubeFactVoucherResponse: SunatVoucher.nubeFactVoucherResponse,
      uid: SunatVoucher.uid,
      updatedAt: SunatVoucher.updatedAt,
      createdAt: SunatVoucher.createdAt,
    }
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot<ISunatVoucher, DocumentData>, options: SnapshotOptions) => {
    const data = snapshot.data(options)
    data.id = snapshot.id
    data.updatedAt = (data.updatedAt as Timestamp)?.toDate()
    data.createdAt = (data.createdAt as Timestamp)?.toDate()
    return data
  },
}
