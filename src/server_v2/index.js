require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require('./db')
const models = require('./db_models/models')
const router = require('./Routes/index')

const AppSettings = require("./DefSetting")

const PORT= process.env.PORT

/*Экспортирование библиотеки express*/
const app = express()

/*Для работы c запросами*/
app.use(cors())
/*Для работы c json форматом*/
app.use(express.json())

/*Подлючаем компонент с маршрутами нашего сервера*/
app.use('/app', router)

/*Запуск сервера*/
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        /*Для стартовой конфигурации*/
        AppSettings.Settings()
        app.listen(PORT, ()=>console.log('Server is run'))
      
    
    } catch(e) {
        console.log(e)
    }
}


start()
