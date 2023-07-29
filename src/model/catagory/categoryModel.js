import categorySchema from "./categorySchema.js";

export const insertCatagory = (obj) => {
  return categorySchema(obj).save();
};

export const getCategory = () => {
  return categorySchema.find();
};

export const updateAdById = ({ _id, ...rest }) => {
  return categorySchema.findByIdAndUpdate(_id, rest);
}; //afilter
export const updateCatgegory = (filter, updateObj) => {
  return categorySchema.findOneAndUpdate(filter, updateObj, { new: true });
};
export const deleteCategorybyId = (_id) => {
  return categorySchema.findByIdAndDelete(_id);
};
