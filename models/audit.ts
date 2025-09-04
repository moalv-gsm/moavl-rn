import type { Dayjs } from "dayjs"
import type { Timestamp } from "firebase/firestore"

export interface IAudit {
  updatedAt: Dayjs | Timestamp | Date
  createdAt: Dayjs | Timestamp | Date
}
