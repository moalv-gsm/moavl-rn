import { QueryDocumentSnapshot, type DocumentData, type SnapshotOptions } from "firebase/firestore"

export interface IVehicle {
  id: string
  name: string
  licensePlate: string
  isBusy: boolean
}

export class Vehicle implements Omit<IVehicle, "id"> {
  name: string
  licensePlate: string
  isBusy: boolean

  constructor(name: string, licensePlate: string, isBusy: boolean) {
    this.name = name
    this.licensePlate = licensePlate
    this.isBusy = isBusy
  }
}

export const vehicleConverter = {
  toFirestore: (vehicle: IVehicle) => {
    return {
      name: vehicle.name,
      licensePlate: vehicle.licensePlate,
      isBusy: vehicle.isBusy ?? false,
    }
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot<IVehicle, DocumentData>, options: SnapshotOptions) => {
    const data = snapshot.data(options)
    data.id = snapshot.id
    return data
  },
}
