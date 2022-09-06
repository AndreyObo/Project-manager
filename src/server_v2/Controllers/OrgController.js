const {Organization, Projects} = require('../db_models/models')

class OrgController {
    async Create(req, res) {
      const {title, org_type_id} = req.body
      if(!title || !org_type_id) {
        return res.json({Message:"Data Error"})
      }
      const org = await Organization.create({Title:title, orgTypeId: org_type_id})
      res.json({Message:"Done"})
    }

    async GetAll(req, res) {
      const orgs = await Organization.findAll()
      return res.json(orgs)
    }

    async GetById(req, res) {
      const {id} = req.query
      if(!id) {
        return res.json({Message:"Data Error"})
      }
      const org= await Organization.findOne({where:{Id:id}})
      return res.json(org)
    }

    async DeleteById(req, res) {
        const {id} = req.query
      //  console.log(req.query)
      //  console.log(id)
        if(!id) {
            return res.json({Message:"Data Error"})
        }

        const proj = await Projects.findAll({where:{organizationId:id}})
        if(proj.length !=0) {
            return res.json({Message:"Link Error", projects:proj})
        }
        const org = await Organization.findOne({where:{Id:id}})
        await org.destroy()
        
        res.json({Message:"Done"})
    }

}

module.exports = new OrgController()