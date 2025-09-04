import { QueryDocumentSnapshot, type DocumentData, type SnapshotOptions, Timestamp } from "firebase/firestore"
import type { Dayjs } from "dayjs"
import type { IAudit } from "./audit"
import type { IProductMovement } from "./product"
import type { IUselessReason } from "./uselessReason"

export interface IMovement extends IAudit {
  id: string
  date: Dayjs | Timestamp | Date
  dateBatch: Dayjs | Timestamp | Date
  codeBatch: string
  quantity: number
  price: number
  product: IProductMovement
  description: string
  isDistribution: boolean
  uid: string
  isSale: boolean
  isChange: boolean
  isUseless: boolean
  uselessReason?: IUselessReason
  quantityBatch?: number
  quantityCurrent?: number
  quantityManaged?: number
}

export class Movement implements Omit<IMovement, "id"> {
  date: Dayjs | Timestamp | Date
  dateBatch: Dayjs | Timestamp | Date
  codeBatch: string
  quantity: number
  price: number
  product: IProductMovement
  description: string
  isDistribution: boolean
  uid: string
  isSale: boolean
  isChange: boolean
  isUseless: boolean
  uselessReason: IUselessReason
  updatedAt: Dayjs | Timestamp | Date
  createdAt: Dayjs | Timestamp | Date

  constructor(
    date: Dayjs | Timestamp | Date,
    dateBatch: Dayjs | Timestamp | Date,
    codeBatch: string,
    quantity: number,
    price: number,
    product: IProductMovement,
    description: string,
    isDistribution: boolean,
    uid: string,
    isSale: boolean,
    isChange: boolean,
    isUseless: boolean,
    uselessReason: IUselessReason,
    updatedAt: Dayjs | Timestamp | Date,
    createdAt: Dayjs | Timestamp | Date,
  ) {
    this.date = date
    this.dateBatch = dateBatch
    this.codeBatch = codeBatch
    this.quantity = quantity
    this.price = price
    this.product = product
    this.description = description
    this.isDistribution = isDistribution
    this.uid = uid
    this.isSale = isSale
    this.isChange = isChange
    this.isUseless = isUseless
    this.uselessReason = uselessReason
    this.updatedAt = updatedAt
    this.createdAt = createdAt
  }
}

export const movementConverter = {
  toFirestore: (movement: IMovement) => {
    return {
      date: movement.date,
      dateBatch: movement.dateBatch,
      codeBatch: movement.codeBatch,
      quantity: movement.quantity,
      price: movement.price ?? 0,
      product: movement.product,
      description: movement.description,
      isDistribution: movement.isDistribution ?? false,
      uid: movement.uid ?? null,
      isSale: movement.isSale ?? true,
      isChange: movement.isChange ?? false,
      isUseless: movement.isUseless ?? false,
      uselessReason: movement.uselessReason ?? null,
      updatedAt: movement.updatedAt ?? null,
      createdAt: movement.createdAt ?? null,
    }
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot<IMovement, DocumentData>, options: SnapshotOptions) => {
    const data = snapshot.data(options)

    data.id = snapshot.id
    data.date = (data.date as Timestamp)?.toDate()
    data.dateBatch = (data.dateBatch as Timestamp)?.toDate()
    data.updatedAt = (data.updatedAt as Timestamp)?.toDate()
    data.createdAt = (data.createdAt as Timestamp)?.toDate()

    return data
  },
}
