const {Users, Workgroup, Projects} = require('../db_models/models')

class UserController {
    /*Создание пользователя*/
    async Create(req, res) {
      /*Деструктуризация тела запроса*/
      const {name, proff_id, birtday} = req.body
      /*Проверка на пустые поля*/
      if(!name || !proff_id) {
        return res.json({Message:"DataError"})
      }
      const user = await Users.create({Name:name, professionId: proff_id, Birthday: birtday})
      res.json({Message:"Done"})
    }
    /*Извлечь всех пользователей*/
    async GetAll(req, res) {
      const users = await Users.findAll()
      res.json(users)
    }

    /*Извлечь пользователя по id*/
    async GetById(req, res) {
      const {id} = req.query
      if(!id) {
        return res.json({Message:"DataError"})
      }
      const user= await Users.findOne({where:{Id:id}})
      return res.json(user)
    }


    /*Удалить пользователя по id*/
    async DeleteById(req, res) {
      const {id} = req.query
      var activeUser = false
      const UsersInfo = {
        Message:"ActiveUser",
        Workgroups:[],
        Projects:[]
      }

      /*Выполняем проверку, состоит ли сотрудник в рабочих группах*/
      const w_groups = await Workgroup.findAll({where:{userId:id}})
      if(w_groups.length !=0) {
        activeUser = true
        UsersInfo.Workgroups = w_groups
      }
      /*Выполняем проверку, являеться ли пользователь руководителем проектов*/
      const projects = await Projects.findAll({where:{MainUsersId:id}})
      if(projects.length !=0) {
        activeUser = true
        UsersInfo.Projects = projects
      }

      /*Если пользователь где-либо задействован отправляем информация об этом, удаление отменяем*/
      if(activeUser) {
        return res.json(UsersInfo)
      }

      const del_user = await Users.findOne({where:{Id:id}})
      
      /*Пользователь не найден*/
      if(!del_user) {
        return res.json({Message:"UserNotFound"})
      }

      /*Удаление*/
      await del_user.destroy()
      res.json({Message:"Done"})
    }

}

module.exports = new UserController()