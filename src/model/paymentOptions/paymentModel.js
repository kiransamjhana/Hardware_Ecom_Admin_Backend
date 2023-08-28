import paymentSchema from "./paymentSchema.js";

export const insertPy = (obj) => {
  return paymentSchema(obj).save();
};

export const getPayementOpton = (obj) => {
  return paymentSchema.findOne(obj);
};

export const getAllPymentOption = () => {
  return paymentSchema.find();
};

export const updatePYById = ({ _id, ...rest }) => {
  return paymentSchema.findByIdAndUpdate(_id, rest);
}; //afilter

export const deletePy = (_id) => {
  return paymentSchema.findByIdAndDelete(_id);
};
