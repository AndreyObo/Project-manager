const Router = require('express')
const router = new Router()
const OrgTypeController= require('../Controllers/OrgTypeController')

router.get('/get_all', OrgTypeController.GetAll)
router.get('/get_id', OrgTypeController.GetById)
//router.get('/getAll',OrganizationController.getAll)

module.exports = router