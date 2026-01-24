import styles from './StatusBadge.module.css';
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import type { Project } from '../../types/Project';

interface Props {
    project: Project;
};

export function StatusBadge({project}: Props){

    const status = project.HealthChecks.at(0)?.general_status;

    const bgColor =
    status === 'Crítico'
      ? '#eb4949'
      : status === 'Atenção'
      ? '#F58F47'
      : status === 'Saudável'
      ? '#39B84E'
      : 'transparent';

  const StatusIcon =
    status === 'Crítico'
      ? AlertTriangle
      : status === 'Atenção'
      ? AlertCircle
      : status === 'Saudável'
      ? CheckCircle
      : null;

    const textColor = bgColor === 'transparent' ? '#000000' : '#ffffff';

    return (     
        <div className={styles.statusBadge}
          style={{
            backgroundColor: bgColor,
            color: textColor,
            border:
              bgColor !== 'transparent'
                ? '1px solid #a09e9e'
                : '1px solid #ccc',
          }}
        >
          {StatusIcon && <StatusIcon size={16} />}
          <span>
            {project.HealthChecks.at(0)?.general_status ?? 'Sem status'}
          </span>
        </div>
    );
};