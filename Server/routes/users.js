const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const generateAuthToken = require("../common/auth");
const { v4: uuidv4 } = require("uuid");

const {
  registerUser,
  userLogin,
}=require("../controllers/UserController")



router.post("/register",registerUser)
router.post("/login",userLogin)


module.exports = router;
