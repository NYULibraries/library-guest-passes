const { Router } = require("express");
const controllers = require("../controllers");
const router = Router();

router.get("/name-search", controllers.nameSearch);
router.get("/permission", controllers.permissionSearch);
router.get("/:typeOfVisitor", controllers.getAllVisitors);
router.get("/:typeOfVisitor/:id", controllers.getPreviousVisits);
router.put("/:typeOfVisitor/:id", controllers.updateVisitor);
router.post("/visit", controllers.createVisit);
router.delete("/guests/:id", controllers.deleteGuest);
router.delete("/affiliates/:id", controllers.deleteAffiliate);
router.delete("/visits/:id", controllers.deleteVisit);



module.exports = router;
