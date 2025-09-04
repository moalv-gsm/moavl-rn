import { QueryDocumentSnapshot, type DocumentData, type SnapshotOptions } from "firebase/firestore"
import type { ERole } from "~/enums"

export interface IUser {
  id: string
  name: string
  role: ERole
  email: string
  password: string
}

export class User implements Omit<IUser, "id"> {
  name: string
  role: ERole
  email: string
  password: string

  constructor(name: string, role: ERole, email: string, password: string) {
    this.name = name
    this.role = role
    this.email = email
    this.password = password
  }
}

export const userConverter = {
  toFirestore: (user: IUser) => {
    return {
      name: user.name,
      role: user.role,
      email: user.email,
      password: user.password,
    }
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot<IUser, DocumentData>, options: SnapshotOptions) => {
    const data = snapshot.data(options)
    data.id = snapshot.id
    return data
  },
}
