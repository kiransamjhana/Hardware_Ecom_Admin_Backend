import mongoose from "mongoose";
const order = mongoose.model("Order", {});

export const insertOrder = (obj) => {
  return orderSchema(obj).save();
};
export const getOrderById = (_id) => {
  return order.findById(_id);
};
export const getOrderByEmail = (email) => {
  return order.findOne({ email });
};
export const getOneOrder = (filter) => {
  return order.findOne(filter);
};

export const getOrders = () => {
  return order.find();
};

export const updateOrderById = async ({ _id, ...rest }) => {
  try {
    const updatedData = {
      ...rest,
      phone: "0444444", // Set the desired order status here
    };

    const updatedOrder = await order.findOneAndUpdate({ _id }, updatedData, {
      new: true,
    });

    console.log("Updated order:", updatedOrder);

    return {
      status: "success",
      message: "Order updated successfully",
      data: updatedOrder,
    };
  } catch (error) {
    console.error("Error updating order:", error);

    return {
      status: "error",
      message: "Failed to update order",
      error: error.message,
    };
  }
};

export const updateOrder = (filter, updateObj) => {
  return order.findOneAndUpdate(filter, updateObj, { new: true });
};
export const deleteOrderById = (_id) => {
  return order.findByIdAndDelete(_id);
};
