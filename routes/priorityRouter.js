const Router = require("express");
const PriorityController = require("../controllers/priorityController");
const router = new Router()

router.get("/", PriorityController.getAll)

module.exports = router;