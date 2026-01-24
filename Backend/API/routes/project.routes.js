import { Router } from "express";
import { createProject, editProject, deleteProject, getAll, getByID } from "../controller/projects.controller.js";

const router = Router();

router.post('/create', createProject);

router.get('/all', getAll);

router.get('/:id', getByID);

router.patch('/edit/:id', editProject);

router.delete('/delete/:id', deleteProject);


export default router;