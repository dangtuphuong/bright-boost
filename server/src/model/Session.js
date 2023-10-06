import { DataTypes } from "sequelize";
import sequelize from "../../bin/www";

const Session = sequelize.define('session', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start: {
        type: DataTypes.STRING,
        allowNull: false
    },
    end: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_cancelled: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    num_students: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, { 
    tableName: "session", timestamps: false
});

export default Session;
