const router = require("express").Router();
const authController = require("../../controllers/authController");

router.use("/auth", authController);

module.exports = router;
