import styles from './IndicatorHistory.module.css';
import type { HealthCheck } from '../../types/HealthCheck';
import { IndicatorStatusBadge } from '../Indicator-Status-Badge/IndicatorStatusBadge';
import { MessageCircle, Calendar, CircleDollarSign, Layers, Users} from 'lucide-react';


interface Props {
    healthCheck: HealthCheck[];
};

export function IndicatorHistory({healthCheck}: Props){

    const sortedHealthCheck = [...(healthCheck || [])].sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    })
    return(
        <div className={styles.indicatorHistory}>
            {(sortedHealthCheck || []).map((ih) => (
                <div key={ih.id} className={styles.indicatorItemWrapper}>
                    <div className={styles.title}>
                    <h3 className={styles.titleText}>
                    <MessageCircle size={30}/>
                    {ih.comment}
                    </h3>
                    <p>{new Date(ih.created_at).toLocaleDateString('pt-BR')}</p> 
                    </div>

                    {ih.HealthIndicators.map((indicator) => (
                        <div key={indicator.id}className={styles.indicators}>
                             {indicator.type === 'Prazo' ? (
                                <div className={styles.tooltipWrapper}>
                                < Calendar className={styles.indicatorDeadline} aria-label='Custo'  size={30} />
                                <span className={styles.tooltip}>Prazo</span>
                                </div>
                            ): indicator.type === 'Custo' ? (
                                <div className={styles.tooltipWrapper}>
                                <p className={styles.indicatorCost}>< CircleDollarSign size={30} /></p>
                                <span className={styles.tooltip}>Custo</span>
                                </div>
                            ): indicator.type === 'Equipe' ? (
                                <div className={styles.tooltipWrapper}>
                                <p className={styles.indicatorTeam}>< Users size={30} /></p>
                                <span className={styles.tooltip}>Equipe</span>
                                </div>
                            ): indicator.type === 'Escopo'? (
                                <div className={styles.tooltipWrapper}>
                                <p className={styles.indicatorScope}>< Layers size={30} /></p>
                                <span className={styles.tooltip}>Escopo</span>
                                </div>
                            ): (
                                <p className={styles.indicatorType}>{indicator.type}:</p>
                            )}
                             <IndicatorStatusBadge healthIndicator={indicator}/>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}