import { Sequelize } from "sequelize";

const sequelize = new Sequelize("bright_boost_schema", "admin", "Daovuhoangnam99", {
    dialect: "mysql",
    host: "db-instance.crruajoumg3g.ap-southeast-2.rds.amazonaws.com",
    port: "3306"
  });

sequelize.authenticate().then(() => {console.log("Connection has been established successfully!")}).catch(err => console.log("Can't establish database connection:" + err))

export default sequelize;