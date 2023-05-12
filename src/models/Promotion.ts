import { Schema, model, models } from "mongoose";

 interface Promotion {
  title: string;
  img: string;
  desc: string;
  prices: number[];
  extraOptions: ExtraOption[];
}

interface ExtraOption {
  text: string;
  price: number;
}



const ProductSchema = new Schema<Promotion>(
  {
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 200,
    },
    img: {
      type: String,
      required: true,
    },
    prices: {
      type: [Number],
      required: true,
    },
    extraOptions: {
      type: [
        {
          text: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);

export default models.Promotion ||
  model("Promotion", ProductSchema);