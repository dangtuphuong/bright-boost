import { DataTypes } from "sequelize";
import sequelize from "../../bin/www";
import Session from "./Session";    
import Student from "./Student";

const Attendant = sequelize.define('attendant', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Student,
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
    },
    time_attend: {
        type: DataTypes.DATE,
        allowNull: false
    },
    tutor_mark: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, { 
    tableName: "attendant", timestamps: false
});

Session.hasMany(Attendant);
Attendant.belongsTo(Session);

Student.hasMany(Attendant);
Attendant.belongsTo(Student);

export default Attendant;
