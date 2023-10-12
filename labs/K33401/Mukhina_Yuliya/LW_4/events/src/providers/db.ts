import {Sequelize} from 'sequelize-typescript'
import Event from "../models/event.model"
import Registration from "../models/registration.model"

// @ts-ignore
const sequelize = new Sequelize({
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: 'sqlite',
    storage: process.env.STORAGE,
    logging: false
})

const models = [Event, Registration]

sequelize.addModels(models)

sequelize
    .sync()
    .then(() => {
        //something here
        console.log('synced models')
    })
    .catch((e) => console.log(e));

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection()

export default sequelize