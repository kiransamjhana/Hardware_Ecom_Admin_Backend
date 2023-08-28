import express from "express";

import { newpaymentOptionValidation } from "../middleaware/joyvalidation.js";
import {
  deletePy,
  getAllPymentOption,
  insertPy,
  updatePYById,
} from "../model/paymentOptions/paymentModel.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await getAllPymentOption();
    res.json({
      status: "success",
      message: "Here are the list of payment options",
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", newpaymentOptionValidation, async (req, res, next) => {
  try {
    const result = await insertPy(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: " New Payment has been added",
        })
      : res.json({
          status: "error",
          message: " Unable to add the payment Method",
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

//updating the payment Informaiton
router.put("/", async (req, res, next) => {
  try {
    const result = await updatePYById(req.body);
    if (result?._id) {
      res.json({
        status: "success",
        message: " This payment method has been updated",
      });
      return;
    }

    res.json({
      status: "error",
      message: "Unable to update the payment method, please try again",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:_id", async (req, res, next) => {
  const { _id } = req.params;
  try {
    if (_id) {
      const result = await deletePy(_id);
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
