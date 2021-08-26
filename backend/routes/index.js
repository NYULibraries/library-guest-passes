const { Router } = require("express");
const controllers = require("../controllers");
const router = Router();

router.get("/users", controllers.lookupUsers);

router.post("/users", controllers.updateOrCreateUser);

router.post('/test', controllers.createVisit);

module.exports = router;
