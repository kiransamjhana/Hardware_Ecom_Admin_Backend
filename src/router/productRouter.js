import express from "express";

import slugify from "slugify";
import { insertProduct } from "../model/product/productModel.js";
import { auth } from "../middleaware/authMiddleware.js";
import { newProductValidation } from "../middleaware/joyvalidation.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await getCategory();
    res.json({
      status: "success",
      message: "Here are the list of Proudcts",
      result: [],
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", newProductValidation, async (req, res, next) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.name, { trim: true, lower: true });
    const result = await insertProduct(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "New Product has been added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to add New product at this time, Please try agian",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.statusCode = 200;
      error.message = error.message;
      // "The product slug or sku alread related to another product, change name and sku and try agin later.";
    }
    next(error);
  }
});

export default router;
