import { DataTypes } from "sequelize";
import sequelize from "../../bin/www";

const Tutor = sequelize.define("tutor", {
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
    tableName: "tutor", timestamps: false
})

export default Tutor;