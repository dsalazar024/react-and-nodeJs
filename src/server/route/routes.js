"use strict";

var express = require("express");

const api = express.Router();
const filesController = require("../controller/files.controller");

api.get("/files/data", filesController.getAllFiles);

module.exports = api;