import { DataTypes } from "sequelize";
import sequelize from "../../bin/www";

const Student = sequelize.define("student", {
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
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false
    },
    gender: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    sessionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, { 
    tableName: "student", timestamps: false
})

export default Student;