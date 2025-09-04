import { QueryDocumentSnapshot, type DocumentData, type SnapshotOptions } from "firebase/firestore"
import type { IProduct } from "./product"

export interface IPriceProduct {
  id: string
  product: IProduct
  price: number
  priceRecharge: number
}

export class PriceProduct implements Omit<IPriceProduct, "id"> {
  product: IProduct
  price: number
  priceRecharge: number

  constructor(product: IProduct, price: number, priceRecharge: number) {
    this.product = product
    this.price = price
    this.priceRecharge = priceRecharge
  }
}

export const priceProductConverter = {
  toFirestore: (priceProduct: IPriceProduct) => {
    return {
      product: priceProduct.product,
      price: priceProduct.price,
      priceRecharge: priceProduct.priceRecharge,
    }
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot<IPriceProduct, DocumentData>, options: SnapshotOptions) => {
    const data = snapshot.data(options)
    data.id = snapshot.id
    return data
  },
}
