import express from "express";
import {
  getAdminByEmail,
  getAdminById,
  getAllAdmins,
  insertAdmin,
  updateAdmin,
  updateAdminById,
} from "../model/admin/adminmodel.js";
import { v4 as uuidv4 } from "uuid";
import {
  loginValidation,
  newAdminValidation,
  newAdminValidationVerification,
} from "../middleaware/joyvalidation.js";
import { hashPassword, compairPassword } from "../helpers/bycrypt.js";
import {
  accountVerificationEmail,
  accountVerifiedNotification,
} from "../helpers/nodemailer.js";
import { createAcessJWT, createRefreshJWT } from "../helpers/jwt.js";
import { auth, refreshAuth } from "../middleaware/authMiddleware.js";
import { deleteNewSession } from "../model/session/sessionModel.js";

const router = express.Router();

//get admin details
router.get("/", auth, (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "Here are the user INfo",
      user: req.userInfo,
    });
  } catch (error) {
    next(error);
  }
});
router.get("/display", auth, async (req, res, next) => {
  try {
    const user = await getAllAdmins();
    res.json({
      status: "success",
      message: "Here are the user INfo",
      user,
    });
  } catch (error) {
    next(error);
  }
});

// create new admin  for

router.post("/", auth, newAdminValidation, async (req, res, next) => {
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
router.put("/", auth, async (req, res, next) => {
  try {
    const { password, ...info } = req.body;
    console.log(req.body.email);
    const user = await getAdminByEmail(req.body.email);

    const isMatched = compairPassword(password, user.password);
    if (isMatched) {
      const result = await updateAdminById(info);
      if (result?._id) {
        return res.json({
          status: "success",
          message: "The profile has been updated",
        });
      }
    }

    //TODO create code and add with req.body
    res.json({
      status: "error",
      message:
        "The entered password doesn't match to your current password. Please enter the correct one.",
    });
  } catch (error) {
    next(error);
  }
});

//change admin password
router.put("/change-password", auth, async (req, res, next) => {
  try {
    const { password, NewPassword } = req.body;
    const { _id } = req.userInfo;
    const users = await getAdminById(_id);
    console.log(users);
    const isMatched = compairPassword(password, users.password);
    console.log("===========", isMatched);
    if (isMatched) {
      const pp = hashPassword(NewPassword);
      const result = await updateAdmin(_id, pp);
      console.log(result);
      if (result?._id) {
        return res.json({
          status: "success",
          message: "The password has been updated",
        });
      }
    }

    res.json({
      status: "error",
      message: "Unble to change the password.",
    });
  } catch (error) {
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
        status: "active",
        verificationCode: "",
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
router.post("/login", loginValidation, async (req, res, next) => {
  //CRERATE ACCESS JWT AND STORE IN SESSION TABLE: SHORT LIVE 15M
  // CREATE REFERESE JWT AND STORE  WITH USER DATA IN USER TABLE : LONG LIVE 30DAYS
  //RETURN THE JWTS

  try {
    const { email, password } = req.body;
    //FIND THE USER BY EMAIL
    const user = await getAdminByEmail(email);
    //CHECK THE PASSWORD MATCH
    if (user?._id) {
      const isMatch = compairPassword(password, user.password);

      if (isMatch) {
        //CREATE 2 JWTS
        const accessJWT = await createAcessJWT(email);
        const refreshJWT = await createRefreshJWT(email);
        return res.json({
          status: "success",
          message: "Logedin successfully",
          token: { accessJWT, refreshJWT },
        });
      }
    }
    //return the jwt
    res.json({
      status: "error",
      message: "Invalid Login details,,,,try again",
    });
  } catch (error) {
    next(error);
  }
});

//return the refreshJWT
router.get("/get-accessjwt", refreshAuth);

//logout
router.post("/logout", async (req, res, next) => {
  try {
    const { accessJWT, refreshJWT, _id } = req.body;

    accessJWT && deleteNewSession(accessJWT);

    if (refreshJWT && _id) {
      const dt = await updateAdminById({ _id, refreshJWT: "" });
    }

    res.json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
