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
                include: [
                {model: User, as: 'Executor', attributes: ['login'] },
                {model: Status, attributes: ['name'] }  
                ],
            });
           


    
             // Группируем задачи по статусу и исполнителю
        const groupedTasks = {};
        tasks.forEach(task => {
            const statusName = task.status.name;
            const assigneeName = task.Executor.login;
            

            if (!groupedTasks[statusName]) {
                groupedTasks[statusName] = {};
            }

            if (!groupedTasks[statusName][assigneeName]) {
                groupedTasks[statusName][assigneeName] = 0;
            }

            groupedTasks[statusName][assigneeName]++;
        });

                // Получаем все статусы
const statuses = new Set();
for (const status in groupedTasks) {
        statuses.add(status);  
}


            // Создаем массив для XLSX
            const statusArray = Array.from(statuses);
            const reportData = [['ФИО ответственного', ...statusArray]];
            const userTasks = {};
// Заполняем словарь с пользователями и задачами
for (const status of statusArray) {
    for (const user in groupedTasks[status]) {
        if (!userTasks[user]) {
            userTasks[user] = {};
        }
        userTasks[user][status] = groupedTasks[status][user];
    }
}
           // Заполняем массив данными
for (const user in userTasks) {
    const row = [user];
    for (const status of statusArray) {
        row.push(userTasks[user][status] || 0); // 0, если задач отсутствует для данного статуса
    }
    reportData.push(row);
}
        //     for (const [status, assignees] of Object.entries(groupedTasks)) {
        //         for (const [assignee, count] of Object.entries(assignees)) {
        //             reportData.push([assignee, status, count]);
        //         }
        // }
        console.log(reportData);

        
        
    
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