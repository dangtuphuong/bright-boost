import { DataTypes } from "sequelize";
import sequelize from "../../bin/www";
import Session from "./Session";
import Tutor from "./Tutor";

const TutorTeachSession = sequelize.define('tutor_teaches_session', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    tutorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tutor,
            key: 'id'
        }
    },
    sessionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Session,
            key: 'id'
        }
    }
}, { 
    tableName: "tutor_teaches_session", timestamps: false
});

Tutor.hasMany(TutorTeachSession);
TutorTeachSession.belongsTo(Tutor);

Session.hasMany(TutorTeachSession, {as: 'TutorDetails'});
TutorTeachSession.belongsTo(Session);

export default TutorTeachSession;
