import mongoose from "mongoose";

declare global {
    var myGlobal: mongoose;

type ProductOptions = {
      _id: string;
      text: string;
      price: number;
   };

type ProductBase = {
  _id: string;
  title: string;
  desc: string;
  img: string;
  prices: number[];
  extraOptions: ProductOptions[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type PizzaList = {
  pizzaList: ProductBase[],
};

type PizzaProduct = {
    _id: string;
    title: string;
    desc: string;
    img: string;
    prices: number[];
  };
  
  type PizzaCard = {
    pizza: PizzaProduct;
  };

  interface ProductCart {
    _id: string; 
    img: string; 
    title: string; 
    price: number; 
    quantity: number;
     extras: [
       {
        text: string; 
        _id: string
      }
    ];
    createdAt: string;  
  };
  
  interface RootState {
    cart: {
      quantity: number;
      total: number;
      products: ProductCart[];
    };
  };

  type PaypalButton = {
    currency: string;
    showSpinner: boolean
  };
  
  type ProductOrder = {
    _id: string;
    status: number;
    customer: string;
    address: string;
    total: number;
    method: number;
  };
}