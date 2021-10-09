const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const checkAuth = require("../middleware/check-auth");
const UserController = require("../controllers/user");

router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 32 }),
  UserController.user_signup
);

router.post("/signin", UserController.user_signin);

router.put("/logout", UserController.user_logout);

router.get("/activate/:link", UserController.user_activate);

router.get("/refresh", UserController.user_refresh);

router.patch("/", (req, res, next) => {});

router.delete("/:userId", checkAuth, UserController.user_delete);

module.exports = router;
