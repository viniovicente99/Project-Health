
import styles from './MainLoadingScreen.module.css';
import { Activity } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}><Activity size={40} style={{ color: 'rgb(56, 32, 151)', marginRight: '15px' }} />Dashboard de Saúde de Projetos</div>

      <div className={styles.spinner} />

      <span className={styles.text}>Carregando</span>
    </div>
  );
}
