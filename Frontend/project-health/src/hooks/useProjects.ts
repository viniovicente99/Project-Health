import { useEffect, useState } from "react";
import { getProjects, createProject, editProjectService, deleteProjectService} from "../api/projects.api";
import type { Project } from "../types/Project";

export function useProjects(){
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const loadProjects = async () => {
        try{
            setLoading(true);
            const data = await getProjects();
            setProjects(data);
        } catch(error){
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const addProject = async(project: Omit<Project, 'id'>) => {
        await createProject(project);
    };

     const editProject = async (id: string, payload: Partial<Project>) => {
        try{
            setLoading(true);
            const data = await editProjectService(id, payload);
            return data;
        } catch(error){
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const deleteProject = async (id: string) => {
        try {
            const data = await deleteProjectService(id);
            return data;
        } catch(error){
            setError(true);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    return {
        projects,
        loading,
        error,
        addProject,
        loadProjects,
        editProject,
        deleteProject
    };
};

