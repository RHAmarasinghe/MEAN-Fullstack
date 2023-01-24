const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header('Origin');
    res.header("Access-Control-Allow-Credentials",'true');
    res.header("Access-Control-Allow-Headers",'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Methos');
    res.header("Access-Control-Allow-Methods",'GET, POST, OPTIONS, PUT, DELETE');
    res.header("Allow",'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user", 
    [authJwt.verifyToken], 
    controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
