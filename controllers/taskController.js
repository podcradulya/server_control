const uuid = require("uuid");
const path = require("path");
const {Task} = require("../models/models");
const ApiError = require("../error/apiError");
const router = require("../routes");

class TaskController {
    async create(req, res, next){
        try{
            const {numberTesiz, statusID, datetimeon, user_executorID, user_authorID, priorityID} = req.body;
            const task = await Task.create({numberTesiz, statusID, datetimeon, user_executorID, user_authorID, priorityID})
            return res.json(task);
        } catch(e){
            next(ApiError.bedRequest(e.message))
        }
        
    }

    async getAll(req, res){
        const {statusID, priorityID} = req.query;
        let tasks;
        if(!statusID && !priorityID){
            tasks = await Task.findAll();
        }
        return res.json(tasks);

    }
    async getOne(req, res){

    }
}

module.exports = new TaskController();