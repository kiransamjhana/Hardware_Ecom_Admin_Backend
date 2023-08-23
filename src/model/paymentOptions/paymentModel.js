import paymentSchema from "./paymentSchema.js";

export const insertPy = (obj) => {
  return adminSchema(obj).save();
};

export const getPayementOpton = (obj) => {
  return adminSchema.findOne(obj);
};

export const updatePYById = ({ _id, ...rest }) => {
  return adminSchema.findByIdAndUpdate(_id, rest);
}; //afilter

export const deletePy = (_id) => {
  return adminSchema.findByIdAndDelete(_id);
};
