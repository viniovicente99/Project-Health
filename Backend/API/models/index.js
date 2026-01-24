import  sequelize from '../database/db.js';
import  Project from './Project.js';
import HealthCheck from './HealthCheck.js';
import HealthIndicator from './HealthIndicator.js';

Project.hasMany(HealthCheck, {foreignKey: 'project_id'});
HealthCheck.belongsTo(Project, {foreignKey: 'project_id'});

HealthCheck.hasMany(HealthIndicator, {foreignKey: 'health_check_id'});
HealthIndicator.belongsTo(HealthCheck, {foreignKey: 'health_check_id'});

export{
    sequelize,
    Project,
    HealthCheck,
    HealthIndicator
}