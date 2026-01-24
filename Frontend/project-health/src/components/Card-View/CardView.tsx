import type { Project } from '../../types/Project';
import type { HealthIndicator } from '../../types/HealthIndicator';
import { useState } from 'react';

import { StatusBadge } from '../Status-Badge/StatusBadge';
import { CardCountById } from '../Card-Count-By-Id/CardCountById';
import { HealthIndicators } from '../Health-Indicators/HealthIndicators';
import { IndicatorHistory } from '../Indicator-History/IndicatorHistory';
import { AddCheckButton } from '../Add-Check-Button/AddCheckButton';
import { EditProjectButton } from '../Edit-Project-Button/EditProjectButton';
import { DeleteProjectButton } from '../Delete-Project-Button/DeleteProjectButton';
import { Loading } from '../Loading/Loading';
import { History, CircleX, SearchX } from 'lucide-react';

import { useSummaryById } from '../../hooks/UseDashBoardSummaryById';
import { useHealthCheck } from '../../hooks/useHealthCheck';

import styles from './CardView.module.css';
import { useProjects } from '../../hooks/useProjects';

interface Props {
  project: Project;
  loadProjects: () => Promise<void>; 
  onClose: () => void; 
}

export function CardView({ project, loadProjects, onClose }: Props) {

  const [showHistory, setShowHistory] = useState(false);

  const { createHealthCheck, loading: loadingHealthCheck } = useHealthCheck();

  const handleToggleHistory = () => setShowHistory((prev) => !prev);

  const { summary, loading } = useSummaryById(project.id);

  const { editProject, deleteProject } = useProjects();


  if (loading) return <Loading text="Carregando projeto..." />;
  if (!summary) return <p>Não foi possível carregar o sumário...</p>;

  const lastHealthCheck = project.HealthChecks?.reduce((latest, current) => {
  if (!latest) return current;
  return new Date(current.updated_at) > new Date(latest.updated_at) ? current : latest;
  }, null) ?? null;
  const latestHealthIndicators: HealthIndicator[] = lastHealthCheck?.HealthIndicators || [];

  return (
    <div className={styles.viewWrapper}>
      <div className={styles.modalHeader}>
        <h1>{project.name}</h1>
        <StatusBadge project={project} />
      </div>

      <div className={styles.modalSubHeader}>
        <h2>Responsável: <span>{project.responsible}</span></h2>
        <h2>Área: <span>{project.area}</span></h2>
        <h2>Data de início: <span>{new Date(project.start_date).toLocaleDateString('pt-BR')}</span></h2>
        <h2>Data de finalização: <span>{new Date(project.expected_end_date).toLocaleDateString('pt-BR')}</span></h2>
        <h2>
          Última atualização:{' '}
          <span>
            {lastHealthCheck?.updated_at
              ? new Date(lastHealthCheck.updated_at).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Sem atualização'}
          </span>
        </h2>
      </div>

      {project.HealthChecks?.length === 0 && (
        <div className={styles.noHealthIndicatorsWrapper}>
          <SearchX size={30} />
          <p>Sem indicadores para listar...</p>
        </div>
      )}

      {project.HealthChecks.length > 0 && (
        <div className={styles.modalBody}>
          <h2 className={styles.modalBodyTitle}>Status Geral</h2>
          <CardCountById summary={summary} />

          <h2 className={styles.modalBodyTitle}>Indicadores de Saúde</h2>
          <HealthIndicators
            healthIndicator={latestHealthIndicators.map((hi) => ({ ...hi, key: hi.id }))}
          />

          <div className={styles.historyButton}>
            <button onClick={handleToggleHistory}>
              {showHistory ? (
                <div className={styles.closeHistory}>
                  <p>Fechar Histórico</p>
                  <CircleX size={20} />
                </div>
              ) : (
                <div className={styles.openHistory}>
                  <p>Visualizar Histórico</p>
                  <History size={20} />
                </div>
              )}
            </button>
          </div>

          {showHistory && <IndicatorHistory healthCheck={project.HealthChecks ?? []} />}
        </div>
      )}

      <div className={styles.buttonWrapper}>
        <AddCheckButton
          loadProjects={loadProjects}
          project={project}
          onCreate={async (projectId, payload) => {
            await createHealthCheck(projectId, payload);                                                         
          }}
          spanLabel="Adicionar Indicadores"
        />
        <EditProjectButton project={project} loadProjects={loadProjects} onEdit={editProject} spanLabel="Editar Projeto" />
        <DeleteProjectButton project={project} onDelete={deleteProject} loadProjects={loadProjects} spanLabel="Excluir Projeto" />
      </div>
    </div>
  );
}
