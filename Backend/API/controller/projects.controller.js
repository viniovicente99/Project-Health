import { Project, HealthCheck, HealthIndicator } from '../models/index.js';



export const createProject = async(req, res) => {
    try {

        const { name, area, responsible, start_date, expected_end_date,} = req.body;

        if(!name || !area || !responsible || !start_date || !expected_end_date){
            return res.status(400).json({error: 'Campo(s) Obrigatório(s) vázio(s).'});
        }

        const project = await Project.create({
            name,
            area,
            responsible,
            start_date,
            expected_end_date,

        });

        res.status(201).json({message: 'Projeto criado com sucesso!'});
        
    }
    catch(err){
        res.status(500).json({error: 'Erro ao cadastrar', err});
    }
};

export const getAll = async(req,res) => {
    try{
        const projects = await Project.findAll({
            include: [
                {
                    model: HealthCheck,
                    attributes: ['general_status', 'comment', 'created_at', 'updated_at'],
                    separate: true,
                    order: [['updated_at', 'DESC']],
                    include: [
                        {
                            model: HealthIndicator,
                            attributes: ['type', 'status', 'created_at', 'updated_at'],
                            required: false,
                            order: [['updated_at', 'DESC']],
                        }
                    ]
                }
            ],

            order: [['createdAt', 'DESC']]
        });

        res.json({projects});

    } catch(err){       
        res.status(500).json({error: 'Erro ao listar Projetos'});

    }
};

export const getByID = async(req,res) =>{

    try{
        const {id} = req.params;

        if(!id){
            res.status(400).json({error: 'O ID é obrigatório'});
        }

        const project = await Project.findByPk(id,{
            
            include: [
                {
                    model: HealthCheck,
                    attributes: ['general_status', 'comment', 'created_at', 'updated_at'],
                    required: false,
                    separate: true,
                    include: [
                        {
                            model: HealthIndicator,
                            attributes: ['type', 'status', 'created_at', 'updated_at'],
                            required: false
                        }
                    ],
                    order: [['updated_at', 'DESC']]
                }
            ]
        });

        res.json({project});

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Erro ao buscar', err});

    }
};


export const editProject = async (req, res) => {
    try {
        const {name, area, responsible, start_date, expected_end_date} = req.body;

        const {id} = req.params;

        const project = await Project.findByPk(id);

        if(!project){
            return res.status(404).json({error: 'Projeto não encontrado.'});
        }

        await project.update({
        ...(name && { name }),
        ...(area && { area }),
        ...(responsible && { responsible }),
        ...(start_date && { start_date }),
        ...(expected_end_date && { expected_end_date })
    });
        res.status(200).json({message: 'Projeto atualizado com sucesso!'});
    }
    catch(err){
        res.status(500).json({error: 'Erro ao alterar', err});
    }
};

export const deleteProject = async(req,res) => {
    try{

        const { id } = req.params;

        if(!id){
            res.status(400).json({error: 'ID é obrigatório'});
        }

        const project = await Project.findByPk(id);

        if(!project){
            res.status(404).json({error: 'Projeto não encontrado'});
        }

        const deleteProject = await Project.destroy({
            where: { id },
            force: true
        });

        res.status(204).json({message: 'Deletado com sucesso.'});

    } catch(err){
        res.status(500).json({error: 'Erro ao excluir projeto', err});
    }
};