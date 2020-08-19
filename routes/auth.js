const express = require("express");
const { check, body } = require("express-validator/check");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid Email")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((user) => {
        if (!user) {
          return Promise.reject("Invalid email or password");
        }
      });
    })
    .normalizeEmail(),
  body('password','Please enter a password with only numbers and text and atleast 8 characters!').isLength({min: 5}).isAlphanumeric().trim()
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid Email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "Email already exists! please pick a different email"
            );
          }
        });
      }).normalizeEmail(),
    body(
      "password",
      "Please enter a password with only numbers and text and atleast 8 characters!"
    )
      .isLength({ min: 5 })
      .isAlphanumeric().trim(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match !");
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
