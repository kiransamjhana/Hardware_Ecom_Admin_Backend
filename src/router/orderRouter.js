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

router.put("/update/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { newStat, orderStatus } = req.body;

    // Assuming you're sending _id and newStatus in the request body

    // Perform the updateOrderStatus Axios call
    console.log("Received _id:", _id, "orderStatus:", newStat, orderStatus);
    const updateResult = await updateOrderById({ _id, orderStatus: newStat });

    // Check if the update was successful
    if (updateResult?._id) {
      return res.json({
        status: "success",
        message: "The order status has been updated",
        updateResult,
      });
    }

    // Handle the case where the update was not successful
    res.json({
      status: "error",
      message: "Failed to update order status. Please try again.",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
