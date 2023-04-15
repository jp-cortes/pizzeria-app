import mongoose from "mongoose";

declare global {
    var myGlobal: mongoose;

    
type ProductBase = {
  _id: string,
  title: string,
  desc: string,
  img: string,
  prices: [number],
  extraOptions: [string | number],
  createdAt: string,
  updatedAt: string,
  __v: number
}

type PizzaList = {
  pizzaList: ProductBase[],
}

type PizzaProduct = {
    _id: string,
    title: string,
    desc: string,
    img: string,
    prices: [number],
  }
  
  type PizzaCard = {
    pizza: PizzaProduct,
  }
}