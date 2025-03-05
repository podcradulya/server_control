const router = require("../routes");
const XLSX = require('xlsx');
const path = require("path");
const fs = require('fs');
const {Task, Status, User} = require("../models/models");
const { log } = require("console");



class reportController {
    async createReport(req, res){
        try {
            // Получаем все задачи
            const tasks = await Task.findAll({
                include: [{
                    model: Status,
                    attributes: ['name'], // Получаем только имя статуса
                },
                {
                    model: User,
                    attributes: ['login'], // Получаем только имя пользователя
                }],
            });
           
            
    
             // Группируем задачи по статусу и исполнителю
        const groupedTasks = {};
        tasks.forEach(task => {
            const statusName = task.status.name;
            const assigneeName = task.user_executor_id.login;

            if (!groupedTasks[statusName]) {
                groupedTasks[statusName] = {};
            }

            if (!groupedTasks[statusName][assigneeName]) {
                groupedTasks[statusName][assigneeName] = 0;
            }
            console.log(groupedTasks)

            groupedTasks[statusName][assigneeName]++;
        });

    
            // Создаем массив для XLSX
            const reportData = [['ФИО ответственного', 'Статус', 'Количество задач']];
            for (const [status, tasks] of Object.entries(groupedTasks)) {
                const assigneeNames = [...new Set(tasks.map(task => task))]; // Получаем уникальные ФИО ответственных
                console.log(assigneeNames)
                reportData.push([assigneeNames.join(', '), status, tasks.length]);
            }
    
            // Создаем новую книгу и лист
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.aoa_to_sheet(reportData);
    
            // Добавляем лист в книгу
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Отчет о задачах');
    
            // Генерируем файл
            const filePath = `${__dirname}/task_report.xlsx`;
            XLSX.writeFile(workbook, filePath);
    
            // Отправляем файл как ответ
            res.download(filePath, 'task_report.xlsx', (err) => {
                if (err) {
                    console.error('Ошибка при отправке файла:', err);
                }
            });
        } catch (error) {
            console.error('Ошибка при генерации отчета:', error);
            res.status(500).send('Ошибка при генерации отчета');
        }
    }}

module.exports = new reportController();