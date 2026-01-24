import { useProjects } from '../../hooks/useProjects';
import styles from './Home.module.css';
import { ProjectCard } from '../../components/Project-Card/ProjectCard';
import { CardCount } from '../../components/Card-Count/CardCount.tsx';
import { CardAlert } from '../../components/Card-Alert/CardAlert.tsx';
import { HealthPieChart } from '../../components/Health-Chart/HealthChart.tsx';
import { useSummary } from '../../hooks/useDashboardSummary.ts';
import { Activity } from 'lucide-react';
import { CreateProject } from '../../components/Create-Project-Button/CreateProjectButton.tsx';
import { useState } from 'react';
import { CardView } from '../../components/Card-View/CardView';
import { LoadingScreen } from '../../components/Main-Loading-Screen/MainLoadingScreen.tsx';

export function Home() {
    const { projects, addProject, loadProjects, loading: loadingProjects } = useProjects();
    const { summary, error, loading: loadingSummary } = useSummary();
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

    const criticos = summary?.data.find(item => item.label === 'Crítico')?.value ?? 0;

    if (loadingProjects || loadingSummary) return <LoadingScreen />;
    if (error) return <p>Erro ao carregar projetos. Tente novamente mais tarde...</p>;
    
    return (
        <div className={styles.container}>
            <div className={styles.chartCard}>
                <div className={styles.dashBoardTitle}>
                    <h1>
                        <Activity size={40} style={{ color: 'rgb(56, 32, 151)', marginRight: '15px' }} />
                        Dashboard de Saúde de Projetos
                    </h1>
                    <CreateProject loadProjects={loadProjects} onCreate={addProject} />
                </div>
                <p className={styles.dashBoardParagraph}>
                    Monitore rapidamente a saúde de todos os seus projetos em um só lugar
                </p>
                <CardCount />
                <HealthPieChart />
            </div>

            {criticos > 0 && <CardAlert />}

            <div className={styles.activeProjectsText}>
                <h2>Projetos Ativos</h2>
            </div>

            <div className={styles['card-wrapper']}>
                {projects.map(project => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        loadProjects={loadProjects}
                        onClick={() => setSelectedProjectId(project.id)}
                    />
                ))}
            </div>

            {selectedProjectId && (
                <CardView
                    loadProjects={loadProjects}                
                    project={projects.find(p => p.id === selectedProjectId)!}
                    onClose={() => setSelectedProjectId(null)}
                />
            )}
        </div>
    );
}
