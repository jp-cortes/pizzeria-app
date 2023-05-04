import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../util/mongo'
import Product from '../../../models/Product';



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { 
        method, 
        query: { id },
        cookies,
    
    } = req;
    
  await dbConnect();

  const token = cookies.token;

  if(method === 'GET') {
    try {
        const product: ProductBase | null = await Product.findById(id);
      res.status(200).json(product);  
    } catch (error: unknown) {
        res.status(500).json(error);
    }
  }
  if(method === 'PUT') {
//only with authorization is able to update products
    if(!token || token !== process.env.TOKEN){
      return res.status(401).json("Not authenticated");
    }

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
    //only with authorization is able to delete products
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
