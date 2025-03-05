const Router = require("express");
const router = new Router()
const taskRouter = require("./taskRouter");
const priorityRouter = require("./priorityRouter");
const userRouter = require("./userRouter");
const statusRouter = require("./statusRouter");
const reportRouter = require("./reportRouter");

router.use("/user", userRouter);
router.use("/priority", priorityRouter);
router.use("/status", statusRouter);
router.use("/task", taskRouter);
router.use("/report", reportRouter);

module.exports = router;