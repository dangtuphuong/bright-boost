import { DataTypes } from "sequelize";
import sequelize from "../../bin/www";
import Session from "./Session";

const SessionStartEnd = sequelize.define('session_start_end', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true
    },
    sessionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Session,
            key: 'id'
        }
    },
    day: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { 
    tableName: "session_start_end", timestamps: false
});

Session.hasMany(SessionStartEnd);
SessionStartEnd.belongsTo(Session);

export default SessionStartEnd;
