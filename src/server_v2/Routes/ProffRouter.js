const Router = require('express')
const router = new Router()
const ProffController= require('../Controllers/ProffController')

router.get('/get_all', ProffController.GetAll)
router.get('/get_id', ProffController.GetById)
//router.get('/getAll',OrganizationController.getAll)

module.exports = router