import express from "express";
import {
  getOrderByEmail,
  getOrderById,
  getOrders,
  insertOrder,
  updateOrder,
  updateOrderById,
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
    `                      `;
    next(error);
  }
});

router.put("/update/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { data } = req.body;
    const { orderStatus } = data;
    console.log(orderStatus, "from update");
    // Perform the database update based on the provided _id and orderStatus
    const result = await updateOrderById(_id, { orderStatus });

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
});

export default router;
