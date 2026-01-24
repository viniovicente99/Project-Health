import type { SummaryResponse } from "../types/Summary";
import { getSummary } from "../api/dashboard.api";
import { useEffect, useState } from "react";

export function useSummary(){

    const [summary, setSummary] = useState<SummaryResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const loadSummary = async () => {
        try {
        setLoading(true);
        const data = await getSummary();
        setSummary(data);
        setLoading(false);
        } catch (err){
            setError(true);
        }
    };

    useEffect(() => {
        loadSummary();
    }, []);

    return{
        summary,
        loading,
        error

    }
};