const { Router } = require("express");
const controllers = require("../controllers");
const router = Router();

router.get("/guest", controllers.lookupGuest);
// router.get("/affiliate", controllers.lookupGuest);
// router.get("/guests");
// router.get("/affiliates");
// router.put("/guests/:id");
// router.put("/affiliate/:id");
// router.delete("/guests/:id");
// router.delete("/affiliates/:id");

router.post("/visit", controllers.createVisit);


module.exports = router;
