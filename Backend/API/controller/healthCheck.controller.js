import HealthCheck from '../models/HealthCheck.js';
import Project from '../models/Project.js';
import HealthIndicator from '../models/HealthIndicator.js';


export const healthCheck = async(req, res) => {

    try{

    const { comment, indicators } = req.body;

    const { id } = req.params;

    if(!indicators){
        res.status(400).json({error: 'Indicator é obrigatório'});
    }

    const project = await Project.findByPk(id);

    if(!project){
        return res.status(404).json({error: 'Projeto não encontrado'});
    }

    const project_id = id;

    function colorReview(){
    if(indicators.some(i => i.status == 'Crítico')){
        return 'Crítico';
    }

    if(indicators.some(i => i.status == 'Atenção')){
        return 'Atenção';
    }
    else {
        return 'Saudável';
    }
    };

    const healthCheck = await HealthCheck.create({
        project_id,
        comment,
        general_status: colorReview()
    });

     for(const indicator of indicators){
        const {type, status} = indicator;
    
    await HealthIndicator.create({
        health_check_id: healthCheck.id,
        type,
        status
    });
    }

    return res.status(201).json({message: 'Atualização criada com sucesso.'});

    } catch(err){
        console.error('Erro ao criar', err);
        res.status(500).json({error: 'Erro ao avaliar saúde', err});
    }

};

export const checkSummary = async(req,res) => {
    
    try{

        const projects = await Project.findAll({
            attributes: ['id'],
            include: [
                {
                    model: HealthCheck,
                    attributes: ['general_status', 'created_at'],
                    separate: true,
                    limit: 1,
                    order: [['created_at', 'DESC']]
                }
            ]
        })

        if(!projects){
            res.status(404).json({ error: 'Nenhum indicador encontrado'});
        }

        const summary = {

            Saudável: 0,
            Atenção: 0,
            Crítico: 0,
            'Sem status': 0
        };

        for (const project of projects) {
            const lastCheck = project.HealthChecks[0];            
        

        if(!lastCheck){
            summary['Sem status']++;
        }else{
            summary[lastCheck.general_status]++;
        }
    }

        const response = {
            data: [
                { label: 'Saudável', value: summary['Saudável']},
                { label: 'Atenção', value: summary['Atenção']},
                { label: 'Crítico', value: summary['Crítico']},
                { label: 'Sem status', value: summary['Sem status']}
            ],
            total: projects.length
        };

        return res.json({response});
        

    } catch (err){
        res.status(500).json({error: 'Erro ao buscar indicadores', err});
    }
};

export const checkSummarybyID = async (req,res) => {

    try{

        const {id} = req.params;

        if(!id){
            return res.status(404).json({ error: 'O ID é obrigatório'});
        }

        const project = await Project.findByPk(id,{
            attributes: ['id'],
            include: [
                {
                    model: HealthCheck,
                    attributes: ['general_status', 'created_at'],
                    order: [['created_at', 'DESC']]
                }
            ]
        })

        if(!project){
            return res.status(404).json({ error: 'Nenhum indicador encontrado'});
        }

        const summary = {

            Saudável: 0,
            Atenção: 0,
            Crítico: 0,
            'Sem status': 0
        };

        const checks = project.HealthChecks;        

        if(!checks || checks.length === 0){
            summary['Sem status']++;
        }else{
            for(const check of checks){
            summary[check.general_status]++;
            }
        }

        const response = {
            data: [
                { label: 'Saudável', value: summary['Saudável']},
                { label: 'Atenção', value: summary['Atenção']},
                { label: 'Crítico', value: summary['Crítico']},
                { label: 'Sem status', value: summary['Sem status']}
            ],
        };

        return res.json({response}); 
             
    } catch (err){
        console.log(err);
        res.status(500).json({error: 'Erro ao buscar indicadores', err});
    }
};