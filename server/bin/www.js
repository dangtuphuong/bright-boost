import { Sequelize } from "sequelize";

const sequelize = new Sequelize("bright_boost", "root", "Daovuhoangnam99", {
    dialect: "mysql",
    host: "34.129.92.138",
    port: "3306"
  });

sequelize.authenticate().then(() => {console.log("Connection has been established successfully!")}).catch(err => console.log("Can't establish database connection:" + err))

export default sequelize;