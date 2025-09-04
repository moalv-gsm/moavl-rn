import { QueryDocumentSnapshot, type DocumentData, type SnapshotOptions } from "firebase/firestore"
import type { ETypeProduct, EWaterOutlet } from "~/enums"

interface IBrand {
  id: string
  name: string
}

export interface IEnvase {
  id: string
  name: string
  brand: IBrand
  waterOutlet: EWaterOutlet
}

export interface IProductMovement {
  id: string
  type: ETypeProduct
  name: string
  waterOutlet: EWaterOutlet
  brand: IBrand
  envase: IEnvase
  isSale: boolean
  isSummary: boolean
}

export interface IProduct {
  id: string
  type: ETypeProduct
  name: string
  imageUrl: string
  waterOutlet: EWaterOutlet
  newPlantPrice: number
  newDeliveryPrice: number
  isReturnable: boolean
  rechargePlantPrice: number
  rechargeDeliveryPrice: number
  cost: number
  stock: number
  brand: IBrand
  envase: IEnvase
  active: boolean
  distribution: boolean
  isSale: boolean
  isSummary: boolean
  category: { id: string; name: string }
}

export class Product implements Omit<IProduct, "id"> {
  type: ETypeProduct
  name: string
  imageUrl: string
  waterOutlet: EWaterOutlet
  newPlantPrice: number
  newDeliveryPrice: number
  isReturnable: boolean
  rechargePlantPrice: number
  rechargeDeliveryPrice: number
  cost: number
  stock: number
  brand: IBrand
  envase: IEnvase
  active: boolean
  distribution: boolean
  isSale: boolean
  isSummary: boolean
  category: { id: string; name: string }

  constructor(
    type: ETypeProduct,
    name: string,
    imageUrl: string,
    waterOutlet: EWaterOutlet,
    newPlantPrice: number,
    newDeliveryPrice: number,
    isReturnable: boolean,
    rechargePlantPrice: number,
    rechargeDeliveryPrice: number,
    cost: number,
    stock: number,
    brand: IBrand,
    envase: IEnvase,
    active: boolean,
    distribution: boolean,
    isSale: boolean,
    isSummary: boolean,
    category: { id: string; name: string },
  ) {
    this.type = type
    this.name = name
    this.imageUrl = imageUrl
    this.waterOutlet = waterOutlet
    this.newPlantPrice = newPlantPrice
    this.newDeliveryPrice = newDeliveryPrice
    this.isReturnable = isReturnable
    this.rechargePlantPrice = rechargePlantPrice
    this.rechargeDeliveryPrice = rechargeDeliveryPrice
    this.cost = cost
    this.stock = stock
    this.brand = brand
    this.envase = envase
    this.active = active
    this.distribution = distribution
    this.isSale = isSale
    this.isSummary = isSummary
    this.category = category
  }
}

export const productConverter = {
  toFirestore: (product: IProduct) => {
    return {
      type: product.type,
      name: product.name,
      imageUrl: product.imageUrl ?? null,
      waterOutlet: product.waterOutlet ?? null,
      newPlantPrice: product.newPlantPrice,
      newDeliveryPrice: product.newDeliveryPrice,
      isReturnable: product.isReturnable ?? null,
      rechargePlantPrice: product.rechargePlantPrice ?? null,
      rechargeDeliveryPrice: product.rechargeDeliveryPrice ?? null,
      cost: product.cost ?? null,
      stock: product.stock ?? 0,
      brand: product.brand,
      envase: product.envase ?? null,
      active: product.active ?? true,
      distribution: product.distribution ?? true,
      isSale: product.isSale ?? true,
      isSummary: product.isSummary ?? true,
      category: product.category ?? null,
    }
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot<IProduct, DocumentData>, options: SnapshotOptions) => {
    const data = snapshot.data(options)
    data.id = snapshot.id
    return data
  },
}
