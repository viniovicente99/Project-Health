
export type HealthStatus =
  | 'Saudável'
  | 'Atenção'
  | 'Crítico'
  | 'Sem status';
 
export interface SummaryItem{
    label: string;
    value: number;
};

export interface SummaryResponse{
    data: SummaryItem[];
    total: number;

};