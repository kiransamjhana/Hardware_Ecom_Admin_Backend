import jwt from "jsonwebtoken";

import { updateAdmin } from "../model/admin/AdminModel.js";
import { insertNewSession } from "../model/session/sessionModel.js";

export const createAcessJWT = async (email) => {
  const token = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "30m",
  });

  await insertNewSession({ token, associate: email });
  return token;
};

export const verifiyAccessJWT = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};
export const createRefreshJWT = async (email) => {
  const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  const dt = await updateAdmin({ email }, { refreshJWT });

  return refreshJWT;
};

export const verifiyRefreshJWT = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
