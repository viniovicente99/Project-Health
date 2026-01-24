import styles from './ProjectTable.module.css';
import { Project } from '../../types/Project';

interface Props {
    project: Project;
};

export function ProjectTable({ project }: Props){

    const status = project.HealthChecks.at(-1)?.general_status;

    const bgColor = 
    status === 'Crítico'
    ? '#F54747'
    : status === 'Atenção'
    ? '#F58F47'
    : status === 'Saudável'
    ? '#39B84E'
    :'transparent';

    const textColor =
    bgColor === 'transparent' ? '#000000' : '#ffffff';

    return(
        <tbody>
            <tr>
                <td>{project.name}</td>
                <td>{project.area}</td>
                <td>{project.responsible}</td>
                <td className={styles.statusCell}>
                <div className={styles['status-card']} style={{ backgroundColor: bgColor, color: textColor}}>
                    <strong>{project.HealthChecks.at(-1)?.general_status ?? 'Sem status'}</strong>
                </div>
                </td>
                <td>{new Date(project.createdAt).toLocaleDateString()}</td>
                <td>Ver</td>
                <td>Editar</td>                        
            </tr>
        </tbody>

    )
};
