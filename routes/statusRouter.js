const Router = require("express");
const StatusController = require("../controllers/statusContoller");
const router = new Router()

router.get("/", StatusController.getAll)

module.exports = router;