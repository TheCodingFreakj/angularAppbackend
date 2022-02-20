const express = require("express");
const router = express.Router();
const tokenAuth = require("../middlewares/tokenAuth");

//bring Controller

const {
  Signup,
  Signin,
  Signout,
  AuthenticatedToken,
} = require("../Controllers/userController");


router.post("/sign-up", Signup);
router.get("/sign-in", tokenAuth, AuthenticatedToken);
router.post("/sign-in", Signin);
router.get("/sign-out", Signout);

module.exports = router;