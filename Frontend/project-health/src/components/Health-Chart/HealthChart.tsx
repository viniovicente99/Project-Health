import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useSummary } from "../../hooks/useDashboardSummary";
import styles from "./HealthChart.module.css";
import { CustomToolTip } from "../Custom-Tooltip/customTooltip";
import { Loading } from "../Loading/Loading";
import { useState } from "react";

const COLORS = {
    Saudável: '#67ee6b',
    Atenção: '#f0ac47',
    Crítico: '#f35449',
    'Sem status': '#d6d4d4'
};

export function HealthPieChart(){

    const { summary, error } = useSummary();

    if(!summary){
        return <Loading text="Carregando gráfico..."/>;
    } 

    if(error){
        return <p>Erro ao carregar gráfico.</p>;
    };

    return(
        <div>
        <ResponsiveContainer width='100%' height={400}>
            <PieChart>
                <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ fontSize: '18px', fontWeight: 600}}
                >
                    Saúde Geral
                </text>
                <Pie
                data={summary.data as any[]}
                isAnimationActive
                animationDuration={900}
                animationEasing="ease-out"
                dataKey="value"
                nameKey="label"
                innerRadius={100}
                outerRadius={190}
                paddingAngle={5}                
                >
                {summary.data.map(item => (
              <Cell
                key={item.label}
                fill={COLORS[item.label as keyof typeof COLORS]}
              />
            ))}
          </Pie>
                <Tooltip
                isAnimationActive={false}
                content={<CustomToolTip total={summary.total} />}
              />      
            </PieChart>
        </ResponsiveContainer>
    </div>
  ); 
};