import { QueryDocumentSnapshot, type DocumentData, type SnapshotOptions } from "firebase/firestore"

export interface IZone {
  id: string
  name: string
}

export class Zone implements Omit<IZone, "id"> {
  name: string

  constructor(name: string) {
    this.name = name
  }
}

export const zoneConverter = {
  toFirestore: (zone: IZone) => {
    return {
      name: zone.name,
    }
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot<IZone, DocumentData>, options: SnapshotOptions) => {
    const data = snapshot.data(options)
    data.id = snapshot.id
    return data
  },
}
