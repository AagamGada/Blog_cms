const { check } = require("express-validator");

const validateAuthRegister = [
  check("name")
    .notEmpty()
    .withMessage("The name shouldn't be empty string")
    .isString()
    .withMessage("The name must be string")
    .isLength({ min: 5 })
    .withMessage("The name should be atleast 5 chars long"),
  check("email")
    .isEmail()
    .withMessage("The valid email is required")
    .normalizeEmail(),
  check("password")
    .notEmpty()
    .withMessage("The password shouldn't be empty string")
    .isLength({ min: 8 })
    .withMessage("The password should be atleast 8 chars long")
    .custom((val, { req }) => {
      if (req.body.repeatPassword !== val) {
        throw new Error("The password doesn't match");
      }
      return true;
    }),
];

const validateAuthLogin = [
  check("email")
    .notEmpty()
    .withMessage("The email field is required")
    .isEmail()
    .withMessage("The email is not valid"),
  check("password").notEmpty().withMessage("The password field is required"),
];

const validatePostBlog = [
  check("topic").notEmpty().withMessage("The topic field is required"),
  check("content").notEmpty().withMessage("The content field is required"),
  check("blogAvatar").optional(),
  check("category")
    .isArray()
    .withMessage("The category must be an array")
    .optional(),
];

const validatePostReview = [
  check("content")
    .notEmpty()
    .withMessage("The content field is required")
    .isString(),
  check("blogId").notEmpty().withMessage("The blogId is missing").isString(),
];
module.exports = {
  validateAuthRegister,
  validateAuthLogin,
  validatePostBlog,
  validatePostReview,
};
