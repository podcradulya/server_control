const router = require("../routes");
const ApiError = require("../error/apiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {User, Backet} = require("../models/models");
const { extensions } = require("sequelize/lib/utils/validator-extras");

generateJWT = (id, login, first_name, last_name, father_name, role, job_title, subordination_id) => {
    return jwt.sign({id, login, first_name, last_name, father_name, role, job_title, subordination_id}, process.env.SECRET_KEY,
        {expiresIn: "12h"}
    )
}

class UserController {
    async create(req, res, next){
        const {login, first_name, last_name, father_name, password, role, job_title, subordination_id} = req.body;
        if (!first_name || !last_name || !father_name || !password || !job_title){
            return next(ApiError.bedRequest("Некорректные данные"))
        }
        const candidate = await User.findOne({where: {login}})
        if (candidate){
            return next(ApiError.bedRequest("Пользователь уже существует"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = User.create({login, first_name, last_name, father_name, password: hashPassword, role, job_title, subordination_id})

        const basket = Backet.create({userID: user.id})

        const token = generateJWT(user.id, user.login, user.first_name, user.last_name, user.father_name, user.role, user.job_title, user.subordination_id)
        return res.json({token})
    }
    async login(req, res, next){
        const {login, password} = req.body;
        const user = await User.findOne({where: {login}})
        if (!user){
            return next(ApiError.bedRequest("Пользователь с таким логином не найден"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)

        if (!comparePassword){
            return next(ApiError.bedRequest("неверный пароль"))
        }
        const token = generateJWT(user.id, user.login, user.first_name, user.last_name, user.father_name, user.role, user.job_title, user.subordination_id)
        return res.json({token})

    }
    async check(req, res, next){
        const token = generateJWT(req.user.id, req.user.first_name, req.user.last_name, req.user.father_name, req.user.role, req.user.job_title, req.user.subordination_id)
        return res.json({token})
    }
    async remove(req, res, next){
        return res.json({token})
    }
    async getAll(req, res, next){
        const users = await User.findAll();
        return res.json(users);
    }
}

module.exports = new UserController();