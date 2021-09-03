const { Router } = require("express");
const controllers = require("../controllers");
const router = Router();

router.get("/guest", controllers.lookupGuest);

router.post("/visit", controllers.createVisit);

module.exports = router;
