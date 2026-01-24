import styles from './HealthIndicators.module.css';
import { IndicatorStatusBadge } from '../Indicator-Status-Badge/IndicatorStatusBadge';
import type { HealthIndicator } from '../../types/HealthIndicator';
import { Calendar, CircleDollarSign, Layers, SearchX, Users } from 'lucide-react';

interface Props {
  healthIndicator: HealthIndicator[];
}

export function HealthIndicators({ healthIndicator}: Props) {

  return (
    <div className={styles.healthIndicatorsWrapper}>
        {healthIndicator.length === 0 && (
            <p className={styles.noHealthIndicators}><SearchX />Nenhum Indicador encontrado...</p>)}  
      {(healthIndicator || []).map((hi) => (
        <div key={hi.id} className={styles.healthIndicatorItem}>
          {hi.type === 'Prazo' ? (
            <div className={styles.tooltipWrapper}>
              < Calendar className={styles.indicatorDeadline} aria-label='Custo'  size={30} />
            <span className={styles.tooltip}>Prazo</span>
            </div>
          ): hi.type === 'Custo' ? (
            <div className={styles.tooltipWrapper}>
            <p className={styles.indicatorCost}>< CircleDollarSign size={30} /></p>
            <span className={styles.tooltip}>Custo</span>
            </div>
          ): hi.type === 'Equipe' ? (
            <div className={styles.tooltipWrapper}>
            <p className={styles.indicatorTeam}>< Users size={30} /></p>
            <span className={styles.tooltip}>Equipe</span>
            </div>
          ): hi.type === 'Escopo'? (
            <div className={styles.tooltipWrapper}>
            <p className={styles.indicatorScope}>< Layers size={30} /></p>
            <span className={styles.tooltip}>Escopo</span>
            </div>
          ): (
            <p className={styles.indicatorType}>{hi.type}:</p>
          )}
          <IndicatorStatusBadge healthIndicator={hi}/>
        </div>
      ))}
    </div>
  );
}
