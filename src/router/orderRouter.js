import express from "express";
import {
  getOrderByEmail,
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

// router.get("/:_id?", async (req, res, next) => {
//     try {
//       const singlePyOp = await getPayementOpton();
//       res.json({
//         status: "success",
//         message: "Here is the selected payment options",
//         singlePyOp,
//       });
//     } catch (error) {
//       next(error);
//     }
//   });

export default router;
