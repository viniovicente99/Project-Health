import type { SummaryResponse } from "../types/Summary";
import { getSummaryById } from "../api/dashboard.api";
import { useEffect, useState } from "react";


export function useSummaryById(id: string){

    const [summary, setSummary] = useState<SummaryResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!id) return;

    const loadSummaryById = async () => {
        setLoading(true);
        const data = await getSummaryById(id);
        setSummary(data);
        setLoading(false);
    };

        loadSummaryById();
    }, [id]);

    return{
        summary,
        loading
    }
};