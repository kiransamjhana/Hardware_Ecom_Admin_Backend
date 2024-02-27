import express from "express";
import {
  getOrderByEmail,
  getOrderById,
  getOrders,
  insertOrder,
} from "../model/Order/order.js";
const router = express.Router();

//get methods for the  order
router.get("/", async (req, res) => {
  try {
    const order = await getOrders();
    res.json({
      status: "success",
      message: "Here is order the list of orders",
      order,
    });
  } catch (error) {
    error;
  }
});

router.get("/edit/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    console.log(_id);
    const result = await getOrderById(_id);
    res.json({
      status: "success",
      message: "Here is the selected order",
      result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
