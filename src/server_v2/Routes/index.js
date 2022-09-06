const Router = require('express')
const UserRouter = require('./UserRouter')
const OrgRouter = require('./OrgRouter')
const ProffRouter = require('./ProffRouter')
const OrgTypeRouter = require('./OrgTypeRouter')
const WorkgroupRouter = require('./WorkgroupRouter')
const BreakpointsRouter = require('./BreakpointsRouter')
const ProjectsRouter = require('./ProjectsRouter')

const router = new Router()

/*Подключаем все маршруты к главному обьекту*/
router.use('/user',UserRouter)
router.use('/org', OrgRouter)
router.use('/proff', ProffRouter)
router.use('/orgtype', OrgTypeRouter)
router.use('/workgroup', WorkgroupRouter)
router.use('/breakpoints', BreakpointsRouter)
router.use('/projects', ProjectsRouter)

module.exports = router