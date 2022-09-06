const Router = require('express')
const router = new Router()
const BreakpointsController = require('../Controllers/BreakpointsController')

router.post('/add',BreakpointsController.AddPoint)
router.get('/get',BreakpointsController.GetPoints)
router.post('/update', BreakpointsController.UpdatePoint)
router.delete('/delete',BreakpointsController.DeletePoint)


module.exports = router