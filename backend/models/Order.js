import { Schema, Types, model } from "mongoose";

const schema = Schema({
	_id: Types.ObjectId, 
  productId: Types.ObjectId,
  customerId: Types.ObjectId,
  createdAt: Date
},
{ timestamps: true });

export default model("Order", schema);