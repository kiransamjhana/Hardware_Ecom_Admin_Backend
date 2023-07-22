import bcrypt from "bcryptjs";

const salt = 10;
export const hashPassword = (plainPass) => {
  return bcrypt.hashSync(plainPass, salt);
};

const compairPassword = (plainPass, hashPass) => {
  return bcrypt.Sync(plainPass, salt);
};
