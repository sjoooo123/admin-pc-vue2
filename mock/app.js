const path = require("path");
const express = require("express");
const apiMocker = require("webpack-api-mocker");

const app = express();

apiMocker(app, path.resolve("./static/index.js"));
app.listen(5300);
