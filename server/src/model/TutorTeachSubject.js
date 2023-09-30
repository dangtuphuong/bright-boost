import { DataTypes } from "sequelize";
import sequelize from "../../bin/www";
import Subject from "./Subject";
import Tutor from "./Tutor";

const TutorTeachSubject = sequelize.define('tutor_teaches_subject', {
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
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Subject,
            key: 'id'
        }
    }
}, {
    tableName: "tutor_teaches_subject", timestamps: false
});

Tutor.hasMany(TutorTeachSubject, {as: 'SubjectDetails'});
TutorTeachSubject.belongsTo(Tutor);

Subject.hasMany(TutorTeachSubject);
TutorTeachSubject.belongsTo(Subject);

export default TutorTeachSubject;
