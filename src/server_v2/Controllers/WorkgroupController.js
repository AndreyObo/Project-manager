const {Workgroup, Users} = require('../db_models/models')

class WorkgroupController {
    async AddUser(req, res) {
        const {progid, userid} = req.body
        if(!progid || !userid) {
            return res.json({Message:"Data Error"})
        }
        const user = await Workgroup.findOne({where:{projectId:progid, userId:userid}}) 

        console.log(user)
        if(user) {
            return res.json({Message:"User alredy exist"})
        }
        const wuser = await Workgroup.create({projectId:progid, userId:userid})
        res.json({Message:"Done"})
    }

    async DeleteUser(req, res) {
       const {progid, userid} = req.body
     
       if(!progid || !userid) {
        return res.json({Message:"Data Error"})
       }

       const item  = await Workgroup.findOne({where:{projectId:progid, userId:userid}})
      // console.log(item)
       await item.destroy()
       res.json({Message:"Done"})
    }

    async DelU(req, res) {
        const {pid, uid} = req.query
        if(!pid || !uid) {
            return res.json({Message:"Data Error"})
           }
    
           const item  = await Workgroup.findOne({where:{projectId:pid, userId:uid}})
          // console.log(item)
           await item.destroy()

        return res.json({Message:"Done"})
    }

    async GetByProjId(req, res) {
        const {id} = req.query
        if(!id) {
            return res.json({Message:"Data Error"})
        }
        const workgroup = await Workgroup.findAll({where:{projectId:id}})
       
        const users =[]
        for(let wg of workgroup) {
            let user =  await Users.findOne({where:{Id:wg.userId}})
            users.push(user)
        }
     //   for(let i=0; i<=workgroup.length; i++) {
      //     let user =  await Users.findOne({where:{Id:workgroup[i].userId}})
      //     users.push(user)
       // }
        return res.json(users)
    }
}

module.exports = new WorkgroupController()