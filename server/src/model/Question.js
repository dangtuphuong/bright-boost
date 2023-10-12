import { DataTypes } from "sequelize";
import sequelize from "../../bin/www";
import Session from "./Session";
import Tutor from "./Tutor";
import Student from "./Student";

const Question = sequelize.define('question', {
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
    tutorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_answered: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    time_publish: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    time_start: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    time_end: {
        type: DataTypes.BIGINT,
        allowNull: true
    }
}, { 
    tableName: "question", timestamps: false
});

Tutor.hasMany(Question);
Question.belongsTo(Tutor);

Session.hasMany(Question);
Question.belongsTo(Session);

Student.hasMany(Question);
Question.belongsTo(Student);

export default Question;
