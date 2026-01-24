import { useSummary } from '../../hooks/useDashboardSummary';
import styles from './CardAlert.module.css';
import { AlertTriangle} from 'lucide-react';

export function CardAlert(){

    const {summary} = useSummary();

    const criticos = summary?.data.find(item => item.label === 'Crítico')?.value ?? 0;
    return(

        <div className={styles['alert-card']}>
            <AlertTriangle style={{color: 'red'}} />
            <p>Atenção: {criticos}  Projeto(s) em estado crítico.</p>
            <div className={styles['details']}>
            </div>
        </div>
    )
};