import express from "express";
import {
  getCategory,
  insertCatagory,
} from "../model/catagory/categoryModel.js";
import { upDateCatVerification } from "../middleaware/joyvalidation.js";
import slugify from "slugify";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await getCategory();
    res.json({
      status: "success",
      message: "",
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", upDateCatVerification, async (req, res, next) => {
  try {
    const { title } = req.body;
    !title &&
      res.json({
        status: "error",
        message: "categroy title is required",
      });

    const obj = {
      title,
      slug: slugify(title, { trim: true, lower: true }),
    };

    const result = await insertCatagory(obj);
    result?._id
      ? res.json({
          status: "success",
          message: " New Category Has been added",
          result,
        })
      : res.json({
          status: "error",
          message: " Unable to add the categoroy",
        });
  } catch (error) {
    next(error);
  }
});
export default router;
