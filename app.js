const express = require("express");
const morgan = require("morgan");
const parser = require("./utils/parser");
const app = express();
const errorRoute = require("./utils/error");
const cors = require("cors");
const router = require("./routes/router");

app.use(cors());
app.use(morgan("dev"));
parser(app);
app.use("/", router);
app.use("/", errorRoute);

app.listen(8005);

module.exports = app;
