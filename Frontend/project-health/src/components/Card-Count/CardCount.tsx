import { useSummary } from '../../hooks/useDashboardSummary';
import styles from './CardCount.module.css';
import { Folder, AlertTriangle, AlertCircle, CheckCircle} from 'lucide-react';


interface CardItem {
    label: string;
    value: number;
    color: string;
    icon: React.FC<any>;
};


export function CardCount(){

    const {summary} = useSummary();

    if(!summary) return null;

    const cards: CardItem[] = [
    {
        label: 'Total de Projetos',
        value: summary.total,
        color: '#4239b8',
        icon: Folder,
    },
    {
        label: 'Saudáveis',
        value: summary.data.find(item => item.label === 'Saudável')?.value ?? 0,
        color: '#39B84E',
        icon: CheckCircle,
    },
    {
        label: 'Atenção',
        value: summary.data.find(item => item.label === 'Atenção')?.value ?? 0,
        color: '#F58F47',
        icon: AlertCircle,
    },
    {
        label: 'Críticos',
        value: summary.data.find(item => item.label === 'Crítico')?.value ?? 0,
        color: '#eb4949',
        icon: AlertTriangle,
    }
    ]

    return(
        <div className={styles['card-count-wrapper']}>
        {cards.map(card =>(
            <div key={card.label} className={styles['total-projects']}>
                <p style={{ color: card.color}}>{card.value}</p>
                <h2>{card.label}</h2>
                <card.icon style={{color: card.color}} size={40}/>
            </div>
        ))}
        </div>
    )
};
