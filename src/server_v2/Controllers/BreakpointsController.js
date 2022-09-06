const {Breakpoints} = require('../db_models/models')

class BreakpointsController {
    async AddPoint(req, res) {
        const {projectid, startd, finishd, description, status} = req.body
        if(!startd || !finishd || !status) {
            return res.json({Message:"DataError"})
        }
        const bp = await Breakpoints.create({StartData:startd,
            FinishData:finishd,
            Description:description,
            Status:status,
            projectId:projectid
            }).catch(e=>{
            console.log(e)
            return res.json({Message:"DataBaseError"})
        })
        res.json({Message:"Done"})
    }

    async UpdatePoint(req, res) {
        const {id, startd, finishd, description, status} = req.body
        if(!id || !startd || !finishd || !status) {
            return res.json({Message:"DataError"})
        }
        const bp = await Breakpoints.update({StartData:startd,
            FinishData:finishd,
            Description:description,
            Status:status,
            }, {where:{Id:id}}).catch(e=>{
            console.log(e)
            return res.json({Message:"DataBaseError"})
        })
        res.json({Message:"Done"})
    }

    async GetPoints(req, res) {
        const {proj_id} = req.query
        if(!proj_id) {
            return res.json({Message:"DataError"})
        }
        const points = await Breakpoints.findAll({where:{projectId:proj_id}})
        return res.json(points)
    }

    async DeletePoint(req, res) {
        const {id} = req.query
        if(!id) {
            return res.json({Message:"DataError"})
        }
        const bp = await Breakpoints.findOne({where:{Id:id}})
        if(bp) {
            await bp.destroy()
            res.json({Message:"Done"})
        }
    }
}

module.exports = new BreakpointsController()