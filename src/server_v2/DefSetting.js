var fs = require('fs');
const {Profession} = require('./db_models/models')
const {OrgType} = require('./db_models/models')

class AppSettings {
    async Settings() {
        var appset = JSON.parse(fs.readFileSync('./settings.json', 'utf8'));
        if(appset.TableExist == "false") {
         await this.CreateDefTables()
         appset.TableExist = "true"
         fs.writeFileSync('./settings.json', JSON.stringify(appset));
           
         console.log("App setting")
        }
       // console.log(obj)
       // obj.TableExist = "true"
      //  console.log(obj)
     //   console.log('saving')
     //   fs.writeFile('./settings.json', JSON.stringify(appset));
    }

    async GetAll() {
        const profs = await Profession.findAll()
        console.log(profs)
    }

    async CreateDefTables() {
        //Список должностей
        console.log("try create")
        await Profession.create({Title:"Руководитель проекта"})
        await Profession.create({Title:"Главный специалист"})
        await Profession.create({Title:"Ведущий специалист"})
        await Profession.create({Title:"Проектный менеджер"})
        //Типы организаций
        await OrgType.create({Type:"Промышленность"})
        await OrgType.create({Type:"Здравоохранение"})
        await OrgType.create({Type:"ОИВ"})
        await OrgType.create({Type:"Образование"})
        await OrgType.create({Type:"Строительство"})
    }
}

module.exports = new AppSettings()