import { DataTypes } from "sequelize";
import sequelize from "../../bin/www";

const Session = sequelize.define('session', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    schedule: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Session;
