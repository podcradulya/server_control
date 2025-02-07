const router = require("../routes");
const {Priority} = require("../models/models");
const ApiError = require("../error/apiError");



class PriorityController {
    async getAll(req, res){
        const priority = await Priority.findAll();
        return res.json(priority);
    }
}

module.exports = new PriorityController();