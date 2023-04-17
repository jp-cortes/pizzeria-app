import { Schema, model, models } from "mongoose";

interface Order {
  customer: string;
  address: string;
  total: number;
  status: number;
  method: number;

}


const OrderSchema = new Schema<Order>(
  {
    customer: {
      type: String,
      required: true,
      maxlength: 60,
    },
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    method: {
      type: Number,
      required: true,
    },
 
  },
  { timestamps: true }
);

export default models.Order ||
  model("Product", OrderSchema);