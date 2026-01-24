import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js'

const Project = sequelize.define('Project', {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    area: {
        type: DataTypes.STRING,
        allowNull: false
    },
    responsible: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    expected_end_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
    },
    {
        tableName: 'projects',
        underscored: true,
        timestamps: true
});

export default Project;

