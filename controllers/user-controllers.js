const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../modules/http-error");

const DUMMY_USERS = [
  {
    id: "u4",
    name: "Subrabala",
    email: "subrabla@gmail.com",
    password: "test",
  },
];

const getUsers = (req, res, next) => {
  res.status(201).json({ "All Users :": DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Ivalid inputs", 422);
  }

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((p) => p.email === email);
  if (hasUser) {
    throw new HttpError("User Already Exists", 422);
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };
  DUMMY_USERS.push(createdUser);
  res.json({ "New User": createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const verifiedUser = DUMMY_USERS.find((u) => email === u.email);
  if (!verifiedUser || verifiedUser.password !== password) {
    throw new HttpError("Wrong Credentials, User Doesn't exist", 401);
  }

  res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
