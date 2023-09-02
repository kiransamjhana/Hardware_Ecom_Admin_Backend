import Joi from "joi";

const SHORTSTRREQ = Joi.string().min(3).max(100).required();
const SHORTSTR = Joi.string().min(3).max(100);
const NUMREQ = Joi.number().required();
const NUM = Joi.number();
const LONGTSTR = Joi.string().min(10).max(1000);
// ====admin JOi validation
export const newAdminValidation = (req, res, next) => {
  try {
    //define the schema
    const schema = Joi.object({
      fName: SHORTSTRREQ,
      lName: SHORTSTRREQ,
      email: SHORTSTR.email({ minDomainSegments: 2 }).required(),
      phone: SHORTSTRREQ,
      address: SHORTSTR.allow(""),
      password: SHORTSTRREQ.min(6),
    });

    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};

export const loginValidation = (req, res, next) => {
  try {
    //define the schema
    const schema = Joi.object({
      email: SHORTSTR.email({ minDomainSegments: 2 }).required(),
      password: SHORTSTRREQ.min(6),
    });

    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};

export const newAdminValidationVerification = (req, res, next) => {
  try {
    //define the schema
    const schema = Joi.object({
      e: SHORTSTR.email({ minDomainSegments: 2 }).required(),
      c: SHORTSTRREQ,
    });

    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};

// Category
export const upDateCatVerification = (req, res, next) => {
  try {
    //define the schema
    const schema = Joi.object({
      title: SHORTSTR.email({ minDomainSegments: 2 }).required(),
      _id: SHORTSTRREQ,
      status: SHORTSTRREQ,
    });

    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};

// ======== category
export const updateCatValidation = (req, res, next) => {
  try {
    //define the schema
    const schema = Joi.object({
      _id: SHORTSTRREQ,
      title: SHORTSTRREQ,
      status: SHORTSTRREQ,
    });

    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};

//====== payment options
export const newpaymentOptionValidation = (req, res, next) => {
  try {
    //define the schema
    const schema = Joi.object({
      description: SHORTSTRREQ,
      title: SHORTSTRREQ,
      status: SHORTSTRREQ,
    });

    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};

//===== Product Validation
export const newProductValidation = (req, res, next) => {
  try {
    //define the schema
    const schema = Joi.object({
      status: SHORTSTRREQ,
      name: SHORTSTRREQ,
      parentCat: SHORTSTRREQ,
      sku: SHORTSTRREQ,
      price: NUMREQ,
      qty: NUMREQ,
      salesPrice: NUM,
      description: LONGTSTR,
      salesStartDate: SHORTSTR.allow("", null),
      salesEndDate: SHORTSTR.allow("", null),
    });

    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};
