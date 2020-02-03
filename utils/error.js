const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  next({
    status: 404,
    message: "Not found"
  });
});

router.use((error, req, res, next) => {
  res.status(404).json({
    status: error.status,
    message: error.message
  });
});

module.exports = router;
