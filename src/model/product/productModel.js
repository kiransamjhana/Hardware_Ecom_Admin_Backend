import prouductSchema from "./productSchema.js";

export const insertProduct = (obj) => {
  return prouductSchema(obj).save();
};

export const getProducts = () => {
  return prouductSchema.find();
};
export const getProductById = (_id) => {
  return prouductSchema.findById(_id);
};
export const findOneProductByFilter = (filter) => {
  return prouductSchema.findOne(filter);
};
export const updateProudctById = ({ _id, ...rest }) => {
  return prouductSchema.findByIdAndUpdate(_id, rest);
}; //afilter
export const updateProduct = (filter, updateObj) => {
  return prouductSchema.findOneAndUpdate(filter, updateObj, { new: true });
};
export const deleteProudctById = (_id) => {
  return prouductSchema.findByIdAndDelete(_id);
};
