import express from "express";
import { insertAdmin, updateAdmin } from "../model/admin/adminmodel.js";
import { v4 as uuidv4 } from "uuid";
import {
  newAdminValidation,
  newAdminValidationVerification,
} from "../middleaware/joyvalidation.js";
import { hashPassword } from "../helpers/bycrypt.js";
import {
  accountVerificationEmail,
  accountVerifiedNotification,
} from "../helpers/nodemailer.js";
const router = express.Router();

// create new admin  for

router.post("/", newAdminValidation, async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = hashPassword(password);

    //TODO create code and add with req.body
    req.body.verificationCode = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

    const result = await insertAdmin(req.body);

    if (result?._id) {
      const link = ` ${process.env.WEB_DOMAIN}/admin-verification?c=${result.verificationCode}&e=${result.email}`;

      console.log(link);
      await accountVerificationEmail({
        fName: result.fName,
        email: result.email,
        link,
      });

      res.json({
        status: "success",
        message:
          "Please check your email and follow the instruction to activate your acount",
      });
      return;
    }

    res.json({
      status: "error",
      message: "Unable to add new admin, Please try agian later",
    });
  } catch (error) {
    console.log(error);
    if (error.message.includes("E11000 duplicate key error")) {
      error.statusCode = 400;
      error.message =
        "This email is already used by another Admin, Use different email or reset your password";
    }

    next(error);
  }
});

//verifiyiung the new accounty
router.post(
  "/admin-verification",
  newAdminValidation,
  newAdminValidationVerification,
  async (req, res, next) => {
    try {
      const { e, c } = req.body;
      const filter = {
        email: e,
        verificationCode: c,
      };
      const updateObj = {
        isVerified: true,
        verificationcode: "",
      };
      const result = await updateAdmin(filter, updateObj);

      result?._id
        ? res.json({
            status: "success",
            message:
              " Your account has been verified, please proceeed to login and your are welcome",
          })
        : res.json({
            status: "error",
            message: "Link is expired or invalid",
          });
    } catch (error) {
      next(error);
    }
  }
);
export default router;
