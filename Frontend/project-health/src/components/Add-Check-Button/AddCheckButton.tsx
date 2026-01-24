import styles from './AddCheckButton.module.css';
import { AlertCircle, AlertTriangle, CheckCircle, HeartPlus, HeartPulse } from "lucide-react";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import type { CreateHealthCheckPayload } from '../../types/CreateHealthCheckPaylod';
import type { Project } from '../../types/Project';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loading } from '../Loading/Loading';
import { SuccessMessage } from '../Success-Message/SuccessMessage';
import { useProjects } from '../../hooks/useProjects';

interface BaseProps {
    text?: string;
    spanLabel?: string;
    buttonClassName?: string;
    tooltipClassName?: string;
}

interface ActionProps {
    project: Project;
    onCreate: (id: string, payload: CreateHealthCheckPayload) => Promise<void>;
    loadProjects: () => Promise<void>;
}

type AddIndicatorButtonProps = BaseProps & ActionProps;

const statusEnum = z.enum(["Saudável", "Atenção", "Crítico"]);

const formSchema = z.object({
    deadlineStatus: statusEnum,
    costStatus: statusEnum,
    teamStatus: statusEnum,
    scopeStatus: statusEnum,
    comment: z.string().min(2, 'O comentário deve ter pelo menos 2 caracteres')
});

type FormData = z.infer<typeof formSchema>;

export function AddCheckButton({ text, buttonClassName, spanLabel, tooltipClassName, onCreate, project, loadProjects }: AddIndicatorButtonProps) {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [created, setCreated] = useState(false);

    const {
        handleSubmit,
        register,
        reset,
        formState: {errors}
    } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    });

    async function onSubmit(data: FormData, e?: React.BaseSyntheticEvent) {
        e?.preventDefault();
        setCreated(false);

        const payload: CreateHealthCheckPayload = {
            comment: data.comment,
            indicators: [
                { type: "Prazo", status: data.deadlineStatus },
                { type: "Custo", status: data.costStatus },
                { type: "Equipe", status: data.teamStatus },
                { type: "Escopo", status: data.scopeStatus },
            ]
        };

        try {
            setLoading(true);
            await onCreate(project.id, payload);
            reset();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setCreated(true);
        }
    }

    return (
        <div className={styles.buttonWrapper}>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className={`${styles.newIndicatorButton} ${buttonClassName || ""}`}
                aria-label="Adicionar indicadores de saúde">
                <HeartPulse size={20} />
                <span className={`${styles.tooltip} ${tooltipClassName || ""}`}>{spanLabel}</span>
                {text}
            </button>

            <Modal
                isOpen={open}
                disableClose={loading || created}
                onClose={
                    loading || created
                        ? undefined
                        : () => {
                            setOpen(false);
                            reset();
                        }
                }
            >
                {loading ? (
                    <Loading text="Salvando Indicadores..." />
                ) : created ? (
                    <SuccessMessage
                        loadProjects={loadProjects}
                        onClose={() => {
                            setCreated(false);
                            setOpen(false);
                            
                        }}
                        text='Indicadores atualizados com sucesso!'
                    />
                ) : (
                    <div className={styles.addIndicatorWrapper} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.titleWrapper}>
                            <HeartPlus size={40} style={{ color: 'rgb(42, 197, 62)' }} />
                            <h1>Adicionar Indicadores de Saúde</h1>
                        </div>

                        <p>Selecione abaixo o status de cada item.</p>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {["deadlineStatus", "costStatus", "teamStatus", "scopeStatus"].map((field) => (
                                <div className={styles.radioWrapper} key={field}>
                                    <p>{field === "deadlineStatus" ? "Prazo" : field === "costStatus" ? "Custo" : field === "teamStatus" ? "Equipe" : "Escopo"}</p>
                                    <div className={styles.inputWrapper}>
                                        {["Saudável", "Atenção", "Crítico"].map((status) => (
                                            <div className={styles.optionWrapper} key={status}>
                                                <label
                                                    className={status === "Saudável" ? styles.badgeHealthy : status === "Atenção" ? styles.badgeCaution : styles.badgeCritical}
                                                    style={{ border: status === "Saudável" ? '2px solid #39B84E' : status === "Atenção" ? '2px solid #F58F47' : '2px solid #eb4949' }}
                                                >
                                                    <input type="radio" {...register(field as any)} value={status} />
                                                    {status === "Saudável" ? <CheckCircle className={styles.healthyIcon} /> : status === "Atenção" ? <AlertTriangle className={styles.alertIcon} /> : <AlertCircle className={styles.criticalIcon} />}
                                                    <span>{status}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div className={styles.formField}>
                                <label>Comentário</label>
                                <input
                                    type="text"
                                    placeholder="Digite um comentário..."
                                    {...register('comment')}
                                    className={styles.commentaryInput}
                                />
                                {errors.comment && <p>{errors.comment.message}</p>}
                            </div>

                            <div className={styles.formsButtons}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        reset();
                                        setOpen(false);
                                    }}
                                    className={styles.cancelButton}
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className={styles.submitButton}
                                >
                                    Salvar Indicadores
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </Modal>
        </div>
    );
}
