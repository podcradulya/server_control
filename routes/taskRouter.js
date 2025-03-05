const Router = require("express");
const TaskController = require("../controllers/taskController");
const router = new Router()


// router.post("/", CheckRoleMiddleware("ADMIN"), TaskController.create)
router.post("/", TaskController.create)
router.get("/", TaskController.getAll)
router.put("/:id", TaskController.update) 
router.delete("/:id", TaskController.delete) 

module.exports = router;