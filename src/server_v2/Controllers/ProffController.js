const {Profession} = require('../db_models/models')

class ProffController {

    async GetAll(req, res) {
      const proff =  await Profession.findAll()
      return res.json(proff)
    }

    async GetById(req, res) {
      const {id} = req.query
      const proff = await Profession.findOne({where:{Id:id}})
      return res.json(proff)
    }

}

module.exports = new ProffController()