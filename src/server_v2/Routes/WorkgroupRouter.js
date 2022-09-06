const Router = require('express')
const router = new Router()
const WorkgroupController = require('../Controllers/WorkgroupController')

router.post('/add',WorkgroupController.AddUser)
router.delete('/delete', WorkgroupController.DeleteUser)
router.get('/get', WorkgroupController.GetByProjId)
router.delete('/del', WorkgroupController.DelU)

module.exports = router