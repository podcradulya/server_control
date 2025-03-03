const Router = require("express");
const TaskController = require("../controllers/taskController");
const router = new Router()


// router.post("/", CheckRoleMiddleware("ADMIN"), TaskController.create)
router.post("/", TaskController.create)
router.get("/", TaskController.getAll)
router.get("/:id", TaskController.getOne) 

module.exports = router;