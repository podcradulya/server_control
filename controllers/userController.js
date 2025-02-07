const router = require("../routes");
const ApiError = require("../error/apiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {User, Backet} = require("../models/models");
const { extensions } = require("sequelize/lib/utils/validator-extras");

generateJWT = (id, firstName, lastName, fatherName, role, jobtitle, subordination_id) => {
    return jwt.sign({id, firstName, lastName, fatherName, role, jobtitle, subordination_id}, process.env.SECRET_KEY,
        {expiresIn: "12h"}
    )
}

class UserController {
    async create(req, res, next){
        const {firstName, lastName, fatherName, password, role, jobtitle, subordination_id} = req.body;
        if (!firstName || !lastName || !fatherName || !password || !jobtitle){
            return next(ApiError.bedRequest("Некорректные данные"))
        }
        const candidate = await User.findOne({where: {firstName, lastName, fatherName}})
        if (candidate){
            return next(ApiError.bedRequest("Пользователь уже существует"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = User.create({firstName, lastName, fatherName, password: hashPassword, role, jobtitle, subordination_id})

        const basket = Backet.create({userID: user.id})

        const token = generateJWT(user.id, user.firstName, user.lastName, user.fatherName, user.role, user.jobtitle, user.subordination_id)
        return res.json({token})
    }
    async login(req, res, next){
        const {firstName, lastName, fatherName, password} = req.body;
        const user = await User.findOne({where: {firstName, lastName, fatherName}})
        if (!user){
            return next(ApiError.bedRequest("Пользователь с таким ФИО не найден"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)

        if (!comparePassword){
            return next(ApiError.bedRequest("неверный пароль"))
        }
        const token = generateJWT(user.id, user.firstName, user.lastName, user.fatherName, user.role, user.jobtitle, user.subordination_id)
        return res.json({token})

    }
    async check(req, res, next){
        const token = generateJWT(req.user.id, req.user.firstName, req.user.lastName, req.user.fatherName, req.user.role, req.user.jobtitle, req.user.subordination_id)
        return res.json({token})
    }
}

module.exports = new UserController();