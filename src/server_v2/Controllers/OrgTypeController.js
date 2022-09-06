const {OrgType} = require('../db_models/models')

class OrgTypeController {

    async GetAll(req, res) {
      const orgs =  await OrgType.findAll()
      return res.json(orgs)
    }

    async GetById(req, res) {
      const {id} = req.query 
      const org = await OrgType.findOne({where:{Id:id}})
      return res.json(org)
    }

}

module.exports = new OrgTypeController()