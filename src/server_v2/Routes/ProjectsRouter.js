const Router = require('express')
const router = new Router()
const ProjectController= require('../Controllers/ProjectController')

router.post('/create', ProjectController.Create)
router.get('/get_all', ProjectController.GetAll)
router.get('/get_all_titles', ProjectController.GetAllTitles)
router.post('/update', ProjectController.UpdateProject)
router.delete('/delete', ProjectController.DeleteProject)

module.exports = router