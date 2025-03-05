const Router = require("express");
const reportController = require("../controllers/reportController");
const router = new Router()

router.get("/", reportController.createReport)

module.exports = router;