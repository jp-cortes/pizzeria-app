import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../util/mongo'
import Product from '../../../models/Product';

type Data = {
  id: string,
  title: string,
  desc: string,
  img: string,
  prices: [number],
  extraOptions: [string | number],
  createdAt: string,
  updatedAt: string,
  __v: number
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { method, cookies } = req;


    const token = cookies.token;
    
  dbConnect();

  if(method === 'GET') {
    try {
        const products: Data[] = await Product.find();
      res.status(200).json(products);  
    } catch (error: unknown) {
        res.status(500).json(error);
    }
  }
  if(method === 'POST') {
    if(!token || token !== process.env.TOKEN){
      return res.status(401).json("Not authenticated");
    }
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error: unknown) {
        res.status(500).json(error);
    }
  }
}
