const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// const { add, findBy } = require("./auth-model.js")

const Users = require("./auth-model");
const { validateUser } = require("./auth-model");

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  // always validate the data before sending it to the db
  const validateResult = validateUser(user);

  if (validateResult.isSuccessful === true) {
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;

    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({
      message: "Invalid information about the user, see errors for details",
      errors: validateResult.errors
    });
  }
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // 2: produce a token
        const token = getJwtToken(user.username);

        // 3: send the token to the client
        res.status(200).json({
          message: `Welcome ${user.username}! have a token...`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
