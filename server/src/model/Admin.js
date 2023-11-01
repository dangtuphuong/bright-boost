import { DataTypes } from "sequelize";
import sequelize from "../../bin/www";

const Admin = sequelize.define('admin',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: "admin", timestamps: false
});

export default Admin;