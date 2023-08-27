import adminSchema from "./adminSchema.js";

export const insertAdmin = (obj) => {
  return adminSchema(obj).save();
};
export const getAdminById = (_id) => {
  return adminSchema.findById(_id);
};
export const getAdminByEmail = (email) => {
  return adminSchema.findOne({ email });
};
export const getOneAdmin = (filter) => {
  return adminSchema.findOne(filter);
};

export const getAllAdmins = () => {
  return adminSchema.find();
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
