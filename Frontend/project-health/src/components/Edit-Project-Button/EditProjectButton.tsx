import { useState } from 'react';
import { useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import styles from './EditProject.module.css';
import { Pencil } from 'lucide-react';
import { Loading } from '../Loading/Loading';
import { SuccessMessage } from '../Success-Message/SuccessMessage';
import { useForm, Controller} from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';
import type { Project } from '../../types/Project';


interface BaseProps{
    text?: string;
    spanLabel?: string;
    buttonClassName?: string;
    tooltipClassName?: string;
}

interface FormProps{
    loadProjects: () => Promise<void>;
    project: Project;
    onEdit: (id: string, payload: Partial<Project>) => Promise<void>;
}

type EditProjectButtonProps = BaseProps & FormProps;

export function EditProjectButton({ text, buttonClassName, tooltipClassName, spanLabel, loadProjects, project, onEdit }: EditProjectButtonProps){

    const [open, setOpen]  = useState(false);
    const [loading, setLoading] = useState(false);
    const [edited, setEdited] = useState(false);

    const formSchema = z
        .object({
          newName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
          newArea: z.string().min(2, 'Área deve ter pelo menos 2 caracteres'),
          newResponsible: z
            .string()
            .min(2, 'Responsável deve ter pelo menos 2 caracteres'),
          newStartDate: z.date({
            required_error: 'A data de início é obrigatória',
          }),
          newEndDate: z.date({
            required_error: 'A data de final é obrigatória',
          }),
        })
        .refine((data) => data.newEndDate > data.newStartDate, {
          message: 'A data de finalização deve ser maior que a data de início',
          path: ['endDate'],
        });

        type FormData = z.infer<typeof formSchema>;
        
          const {
            register,
            handleSubmit,
            control,
            reset,
            formState: { errors },
          } = useForm<FormData>({
            resolver: zodResolver(formSchema),
            defaultValues: {
              newName: project.name,
              newArea: project.area,
              newResponsible: project.responsible,
              newStartDate: new Date(project.start_date),
              newEndDate: new Date(project.expected_end_date)
            }
          });

          async function onSubmit(data: FormData) {
    
            try{
            setLoading(true);
            
            await onEdit(project.id, {
            name: data.newName,
            area: data.newArea,
            responsible: data.newResponsible,
            start_date: data.newStartDate.toISOString(),
            expected_end_date: data.newEndDate.toISOString(),
            });
            reset();
            }catch(err){

            console.log(err);

            }finally{
            }
            setLoading(false);
            setEdited(true);
        }

    return (
        <>
        <div className={styles.buttonWrapper}>
            <button
            onClick={() => setOpen(true)}
            className={`${styles.editProjectButton} ${buttonClassName || ""}`}
            aria-label="Editar Projeto">
            <Pencil  size={20} />
            <span className={`${styles.tooltip} ${tooltipClassName || ""}`}>{spanLabel}</span>
            {text}
            </button>
        </div>

        <Modal
        isOpen={open}
        disableClose={loading || edited}
        onClose={
            loading || edited
            ? undefined
            : () => {
                setOpen(false);
            }
        }
        >
            {loading ? (
                <Loading text="Editando Projeto..." />
            ) : edited ? (
                <SuccessMessage
                loadProjects={loadProjects}
                onClose={() => {
                    setEdited(false);
                    setOpen(false);
                }}
                text="Projeto editado com sucesso!" />
            ) : (
                <div className={styles.newProjectWrapper}>
            <div className={styles.titleWrapper}>
              <Pencil size={40} style={{ color: '#082ed8' }} />
              <h1>Editar Projeto</h1>
            </div>

            <p>
              Preencha as informações abaixo para editar o
              projeto.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.formField}>
                <label>Nome</label>
                <input
                  type="text"
                  placeholder="Nome do projeto"
                  {...register('newName')}
                />
                {errors.newName && <p>{errors.newName.message}</p>}
              </div>

              <div className={styles.formField}>
                <label>Área</label>
                <input
                  type="text"
                  placeholder="Área do projeto"
                  {...register('newArea')}
                />
                {errors.newArea && <p>{errors.newArea.message}</p>}
              </div>

              <div className={styles.formField}>
                <label>Responsável</label>
                <input
                  type="text"
                  placeholder="Nome do responsável pelo projeto"
                  {...register('newResponsible')}
                />
                {errors.newResponsible && (
                  <p>{errors.newResponsible.message}</p>
                )}
              </div>

              <div className={styles.formField}>
                <label>Data de início</label>
                <Controller
                control={control}
                name="newStartDate"
                render={({ field }) => (
                    <DatePicker
                    selected={field.value}
                    onChange={(date: Date | null) => field.onChange(date)}
                    dateFormat="dd/MM/yyyy"
                    locale={ptBR}
                    placeholderText="dd/mm/aaaa"
                    wrapperClassName={styles.dateWrapper}
                    className={styles.dateInput}
                    />
                )}
                />
                {errors.newStartDate && (
                  <p>{errors.newStartDate.message}</p>
                )}
              </div>

              <div className={styles.formField}>
                <label>Data de finalização prevista</label>
                <Controller
                  control={control}
                  name="newEndDate"
                  render={({ field }) => (
                    <DatePicker
                      placeholderText="dd/mm/aaaa"
                      selected={field.value}
                      onChange={(date: Date | null) =>
                        field.onChange(date)
                      }
                      dateFormat="dd/MM/yyyy"
                      locale={ptBR}
                      wrapperClassName={styles.dateWrapper}
                      className={styles.dateInput}
                    />
                  )}
                />
                {errors.newEndDate && (
                  <p>{errors.newEndDate.message}</p>
                )}
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
                className={styles.submitButton}
                type="submit">
                    Editar Projeto
                </button>
              </div>
            </form>
          </div>
            )}

        </Modal>
        </>
    )
}