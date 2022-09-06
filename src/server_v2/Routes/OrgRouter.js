const Router = require('express')
const router = new Router()
const OrgController = require('../Controllers/OrgController')

router.post('/create',OrgController.Create)
router.get('/get_org', OrgController.GetById)
router.get('/get_all',OrgController.GetAll)
router.delete('/delete', OrgController.DeleteById)

module.exports = router