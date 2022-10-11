const db = require('../models');
const config = require('../../config/auth.config.js');
const User = db.user;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.getAuth = (req, res) => {
  let token = req.headers['authorization'];

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        statusCode: 401,
        data: {
          isValid: false,
        },
        errors: null,
      });
    } else {
      User.findOne({
        where: {
          id: decoded.id,
        },
      })
        .then((user) => {
          var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 24 hours
          });

          res.status(200).send({
            statusCode: 200,
            data: {
              id: user.id,
              username: user.username,
              email: user.email,
              accessToken: token,
            },
            errors: null,
          });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    }
  });
};

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      res.status(200).send({
        statusCode: 200,
        data: null,
        errors: 'Successfully created account',
      });
    })
    .catch((err) => {
      res.status(500).send({
        statusCode: 500,
        data: {
          message: 'SERVER_ERROR',
        },
        errors: null,
      });
    });
};

exports.signin = (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  User.findOne({
    where: {
      username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          statusCode: 404,
          data: null,
          errors: 'Wrong username or password',
        });
      }

      var passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Username or password is wrong, please double-check again!',
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        statusCode: 200,
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          accessToken: token,
        },
        errors: null,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
