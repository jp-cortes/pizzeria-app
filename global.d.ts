import mongoose from "mongoose";

declare global {
    var myGlobal: mongoose;

type ProductOptions = {
      _id: string,
      text: string,
      price: number,
   } 

type ProductBase = {
  _id: string,
  title: string,
  desc: string,
  img: string,
  prices: [number],
  extraOptions: [ProductOptions],
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