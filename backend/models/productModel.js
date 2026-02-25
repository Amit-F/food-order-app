import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type:String, required:true },
    description: { type:String, required:true },
    price: { type:Number, required:true },
    timeToPrepare: { type:Number, required:true },
    image: { type:Array, required:true },
    category: { type:Array, required:true },
    subCategory: { type:Array, required:true },
    servings: { type:Array, required:true },
    date: { type:Date, default:Date.now },
    bestSeller: { type:Boolean, default:false, required:true },
    additionalPrepTime: { type:Boolean, default:false, required:true }
})

const productModel = mongoose.models.product || mongoose.model("product",productSchema);

export default productModel