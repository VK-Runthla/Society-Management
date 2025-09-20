const express = require("express");
const auth = require("../../controller/auth");

// middleware
const upload = require("../../middleware/multer.js");
const checkDisposableEmail = require("../../middleware/checkDisposableEmail.js");

const v1Routes = express.Router();

v1Routes.post("/register", upload, checkDisposableEmail, auth.register);
v1Routes.post("/login", auth.login);
v1Routes.post("/forgot-password", auth.forgotPassword);
v1Routes.delete("/delete-user", auth.deleteAccount);

module.exports = { v1Routes };
