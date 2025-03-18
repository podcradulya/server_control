const Router = require("express");
const router = new Router();
const UserController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const CheckRoleMiddleware = require("../middleware/CheckRoleMiddleware");


router.post("/create",  UserController.create)
router.post("/login", UserController.login)
router.get("/all", UserController.getAll)
router.get("/auth",  UserController.check)

module.exports = router;