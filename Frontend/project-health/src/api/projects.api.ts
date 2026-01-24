
import { api } from "./axios";
import type { Project } from "../types/Project";

export const getProjects = async (): Promise<Project[]> => {
    const response = await api.get('/all');
    return response.data.projects;
};

export const getProjectByID = async (id: string): Promise<Project> => {
    const response = await api.get(`${id}`);
    return response.data.projects;
};

export const createProject = async (project: Omit<Project, 'id'>) => {
    const response = await api.post('/create', project);
    return response.data;
};

export const editProjectService = async(
    id: string,
    payload: Partial<Project>
) : Promise<Project> => {
    const response = await api.patch(`/edit/${id}`, payload);
    return response.data
};

export const deleteProjectService = async(id: string) => {
    const response = await api.delete(`/delete/${id}`);
    return response.data;
};




