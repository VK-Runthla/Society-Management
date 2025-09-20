const express = require("express");
const cors = require("cors");
const ratelimit = require("express-rate-limit");
const { router } = require("./src/routes/routes.js");
require("dotenv").config();
require("./src/config/db.config.js")
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rate Limiting
const limiter = ratelimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
});
app.use(limiter);

// CORS for all routes
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// routes
app.use("/api", router);

// Start the server
app.listen(port, () =>
  console.log(`App is running on :- http://localhost:${port}/api`)
);
