import { QueryDocumentSnapshot, type DocumentData, type SnapshotOptions, Timestamp } from "firebase/firestore"
import type { Dayjs } from "dayjs"
import type { IAudit } from "./audit"
import { EWayToPay, EStatusVoucher, ETypeVoucher } from "~/enums"
import type { IVoucherResponse } from "~/interfaces/sunat/voucher"
import type { IGuideResponse } from "~/interfaces/sunat/guides"
import type { IMovement } from "./movement"
import type { IEnvaseOfCustomer } from "./customer"

interface INubeFactGuideResponse extends IAudit {
  response: IGuideResponse
  uid: string
}

interface INubeFactVoucherResponse extends IAudit {
  voucherIds: string[]
  response: IVoucherResponse
  uid: string
}

export interface IVoucher extends IAudit {
  id: string
  numberOrder: number
  date: Dayjs | Timestamp | Date
  dateProcess: Dayjs | Timestamp | Date
  customer: { id: string; name: string }
  type: ETypeVoucher
  status: EStatusVoucher
  origin: string
  address: string
  reference: string
  coordenada: string
  paymentType: EWayToPay
  debtPaid: number
  totalPaid: number
  total: number
  isPaid: boolean
  observation: string
  movements: IMovement[]
  envases: IEnvaseOfCustomer[]
  uid: string
  nubeFactGuideResponse: INubeFactGuideResponse
  nubeFactVoucherResponse: INubeFactVoucherResponse
}

export class Voucher implements Omit<IVoucher, "id"> {
  numberOrder: number
  date: Dayjs | Timestamp | Date
  dateProcess: Dayjs | Timestamp | Date
  customer: { id: string; name: string }
  type: ETypeVoucher
  status: EStatusVoucher
  origin: string
  address: string
  reference: string
  coordenada: string
  paymentType: EWayToPay
  debtPaid: number
  totalPaid: number
  total: number
  isPaid: boolean
  observation: string
  movements: IMovement[]
  envases: IEnvaseOfCustomer[]
  uid: string
  nubeFactGuideResponse: INubeFactGuideResponse
  nubeFactVoucherResponse: INubeFactVoucherResponse
  updatedAt: Dayjs | Timestamp | Date
  createdAt: Dayjs | Timestamp | Date

  constructor(
    numberOrder: number,
    date: Dayjs | Timestamp | Date,
    dateProcess: Dayjs | Timestamp | Date,
    customer: { id: string; name: string },
    type: ETypeVoucher,
    status: EStatusVoucher,
    origin: string,
    address: string,
    reference: string,
    coordenada: string,
    paymentType: EWayToPay,
    debtPaid: number,
    totalPaid: number,
    total: number,
    isPaid: boolean,
    observation: string,
    movements: IMovement[],
    envases: IEnvaseOfCustomer[],
    uid: string,
    nubeFactGuideResponse: INubeFactGuideResponse,
    nubeFactVoucherResponse: INubeFactVoucherResponse,
    updatedAt: Dayjs | Timestamp | Date,
    createdAt: Dayjs | Timestamp | Date,
  ) {
    this.numberOrder = numberOrder
    this.date = date
    this.dateProcess = dateProcess
    this.customer = customer
    this.type = type
    this.status = status
    this.origin = origin
    this.address = address
    this.reference = reference
    this.coordenada = coordenada
    this.paymentType = paymentType
    this.debtPaid = debtPaid
    this.totalPaid = totalPaid
    this.total = total
    this.isPaid = isPaid
    this.observation = observation
    this.movements = movements
    this.envases = envases
    this.uid = uid
    this.nubeFactGuideResponse = nubeFactGuideResponse
    this.nubeFactVoucherResponse = nubeFactVoucherResponse
    this.updatedAt = updatedAt
    this.createdAt = createdAt
  }
}

export const voucherConverter = {
  toFirestore: (voucher: IVoucher) => {
    return {
      numberOrder: voucher.numberOrder ?? null,
      date: voucher.date,
      dateProcess: voucher.dateProcess ?? null,
      customer: voucher.customer,
      type: voucher.type,
      status: voucher.status,
      origin: voucher.origin,
      address: voucher.address ?? null,
      reference: voucher.reference ?? null,
      coordenada: voucher.coordenada ?? null,
      paymentType: voucher.paymentType ?? null,
      debtPaid: voucher.debtPaid ?? null,
      totalPaid: voucher.totalPaid ?? null,
      total: voucher.total,
      isPaid: voucher.isPaid ?? false,
      observation: voucher.observation ?? null,
      movements: voucher.movements ?? null,
      envases: voucher.envases ?? null,
      uid: voucher.uid,
      nubeFactGuideResponse: voucher.nubeFactGuideResponse ?? null,
      nubeFactVoucherResponse: voucher.nubeFactVoucherResponse ?? null,
      updatedAt: voucher.updatedAt ?? null,
      createdAt: voucher.createdAt,
    }
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot<IVoucher, DocumentData>, options: SnapshotOptions) => {
    const data = snapshot.data(options)

    data.id = snapshot.id
    data.date = (data.date as Timestamp)?.toDate()
    data.dateProcess = (data.dateProcess as Timestamp)?.toDate()
    data.updateAt = (data.updateAt as Timestamp)?.toDate()
    data.updatedAt = (data.updatedAt as Timestamp)?.toDate()
    data.createdAt = (data.createdAt as Timestamp)?.toDate()

    if (data.nubeFactGuideResponse) {
      data.nubeFactGuideResponse.updatedAt = (data.nubeFactGuideResponse.updatedAt as Timestamp)?.toDate()
      data.nubeFactGuideResponse.createdAt = (data.nubeFactGuideResponse.createdAt as Timestamp)?.toDate()
    }

    if (data.nubeFactVoucherResponse) {
      data.nubeFactVoucherResponse.updatedAt = (data.nubeFactVoucherResponse.updatedAt as Timestamp)?.toDate()
      data.nubeFactVoucherResponse.createdAt = (data.nubeFactVoucherResponse.createdAt as Timestamp)?.toDate()
    }

    return data
  },
}
