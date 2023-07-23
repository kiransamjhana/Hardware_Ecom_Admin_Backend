import CatagorySchema from "./adminSchema.js";

export const insertAdmin = (obj) => {
  return adminSchema(obj).save();
};

export const getAdminByEmail = (email) => {
  return adminSchema.findOne({ email });
};

export const updateAdminById = ({ _id, ...rest }) => {
  return adminSchema.findByIdAndUpdate(_id, rest);
}; //afilter
export const updateAdmin = (filter, updateObj) => {
  return adminSchema.findOneAndUpdate(filter, updateObj, { new: true });
};
export const deleteAdminById = (_id) => {
  return adminSchema.findByIdAndDelete(_id);
};
