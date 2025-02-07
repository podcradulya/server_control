const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: {type: DataTypes.STRING,  allowNull: false},
    lastName: {type: DataTypes.STRING,  allowNull: false},
    fatherName: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    jobtitle: {type: DataTypes.STRING,  allowNull: false},
    subordination_id: {type: DataTypes.INTEGER},
})

const Backet = sequelize.define("basket", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
},
{
    timestamps: false,
  })
const BacketTask = sequelize.define("basket_task", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
},
{
    timestamps: false,
  })
const Task = sequelize.define("task", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    numberTesiz: {type: DataTypes.STRING, allowNull: false},
    statusID: {type: DataTypes.STRING, allowNull: false},
    datetimeon: {type: DataTypes.DATE, allowNull: false},
    user_executorID: {type: DataTypes.INTEGER, allowNull: false},
    user_authorID: {type: DataTypes.INTEGER, allowNull: false},
    priorityID: {type: DataTypes.STRING, allowNull: false},
})

const Status = sequelize.define("status", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true,  allowNull: false},
},
{
    timestamps: false,
  })

const Priority = sequelize.define("priority", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true,  allowNull: false},
},
{
    timestamps: false,
  })


User.hasOne(Backet)
Backet.belongsTo(User)

Backet.hasMany(BacketTask)
BacketTask.belongsTo(Backet)

Task.hasMany(BacketTask)
BacketTask.belongsTo(Task)

Status.hasMany(Task)
Task.belongsTo(Status)

Priority.hasMany(Task)
Task.belongsTo(Priority)


// Type.belongsToMany(Brand, {through: TypeBrand});
// Brand.belongsToMany(Type, {through: TypeBrand});

module.exports = {
    User,
    Backet,
    BacketTask,
    Task,
    Status,
    Priority
}