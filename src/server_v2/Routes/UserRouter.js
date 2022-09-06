const Router = require('express')
const router = new Router()
const UserController = require('../Controllers/UserController')

/*Создание маршрутов, определение методов http запросов*/
router.post('/create',UserController.Create)
router.get('/get_user', UserController.GetById)
router.get('/get_all', UserController.GetAll)
router.delete('/delete', UserController.DeleteById)

module.exports = router