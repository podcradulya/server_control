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
    async update(req, res){
        const { id } = req.params;
        const { number_tesiz, status_id, datetimeon, user_executor_id, priority_id } = req.body;
    
        try {
            const task = await Task.findByPk(id);
            if (!task) {
                return res.status(404).send('Задача не найдена');
            }
    
            task.number_tesiz = number_tesiz;
            task.status_id = status_id;
            task.datetimeon = datetimeon;
            task.user_executor_id = user_executor_id;
            task.priority_id = priority_id;
            await task.save();
    
            res.status(200).json(task);
        } catch (error) {
            console.error(error);
            res.status(500).send('Не удалось обновить задачу');
        }

    }
    async delete(req, res){
        const { id } = req.params;

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).send('Задача не найдена');
        }

        await task.destroy();
        res.status(204).send(); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка удаления');
    }
    }
    async getOne(req, res){

    }
}

module.exports = new TaskController();