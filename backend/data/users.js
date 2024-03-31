const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
  {
    name: "Rocky singh",
    email: "rocky123@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: false,
  },
  {
    name: "Rahul Singh",
    email: "rahul123@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: false,
  },
];

module.exports = users;
