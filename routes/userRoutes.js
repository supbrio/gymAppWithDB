const express = require("express");
const { getAllUsers, getUser } = require("../controllers/userController");
const { signIn, logIn, protect } = require("../controllers/authController");

const router = express.Router();
router.route("/signin").post(signIn);
router.route("/login").post(logIn);
router.route("/").get(protect, getAllUsers);
router.route("/:id").get(getUser);

module.exports = router;
