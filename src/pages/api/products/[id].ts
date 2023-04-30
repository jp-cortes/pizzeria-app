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
    const { 
        method, 
        query: { id },
        cookies,
    
    } = req;
    
  dbConnect();

  const token = cookies.token;

  if(method === 'GET') {
    try {
        const product: Data | null = await Product.findById(id);
      res.status(200).json(product);  
    } catch (error: unknown) {
        res.status(500).json(error);
    }
  }
  if(method === 'PUT') {

    // if(!token || token !== process.env.TOKEN){
    //   return res.status(401).json("Not authenticated");
    // }

    try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true
        });
        res.status(201).json(product);
    } catch (error: unknown) {
        res.status(500).json(error);
    }
  }

  if(method === 'DELETE') {
    
    if(!token || token !== process.env.TOKEN){
      return res.status(401).json("Not authenticated");
    }

    try {
         await Product.findByIdAndDelete(id);
        res.status(200).json("Product Deleted");
    } catch (error: unknown) {
        res.status(500).json(error);
    }
  }
}
