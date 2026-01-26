import sequelize from './database/db.js';
import app from './app.js';

const PORT = process.env.PORT || 3000;

(async () => {
    try{
        await sequelize.authenticate();
        console.log('Conexão com o banco OK');

        await sequelize.sync({ alter: true});

        app.listen(PORT || 3000, '0.0.0.0', () => {
            console.log(`Servidor rodando na porta ${PORT || 3000}`);
        })

    } catch (err){
        console.error('Erro na conexão', err);
    }
})();