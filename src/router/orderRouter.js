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
    console.log(req.params, "order router");
    // Set a default order status directly on the server side
    const defaultOrderStatus = "999939399393";

    // Perform the updateOrderStatus Axios call with the default orderStatus
    const updateResult = await updateOrderById(
      { _id },
      { phone: defaultOrderStatus }
    );

    // Check if the update was successful
    if (updateResult?.status === "success") {
      return res.json({
        status: "success",
        message: "The order status has been updated",
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
