const { Router } = require("express");
const controllers = require("../controllers");
const router = Router();

router.get("/name-search", controllers.nameSearch);
router.get("/guests", controllers.getAllGuests );
router.get("/affiliates", controllers.getAllAffiliates);
// router.put("/guests/:id");
// router.put("/affiliate/:id");
// router.delete("/guests/:id");
// router.delete("/affiliates/:id");

router.post("/visit", controllers.createVisit);


module.exports = router;
