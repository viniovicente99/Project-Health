import { useEffect, useState } from "react";
import { getProjectByID } from "../api/projects.api";
import type { Project } from "../types/Project";

export function useProjectById(id: string){
    
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!id) return;

    const loadProjectById = async () => {
        setLoading(true);
        const data = await getProjectByID(id);
        setProject(data);
        setLoading(false);
    };
    
      loadProjectById();
    }, [id]);

    return {
        project,
        loading
    };

}