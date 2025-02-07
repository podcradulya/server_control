const { Status } = require("../models/models");
const router = require("../routes");

class StatusController {
    async getAll(req, res){
        const status = await Status.findAll();
        return res.json(status);

    }
}

module.exports = new StatusController();