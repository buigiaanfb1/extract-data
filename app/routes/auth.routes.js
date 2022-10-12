const { verifySignUp } = require('../middleware');
const controller = require('../controllers/auth.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'authorization, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/auth', controller.getAuth);

  app.post(
    '/api/auth/signup',
    [verifySignUp.checkDuplicateUsernameOrEmail],
    controller.signup
  );

  app.post('/api/auth/signin', controller.signin);
};
