const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    first_name: {type: DataTypes.STRING,  allowNull: false},
    login: {type: DataTypes.STRING,  allowNull: false},
    last_name: {type: DataTypes.STRING,  allowNull: false},
    father_name: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    job_title: {type: DataTypes.STRING,  allowNull: false},
    subordination_id: {type: DataTypes.INTEGER},
},
{
    timestamps: true,
    createdAt: "created_at",
    updatedAt: 'updated_at',
  })


const Task = sequelize.define("task", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number_tesiz: {type: DataTypes.STRING, allowNull: false},
    // status_id: {type: DataTypes.INTEGER, allowNull: false},
    datetimeon: {type: DataTypes.DATE, allowNull: false},
    user_executor_id: {type: DataTypes.INTEGER, allowNull: false},
    user_author_id: {type: DataTypes.INTEGER, allowNull: false},
    // priority_id: {type: DataTypes.INTEGER, allowNull: false},
},
{
    timestamps: false,
    // createdAt: "created_at",
    // updatedAt: 'updated_at',
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

  const Subordination = sequelize.define("priority", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true,  allowNull: false},
    leader_id: {type: DataTypes.INTEGER, allowNull: false},
},
{
    timestamps: false,
  })


Status.hasMany(Task, {
  foreignKey: 'status_id'
})
Task.belongsTo(Status, {
  foreignKey: 'status_id'
})

Priority.hasMany(Task, {
  foreignKey: 'priority_id'
})
Task.belongsTo(Priority, {
  foreignKey: 'priority_id'
})


// Type.belongsToMany(Brand, {through: TypeBrand});
// Brand.belongsToMany(Type, {through: TypeBrand});

module.exports = {
    User,
    Task,
    Status,
    Priority,
    Subordination
}