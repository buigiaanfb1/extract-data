const { authJwt } = require('../middleware');
const controller = require('../controllers/search.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'authorization, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post(
    '/api/keywords/crawl',
    [authJwt.verifyToken],
    controller.searchByEachKeyWords
  );

  app.get(
    '/api/keywords',
    [authJwt.verifyToken],
    controller.findAllKeywordsById
  );

  app.get(
    '/api/keywords/search',
    [authJwt.verifyToken],
    controller.findKeywordInfo
  );
};
