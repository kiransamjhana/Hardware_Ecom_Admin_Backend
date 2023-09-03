import express from "express";

import slugify from "slugify";
import {
  deleteProudctById,
  getProductById,
  getProducts,
  insertProduct,
  updateProudctById,
} from "../model/product/productModel.js";
import { auth } from "../middleaware/authMiddleware.js";
import {
  newProductValidation,
  updateProductValidation,
} from "../middleaware/joyvalidation.js";
import { getCategory } from "../model/catagory/categoryModel.js";
import multer from "multer";

const router = express.Router();
const imgFolderPath = "public/imgs/product";
//setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let error = null;
    // validation check
    cb(error, imgFolderPath);
  },
  filename: (req, file, cb) => {
    let error = null;
    // construct/ rename file name
    const fullFileName = Date.now() + "-" + file.originalname;

    cb(error, fullFileName);
  },
});

const upload = multer({ storage });
router.get("/:id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    console.log(req.params);
    const products = _id ? await getProductById(_id) : await getProducts();
    products.length
      ? res.json({
          status: "success",
          message: "Here are the products",
          products,
        })
      : res.json({
          status: "error",
          message: "no products found",
        });
  } catch (error) {
    next(error);
  }
});

router.get("/edit/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    console.log("-----", req.params);
    const result = await getProductById(_id);
    console.log(result);
    res.json({
      status: "success",
      message: " Here is the produt",
      result,
    });
  } catch (error) {
    next(error);
  }
});
router.post(
  "/",
  upload.array("images", 5),
  newProductValidation,
  async (req, res, next) => {
    try {
      if (req?.files.length) {
        req.body.images = req.files.map((item) => item.path);
        req.body.thumbnail = req.body.images[0];
      }

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
  }
);

//update methods
router.put(
  "/",
  upload.array("images", 5),
  updateProductValidation,
  async (req, res, next) => {
    try {
      if (req.files.length) {
        const newImgs = req.files.map((item) => item.path);
        req.body.images = [...req.body.images, ...newImgs];
      }
      const result = await updateProudctById(req.body);
      if (result?._id) {
        res.json({
          status: "success",
          message: " This product has been updated",
        });
        return;
      }

      res.json({
        status: "error",
        message: "Unable to update at this time",
      });
    } catch (error) {
      next(error);
    }
  }
);
//delete methods
router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const result = await deleteProudctById(_id);

    result?._id
      ? res.json({
          status: "success",
          message: "The  product has been deleted successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to delete the product, try again later",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
