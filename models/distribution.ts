import type { Dayjs } from "dayjs"
import { QueryDocumentSnapshot, type DocumentData, type SnapshotOptions, Timestamp } from "firebase/firestore"
import type { IMovement } from "./movement"
import type { IUser } from "./user"
import type { IVehicle } from "./vehicle"
import type { IAudit } from "./audit"
import type { EStatusDistribution } from "~/enums"

export interface IDistribution extends IAudit {
  id: string
  openingDate: Dayjs | Timestamp | Date
  deadline: Dayjs | Timestamp | Date
  status: EStatusDistribution
  initialRode: number
  observation: string
  user: IUser
  vehicle: IVehicle
  movements: IMovement[]
  uid: string
}

export class Distribution implements Omit<IDistribution, "id"> {
  openingDate: Dayjs | Timestamp | Date
  deadline: Dayjs | Timestamp | Date
  status: EStatusDistribution
  initialRode: number
  observation: string
  user: IUser
  vehicle: IVehicle
  movements: IMovement[]
  uid: string
  updatedAt: Dayjs | Timestamp | Date
  createdAt: Dayjs | Timestamp | Date

  constructor(
    openingDate: Dayjs | Timestamp | Date,
    deadline: Dayjs | Timestamp | Date,
    status: EStatusDistribution,
    initialRode: number,
    observation: string,
    user: IUser,
    vehicle: IVehicle,
    movements: IMovement[],
    uid: string,
    updatedAt: Dayjs | Timestamp | Date,
    createdAt: Dayjs | Timestamp | Date,
  ) {
    this.openingDate = openingDate
    this.deadline = deadline
    this.status = status
    this.initialRode = initialRode
    this.observation = observation
    this.user = user
    this.vehicle = vehicle
    this.movements = movements
    this.uid = uid
    this.updatedAt = updatedAt
    this.createdAt = createdAt
  }
}

export const distributionConverter = {
  toFirestore: (distribution: IDistribution) => {
    return {
      openingDate: distribution.openingDate,
      deadline: distribution.deadline ?? null,
      status: distribution.status,
      initialRode: distribution.initialRode ?? null,
      observation: distribution.observation ?? null,
      user: distribution.user ?? null,
      vehicle: distribution.vehicle,
      movements: distribution.movements,
      uid: distribution.uid,
      updatedAt: distribution.updatedAt ?? null,
      createdAt: distribution.createdAt ?? null,
    }
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot<IDistribution, DocumentData>, options: SnapshotOptions) => {
    const data = snapshot.data(options)

    data.id = snapshot.id
    data.openingDate = (data.openingDate as Timestamp)?.toDate()
    data.deadline = (data.deadline as Timestamp)?.toDate()
    data.updatedAt = (data.updatedAt as Timestamp)?.toDate()
    data.createdAt = (data.createdAt as Timestamp)?.toDate()

    return data
  },
}
