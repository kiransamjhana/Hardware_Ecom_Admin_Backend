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

export const updateOrderById = ({ _id, ...rest }) => {
  return order.findByIdAndUpdate(_id, rest);
}; //afilter
export const updateOrder = (filter, updateObj) => {
  return order.findOneAndUpdate(filter, updateObj, { new: true });
};
export const deleteOrderById = (_id) => {
  return order.findByIdAndDelete(_id);
};
