import express from "express";
import {
  deleteCategorybyId,
  getCategory,
  insertCatagory,
  updateAdById,
} from "../model/catagory/categoryModel.js";
import { updateCatValidation } from "../middleaware/joyvalidation.js";
import slugify from "slugify";

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

router.post("/", async (req, res, next) => {
  try {
    const { title } = req.body;
    console.log(title);
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
        })
      : res.json({
          status: "error",
          message: " Unable to add the categoroy",
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
router.put("/", updateCatValidation, async (req, res, next) => {
  try {
    const result = await updateAdById(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "The category has been updated",
        })
      : res.json({
          status: "error",
          message: "Error, Unable to udpate new category.",
        });
  } catch (error) {
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
