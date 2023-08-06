import sessionSchema from "./sessionSchema.js";

export const insertNewSession = (obj) => {
  return sessionSchema(obj).save();
};
//tokken should be string

export const deleteNewSession = async (token) => {
  const dt = await sessionSchema.findOneAndDelete(token);
};
