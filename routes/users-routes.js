const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const userControl = require("../controllers/user-controllers");

router.get("/", userControl.getUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 5 }),
  ],
  userControl.signup
);

router.post("/login", userControl.login);

module.exports = router;
