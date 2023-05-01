import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../util/mongo'
import Product from '../../../models/Product';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { method, cookies } = req;


    const token = cookies.token;
    
  dbConnect();

  if(method === 'GET') {
    try {
        const products: ProductBase[] = await Product.find();
      res.status(200).json(products);  
    } catch (error: unknown) {
        res.status(500).json(error);
    }
  }
  if(method === 'POST') {
    //only with authorization is able to create products
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
