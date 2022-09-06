const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Profession = sequelize.define('profession',
{
    Id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    Title:{type:DataTypes.STRING, unique: false},
}) 

const OrgType = sequelize.define('org_type',
{
    Id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    Type:{type:DataTypes.STRING, unique: false},
}) 

const Users = sequelize.define('users',
{
    Id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    Name:{type:DataTypes.STRING, unique: false},
   // ProfessionId:{type:DataTypes.INTEGER, unique: false},
    Birthday:{type:DataTypes.STRING, unique: false},
}) 

const Organization = sequelize.define('organization',
{
    Id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    Title:{type:DataTypes.STRING, unique: false},
   // OrgTypeId:{type:DataTypes.INTEGER, unique: false},
}) 

const Workgroup = sequelize.define('workgroup', {
    Id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
 //   ProjectId: {type:DataTypes.INTEGER,unique: false},
  //  UsersId: {type:DataTypes.INTEGER,  unique: false},
})

const Breakpoints = sequelize.define('breakpoints', {
    Id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
  //  ProjectId: {type:DataTypes.INTEGER, unique: false},
    StartData:{type:DataTypes.STRING, unique: false},
    FinishData:{type:DataTypes.STRING, unique: false},
    Description: {type:DataTypes.STRING, unique: false},
    Status:{type:DataTypes.STRING, unique: false},
})


const Projects = sequelize.define('projects', {
    Id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    ProjectName:{type:DataTypes.STRING, unique: false},
   // OrganizationId:{type:DataTypes.INTEGER, unique: false},
    MainUsersId: {type:DataTypes.INTEGER,  unique: false},
    StartData:{type:DataTypes.STRING, unique: false},
    FinishData:{type:DataTypes.STRING, unique: false},
    Description: {type:DataTypes.STRING, unique: false},
})


Profession.hasMany(Users)
Users.belongsTo(Profession)

OrgType.hasMany(Organization)
Organization.belongsTo(OrgType)

Projects.hasMany(Workgroup)
Workgroup.belongsTo(Projects)

Users.hasMany(Workgroup)
Workgroup.belongsTo(Users)

Projects.hasMany(Breakpoints)
Breakpoints.belongsTo(Projects)

Organization.hasMany(Projects)
Projects.belongsTo(Organization)

module.exports = {
    Profession,
    OrgType,
    Users,
    Organization,
    Workgroup,
    Breakpoints,
    Projects
}