const {Projects, Breakpoints, Workgroup} = require('../db_models/models')

class ProjectController {
    async Create(req, res) {
        const {name, orgid, muserid, sdata, fdata, description} = req.body
        const project = await Projects.create({ProjectName:name, 
        organizationId:orgid, 
        MainUsersId:muserid,
        StartData:sdata,
        FinishData:fdata,
        Description:description}).catch(e=> {
            console.log(e)
            return res.json({Message:"DataBaseError"})
        })
        return res.json(project.Id)
    }

    async GetAll(req, res) {
        const projects = await Projects.findAll()
        return res.json(projects)
    }

    async GetAllTitles(req, res) {
        const projects = await Projects.findAll()
        var proj_list =[]
        projects.forEach(p => {
            proj_list.push({id:p.Id, title:p.ProjectName})
        });
        return res.json(proj_list)
    }

    async UpdateProject(req, res) {
        const {id, name, orgid, muserid, sdata, fdata, description} = req.body
        const project = await Projects.update({ProjectName:name, 
        organizationId:orgid, 
        MainUsersId:muserid,
        StartData:sdata,
        FinishData:fdata,
        Description:description}, {where:{Id:id}}).catch(e=> {
            return res.json({Message:"DataBaseError"})
        })
        res.json({Message:"Done"})
    }

    async DeleteProject(req, res) {
        const {id} = req.query
        //delete breackpoints
        let ar =[]
        const points = await Breakpoints.findAll({where:{projectId:id}})
       
        for(let pnt of points) {
            await pnt.destroy()
        }

        const g_users = await Workgroup.findAll({where:{projectId:id}})
        for(let user of g_users) {
           await user.destroy()
        }

        const proj = await Projects.findOne({where:{Id:id}})
        if(!proj) {
            return res.json({Message:"EmptyProject"})
        }
        await proj.destroy()
        res.json({Message:"Done"})
    }
}

module.exports = new ProjectController()