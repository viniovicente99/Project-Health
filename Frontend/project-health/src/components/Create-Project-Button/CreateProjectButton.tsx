import { useState } from 'react';
import styles from './CreateProjectButton.module.css';
import { FolderPlus } from 'lucide-react';
import { Modal } from '../Modal/Modal';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';
import type { Project } from '../../types/Project';
import { Loading } from '../Loading/Loading';
import { SuccessMessage } from '../Success-Message/SuccessMessage';

type createProjectProps = {
  onCreate: (project: Omit<Project, 'id'>) => Promise<void>;
  loadProjects: () => Promise<void>;
};

export function CreateProject({ onCreate, loadProjects }: createProjectProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);


  const formSchema = z
    .object({
      name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
      area: z.string().min(2, 'Área deve ter pelo menos 2 caracteres'),
      responsible: z
        .string()
        .min(2, 'Responsável deve ter pelo menos 2 caracteres'),
      startDate: z.date({
        required_error: 'A data de início é obrigatória',
      }),
      endDate: z.date({
        required_error: 'A data de final é obrigatória',
      }),
    })
    .refine((data) => data.endDate > data.startDate, {
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
  });

  async function onSubmit(data: FormData) {
    

    try{
      setLoading(true);
      
      await onCreate({
      name: data.name,
      area: data.area,
      responsible: data.responsible,
      start_date: data.startDate.toISOString(),
      expected_end_date: data.endDate.toISOString(),
    });
    reset();
    }catch(err){

    console.log(err);

    }finally{
    }
    setLoading(false);
    setCreated(true);
  }

  return (
    <>
      <div className={styles.buttonWrapper}>
        <button
          onClick={() => setOpen(true)}
          className={styles.newButton}
        >
          <FolderPlus />
          Novo Projeto
        </button>
      </div>

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
          <Loading text="Criando Projeto..." />
        ) : created ? (
          <SuccessMessage
          loadProjects={loadProjects}
          onClose={() => {
            setCreated(false);
            setOpen(false);
          }}
          text='Projeto criado com sucesso!'/>
        ) : (
          <div className={styles.newProjectWrapper}>
            <div className={styles.titleWrapper}>
              <FolderPlus size={40} style={{ color: '#082ed8' }} />
              <h1>Criar Projeto</h1>
            </div>

            <p>
              Preencha as informações abaixo para criar um novo
              projeto.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.formField}>
                <label>Nome</label>
                <input
                  type="text"
                  placeholder="Nome do projeto"
                  {...register('name')}
                />
                {errors.name && <p>{errors.name.message}</p>}
              </div>

              <div className={styles.formField}>
                <label>Área</label>
                <input
                  type="text"
                  placeholder="Área do projeto"
                  {...register('area')}
                />
                {errors.area && <p>{errors.area.message}</p>}
              </div>

              <div className={styles.formField}>
                <label>Responsável</label>
                <input
                  type="text"
                  placeholder="Nome do responsável pelo projeto"
                  {...register('responsible')}
                />
                {errors.responsible && (
                  <p>{errors.responsible.message}</p>
                )}
              </div>

              <div className={styles.formField}>
                <label>Data de início</label>
                <Controller
                control={control}
                name="startDate"
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
                {errors.startDate && (
                  <p>{errors.startDate.message}</p>
                )}
              </div>

              <div className={styles.formField}>
                <label>Data de finalização prevista</label>
                <Controller
                  control={control}
                  name="endDate"
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
                {errors.endDate && (
                  <p>{errors.endDate.message}</p>
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
                    Criar Projeto
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </>
  );
}
