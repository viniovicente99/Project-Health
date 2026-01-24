import { useState } from 'react';
import type { Project } from '../../types/Project';
import { Modal } from '../Modal/Modal';
import styles from './DeleteProjectButton.module.css';
import { Trash2 } from 'lucide-react';
import { ConfirmButton } from '../Confirm-Button/ConfirmButton';
import { Loading } from '../Loading/Loading';
import { SuccessMessage } from '../Success-Message/SuccessMessage';

interface BaseProps{
    text?: string;
    spanLabel?: string;
    buttonClassName?: string;
    tooltipClassName?: string;
}

interface ActionProps{
    loadProjects: () => Promise<void>;
    project: Project;
    onDelete: (id: string) => Promise<void>;
}

type deleteProjectProps = BaseProps & ActionProps;

export function DeleteProjectButton({ text, buttonClassName, tooltipClassName, spanLabel, project, loadProjects, onDelete }: deleteProjectProps){

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleted, setDeleted] = useState(false);

    return (
        <>
        <div className={styles.buttonWrapper}>
            <button
            onClick={() => setOpen(true)}
            className={`${styles.deleteProject} ${buttonClassName || ""}`}
            aria-label="Excluir Projeto">
            <Trash2  size={20} />
            <span className={`${styles.tooltip} ${tooltipClassName || ""}`}>{spanLabel}</span>
            {text}
            </button>
        </div>

            <Modal
            isOpen={open}
            disableClose={loading || deleted}
            onClose={loading || deleted ? undefined : () => setOpen(false)}>
                {loading ? (
                    <Loading text='Excluindo Projeto...'/>
                ): deleted ? (
                    <SuccessMessage
                    loadProjects={loadProjects}
                    onClose={() => {
                        setDeleted(false);
                        setOpen(false);
                    }}
                    text='Projeto excluído com sucesso'/>
                    
                ) : (
                    <ConfirmButton
                    onConfirm={ async () => {
                        setLoading(true);
                        await onDelete(project.id);
                        setLoading(false);
                        setDeleted(true);
                    }}
                    onCancel={() => setOpen(false)}
                    text="Tem certeza que deseja excluir este projeto?"
                    subText="Essa ação não poderá ser desfeita."/>
                    )}
                </Modal>
            </>
        );
}