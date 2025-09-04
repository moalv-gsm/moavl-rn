import { QueryDocumentSnapshot, type DocumentData, type SnapshotOptions, Timestamp, GeoPoint } from "firebase/firestore"
import type { Dayjs } from "dayjs"
import type { IZone } from "./zone"
import type { ICategoryCustomer } from "./categoryCustomer"
import type { IAudit } from "./audit"
import type { IProduct } from "./product"

export interface ILocation {
  name: string
  geohash: string
  location: GeoPoint
}
export interface IEnvaseOfCustomer {
  // codeBatch: string
  // dateBatch: Timestamp
  product: IProduct
  quantity: number
}

export interface Location {
  latitude: number
  longitude: number
}

export interface SunatEntityRuc {
  razonSocial: string
  tipoDocumento: string
  numeroDocumento: string
  estado: string
  condicion: string
  direccion: string
  ubigeo: string
  viaTipo: string
  viaNombre: string
  zonaCodigo: string
  zonaTipo: string
  numero: string
  interior: string
  lote: string
  dpto: string
  manzana: string
  kilometro: string
  distrito: string
  provincia: string
  departamento: string
  EsAgenteRetencion: boolean
}

export interface SunatEntityDni {
  nombres: string
  apellidoPaterno: string
  apellidoMaterno: string
  tipoDocumento: string
  numeroDocumento: string
  digitoVerificador: string
  ruc: string
}

export interface ICustomer extends IAudit {
  id: string
  type: string
  identity: string
  name: string
  phone: string
  city: string
  district: string
  address: string
  reference: string
  coordenada: string
  debt: number
  zone: IZone
  lastCall: Dayjs | Timestamp | Date
  lastSale: Dayjs | Timestamp | Date
  envases: IEnvaseOfCustomer[]
  totalSale: number
  image: string
  category: ICategoryCustomer
  slug: string
  owner: string
  licensePlate: string
  priceReference: number
  active: boolean
  sunatEntity: SunatEntityRuc | SunatEntityDni
  location: Location
  locations: ILocation[]
}

export class Customer implements Omit<ICustomer, "id"> {
  type: string
  identity: string
  name: string
  phone: string
  city: string
  district: string
  address: string
  reference: string
  coordenada: string
  debt: number
  zone: IZone
  lastCall: Dayjs | Timestamp | Date
  lastSale: Dayjs | Timestamp | Date
  envases: IEnvaseOfCustomer[]
  totalSale: number
  image: string
  category: ICategoryCustomer
  createdAt: Dayjs | Timestamp | Date
  updatedAt: Dayjs | Timestamp | Date
  sunatEntity: SunatEntityRuc | SunatEntityDni
  location: Location
  locations: ILocation[]

  slug: string
  owner: string
  licensePlate: string
  priceReference: number
  active: boolean

  constructor(
    type: string,
    identity: string,
    name: string,
    phone: string,
    city: string,
    district: string,
    address: string,
    reference: string,
    coordenada: string,
    debt: number,
    zone: IZone,
    lastCall: Dayjs | Timestamp | Date,
    lastSale: Dayjs | Timestamp | Date,
    envases: IEnvaseOfCustomer[],
    totalSale: number,
    image: string,
    category: ICategoryCustomer,
    createdAt: Dayjs | Timestamp | Date,
    updatedAt: Dayjs | Timestamp | Date,
    slug: string,
    owner: string,
    licensePlate: string,
    priceReference: number,
    active: boolean,
    sunatEntity: SunatEntityRuc | SunatEntityDni,
    location: Location,
    locations: ILocation[],
  ) {
    this.type = type
    this.identity = identity
    this.name = name
    this.phone = phone
    this.city = city
    this.district = district
    this.address = address
    this.reference = reference
    this.coordenada = coordenada
    this.debt = debt
    this.zone = zone
    this.lastCall = lastCall
    this.lastSale = lastSale
    this.envases = envases
    this.totalSale = totalSale
    this.image = image
    this.category = category
    this.createdAt = createdAt
    this.updatedAt = updatedAt

    this.slug = slug
    this.owner = owner
    this.licensePlate = licensePlate
    this.priceReference = priceReference

    this.active = active
    this.sunatEntity = sunatEntity
    this.location = location
    this.locations = locations
  }
}

export const customerConverter = {
  toFirestore: (customer: ICustomer) => {
    return {
      type: customer.type,
      identity: customer.identity,
      name: customer.name,
      phone: customer.phone,
      city: customer.city,
      district: customer.district ?? null,
      address: customer.address ?? null,
      reference: customer.reference ?? null,
      coordenada: customer.coordenada ?? null,
      debt: customer.debt ?? 0,
      zone: customer.zone ?? null,
      lastCall: customer.lastCall ?? null,
      lastSale: customer.lastSale ?? null,
      envases: customer.envases ?? [],
      totalSale: customer.totalSale ?? 0,
      image: customer.image ?? null,
      category: customer.category ?? null,
      createdAt: customer.createdAt ?? null,
      updatedAt: customer.updatedAt ?? null,

      slug: customer.slug ?? null,
      owner: customer.owner ?? null,
      licensePlate: customer.licensePlate ?? null,
      priceReference: customer.priceReference ?? null,

      active: customer.active ?? true,
      sunatEntity: customer.sunatEntity ?? null,
      location: customer.location ?? null,
      locations: customer.locations ?? null,
    }
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot<ICustomer, DocumentData>, options: SnapshotOptions) => {
    const data = snapshot.data(options)

    data.id = snapshot.id
    data.lastCall = (data.lastCall as Timestamp)?.toDate()
    data.lastSale = (data.lastSale as Timestamp)?.toDate()
    data.createdAt = (data.createdAt as Timestamp)?.toDate()
    data.updatedAt = (data.updatedAt as Timestamp)?.toDate()

    return data
  },
}
