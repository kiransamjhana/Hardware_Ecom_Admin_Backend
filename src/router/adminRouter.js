import express from "express";
import { insertAdmin } from "../model/admin/adminmodel.js";

import { newAdminvalidation } from "../middleaware/joyvalidation.js";
import { hashPassword } from "../helpers/bycrypt.js";
const router = express.Router();

// create new admin  for

router.post("/", newAdminvalidation, async (req, res, next) => {
  try {
    console.log(req.body);

    const { password } = req.body;
    req.body.password = hashPassword(password);
//TODO create code and add with req.body
const vc = uuidv4()
    const result = await insertAdmin(req.body);
   if  (result?._id){  res.json({
    status: "successs",
    message: " please checkl uour email and follow the instrution",
  })}
    const link= process.env.WEB_DOMAIN + "/admin-verification?" +
    await accountVerificationEmail({
      fName; result.fName, email:result.email, link
    })
    return ;
       res.json({
          status: "error",
          message: " Unable to add new admin,please try agian",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      error.statusCode = 400;
      error.message("Email already exist, Use new Email id");
    }
    next(error);
  }
});

export default router;
