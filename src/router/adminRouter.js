import express from "express";
import {
  getAdminByEmail,
  insertAdmin,
  updateAdmin,
} from "../model/admin/adminmodel.js";
import { v4 as uuidv4 } from "uuid";
import {
  newAdminValidation,
  newAdminValidationVerification,
} from "../middleaware/joyvalidation.js";
import { hashPassword, compairPassword } from "../helpers/bycrypt.js";
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
      res.json({
        status: "success",
        message:
          "Please check your email and follow the instruction to activate your acount",
      });

      const link = ` ${process.env.WEB_DOMAIN}/admin-verification?c=${result.verificationCode}&e=${result.email}`;

      await accountVerificationEmail({
        fName: result.fName,
        email: result.email,
        link,
      });
      return;
    }

    res.json({
      status: "error",
      message: "Unable to add new admin, Please try agian later",
    });
  } catch (error) {
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

      if (result?._id) {
        await accountVerifiedNotification(result);
        res.json({
          status: "success",
          message:
            " Your account has been verified, please proceeed to login and your are welcome",
        });
        return;
      }
      res.json({
        status: "error",
        message: "Link is expired or invalid",
      });
    } catch (error) {
      next(error);
    }
  }
);

//Login Admin
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await getAdminByEmail(email);
    console.log(email, password, admin);
    if (admin?._id) {
      const isMatch = compairPassword(password, admin.password);
      if (isMatch) {
        admin.password = undefined;
        return res.json({
          status: "success",
          message: "Logedin successfully",
          admin,
        });
      }
      console.log(admin);
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
