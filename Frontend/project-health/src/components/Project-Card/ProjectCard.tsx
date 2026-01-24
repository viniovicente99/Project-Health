import styles from './ProjectCard.module.css';
import type { Project } from '../../types/Project';
import { useHealthCheck } from '../../hooks/useHealthCheck';
import { EditProjectButton } from '../Edit-Project-Button/EditProjectButton';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { CardView } from '../Card-View/CardView';
import { StatusBadge } from '../Status-Badge/StatusBadge';
import { DeleteProjectButton } from '../Delete-Project-Button/DeleteProjectButton';
import { AddCheckButton } from '../Add-Check-Button/AddCheckButton';
import { useProjects } from '../../hooks/useProjects';

interface Props {
  project: Project;
  loadProjects: () => Promise<void>;
}

export function ProjectCard({ project, loadProjects }: Props) {
  const [open, setOpen] = useState(false);
  const { createHealthCheck, loading: loadingHealthCheck } = useHealthCheck();
  const { editProject, deleteProject } = useProjects();
  const { Loading } = useProjects();

  return (
    <div className={`${styles.card} ${open ? styles.cardDisabled : ''}`}>
      <div onClick={() => setOpen(true)} className={styles.cardContent}>
        <div className={styles.header}>
          <div>
            <h2>{project.name}</h2>
            <h3>{project.area}</h3>
          </div>
          <div onClick={(e) => e.stopPropagation()} className={styles.createButtons}>
            <AddCheckButton project={project} loadProjects={loadProjects} onCreate={createHealthCheck} spanLabel="Adicionar Indicadores" />
            <EditProjectButton project={project} loadProjects={loadProjects} onEdit={editProject}  spanLabel="Editar Projeto" />
            <DeleteProjectButton buttonClassName={styles.deleteProjectButton} project={project} onDelete={deleteProject} loadProjects={loadProjects} spanLabel="Excluir Projeto" />
          </div>
        </div>

        <StatusBadge project={project} />

        <div className={styles.responsibleAndDate}>
          <p>Responsável: {project.responsible}</p>
          <p>
            Atualizado:{' '}
            {project.HealthChecks.at(0)?.updated_at
              ? new Date(project.HealthChecks.at(0).updated_at).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Sem atualização'}
          </p>
        </div>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <CardView
        loadProjects={loadProjects}
        project={project} onClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
