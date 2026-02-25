import express from "express";
import { addProduct, removeProduct, singleProduct, listProducts } from "../controllers/productController.js";



const productRouter = express.Router();

productRouter.post('/add',addProduct);
productRouter.post('/remove',removeProduct);
productRouter.post('/single',singleProduct); // get?
productRouter.get('/list',listProducts);

export default productRouter;