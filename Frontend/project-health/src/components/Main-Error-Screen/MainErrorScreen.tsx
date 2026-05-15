
import styles from './MainErrorScreen.module.css';
import { Activity, Ban } from 'lucide-react';

export function ErrorScreen() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Activity size={40} style={{ color: 'rgb(56, 32, 151)', marginRight: '15px' }} />
            Dashboard de Saúde de Projetos
    </div>

        <div className={styles.messageContainer}>
            <Ban size={70} style={{ color: 'rgb(255, 0, 0)'}} />

            <h3>Erro interno ao carregar projetos...</h3>
        
            <span className={styles.text}>Por favor, tente novamente mais tarde.</span>
        </div>

      </div>
  );
}
