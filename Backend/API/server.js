import sequelize from './database/db.js';
import app from './app.js';

const PORT = process.env.PORT || 7000;

(async () => {
    try{
        await sequelize.authenticate();
        console.log('Conexão com o banco OK');

        await sequelize.sync({ alter: true});

        app.listen(PORT || 7000, () => {
            console.log(`Servidor rodando na porta ${PORT || 7000}`);
        })

    } catch (err){
        console.error('Erro na conexão', err);
    }
})();