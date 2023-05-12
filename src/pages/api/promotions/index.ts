import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../util/mongo'
import Promotion from '../../../models/Promotion';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { method, cookies } = req;


    const token = cookies.token;
    
  await dbConnect();

  if(method === 'GET') {
    try {
        const promotions: ProductBase[] = await Promotion.find();
      res.status(200).json(promotions);  
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
        const promotion = await Promotion.create(req.body);
        res.status(201).json(promotion);
    } catch (error: unknown) {
        res.status(500).json(error);
    }
  }
}
