// src/middlewares/checkDisposableEmail.js
const disposableDomains = require("../utils/disposableDomains");

function checkDisposableEmail(req, res, next) {
  const email = req.body?.email;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  const domain = email.split("@")[1]?.toLowerCase();

  if (disposableDomains.includes(domain)) {
    return res
      .status(400)
      .json({ error: "Disposable email addresses are not allowed." });
  }

  next();
}

module.exports = checkDisposableEmail;