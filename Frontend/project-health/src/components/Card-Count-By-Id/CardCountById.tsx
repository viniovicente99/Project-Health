import styles from './CardCountById.module.css';
import { AlertTriangle, AlertCircle, CheckCircle, SearchX} from 'lucide-react';

interface CardItem{
    label: string,
    color: string,
    value: number,
    icon: React.FC<any>;
};

interface Props{
    summary: {
        data: {label: string; value: number}[];
    };
}

export function CardCountById({ summary } : Props){

    const cards: CardItem[] = [
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

    
    const hasNoStatus = cards.every(card => card.value === 0);

    return (
         <div className={styles['card-count-wrapper']}>
            {hasNoStatus && (
            <p className={styles.noStatusCard}><SearchX />Nenhum Status encontrado...</p>)}
        {cards.map(card => card.value > 0 && (
            <div key={card.label} className={styles['total-projects']}>
                <p style={{ color: card.color}}><span>{card.value}</span></p>
                <card.icon style={{color: card.color}} />
                <h2>{card.label}</h2>
                
            </div>
        ))}
        </div>
    )
};