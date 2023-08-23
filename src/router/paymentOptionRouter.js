import express from "express";
import {
  deleteCategorybyId,
  getCategory,
  insertCatagory,
  updateAdById,
} from "../model/catagory/categoryModel.js";
import { newpaymentOptionValidation } from "../middleaware/joyvalidation.js";
import { insertPy } from "../model/paymentOptions/paymentModel.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await getCategory();
    res.json({
      status: "success",
      message: "New Category has been added",
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", newpaymentOptionValidation, async (req, res, next) => {
  try {
    // const { title } = req.body;
    // console.log(title);
    // !title &&
    //   res.json({
    //     status: "error",
    //     message: "categroy title is required",
    //   });

    // const obj = {
    //   title,
    //   slug: slugify(title, { trim: true, lower: true }),
    // };

    const result = await insertPy(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: " New Payment has been added",
        })
      : res.json({
          status: "error",
          message: " Unable to add the payment category",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      error.statusCode = 200;
      error.message =
        "The slug for the category already exist, please change the catgegory name ans try again.";
    }
    next(error);
  }
});

router.delete("/:_id", async (req, res, next) => {
  const { _id } = req.params;
  try {
    if (_id) {
      const result = await deleteCategorybyId(_id);
      result?._id &&
        res.json({
          status: "success",
          message: "The category has been deleted",
        });

      return;
    }

    res.json({
      status: "error",
      message: "Error, Unable to process your request.",
    });
  } catch (error) {
    next(error);
  }
});
export default router;
