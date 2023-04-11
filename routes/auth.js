"use strict";

const { SECRET_KEY } = require("../config");
const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../expressError");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const Router = require("express").Router;
const router = new Router();

/** POST /login: {username, password} => {token} */

router.post("/login", async function (req, res, next) {
  if (req.body === undefined) throw new BadRequestError();
  const { username, password } = req.body;

  // const answer = await User.authenticate(username, password)
  console.log("user auth inside post", answer);
  if (await User.authenticate(username, password) === true) {
    const token = jwt.sign({ username }, SECRET_KEY);
    console.log("token", token);
    return { token };
  } else {
    throw new UnauthorizedError("Invalid username/password");
  }
});

/** POST /register: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 */

module.exports = router;
