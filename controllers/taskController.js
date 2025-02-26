const uuid = require("uuid");
const path = require("path");
const {Task} = require("../models/models");
const ApiError = require("../error/apiError");
const router = require("../routes");

class TaskController {
    async create(req, res, next){
        try{
            const {number_tesiz, status_id, datetimeon, user_executor_id, user_author_id, priority_id} = req.body;
            const task = await Task.create({number_tesiz, status_id, datetimeon, user_executor_id, user_author_id, priority_id})
            return res.json(task);
        } catch(e){
            next(ApiError.bedRequest(e.message))
        }
        
    }

    async getAll(req, res){
        const {status_id, priority_id} = req.query;
        let tasks;
        if(!status_id && !priority_id){
            tasks = await Task.findAll();
        }
        return res.json(tasks);

    }
    async getOne(req, res){

    }
}

module.exports = new TaskController();