import { Schema, Types, model } from "mongoose";

const schema = Schema({
	_id: Types.ObjectId, 
	name: String
},
{ timestamps: true });

export default model("Customer", schema);