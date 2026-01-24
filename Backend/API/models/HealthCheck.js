import { DataTypes } from 'sequelize';
import sequelize  from '../database/db.js';
import Project from './Project.js';

const HealthCheck = sequelize.define('HealthCheck', {

    project_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Project,
            key: 'id'
        }

    },
    general_status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT
    }
    },
    {
        tableName: 'health_checks',
        underscored: true,
        timestamps: true

});

export default HealthCheck;