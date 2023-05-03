import mongoose from "mongoose";
import { type } from "os";

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
  id?: string; //params id
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
     extras: ProductOptions[];
    createdAt: string;  
  };
  
   type Cart = {
    quantity: number;
    total: number;
    products: ProductCart[];
  };

  interface RootState {
    cart: Cart
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
    id?: string; //params id
  };

  type Ctx = {
    req: NextApiRequest;
    };
}