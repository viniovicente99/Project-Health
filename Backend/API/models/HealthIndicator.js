import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import HealthCheck from './HealthCheck.js';

const HealthIndicator = sequelize.define('HealthIndicator', {

    health_check_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: HealthCheck,
            key: 'id'
        }
    },

    type: {
        type: DataTypes.STRING,
        allowNull: false
    },

     status: {
        type: DataTypes.STRING,
        allowNull: false
    }
    },
    {
        tableName: 'health_indicators',
        underscored: true,
        timestamps: true


});

export default HealthIndicator;
