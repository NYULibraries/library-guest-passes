const { Router } = require("express");
const controllers = require("../controllers");
const router = Router();

router.get("/name-search", controllers.nameSearch);
router.get("/visits", controllers.getAllVisits);
router.get("/guests", controllers.getAllGuests);
router.get("/affiliates", controllers.getAllAffiliates);
router.get("/:typeOfVisitor/:id", controllers.getPreviousVisits)
// router.put("/guests/:id");
// router.put("/affiliate/:id");
router.delete("/guests/:id", controllers.deleteGuest);
router.delete("/affiliates/:id", controllers.deleteAffiliate);
router.post("/visit", controllers.createVisit);


module.exports = router;
