import { DataTypes } from "sequelize";
import sequelize from "../../bin/www";

const Subject = sequelize.define("subject", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, { 
    tableName: "subject", timestamps: false
});

export default Subject;