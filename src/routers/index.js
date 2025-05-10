const routers = require("../configs/routers.config");
const { responseStatus } = require("../global/response");

function router(app) {
  app.use(routers);

  app.use((req, res) => {
    responseStatus(res, 404, "failed", "Route not found");
  });
}

module.exports = router;
