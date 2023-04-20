import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../util/mongo";
import Order from "@/models/Order";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 const { 
    method,
    query: { id },
 } = req;

 await dbConnect();

 if (method === 'GET') {
    try {
        const order = await Order.findById(id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error);
        
    }
 }
 
 
 if (method === 'PUT') {
     try {
        const order = await Order.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).json(order);
        
    } catch (error) {
        res.status(500).json(error);
    }
 }


 if (method === 'DELETE') {}

}