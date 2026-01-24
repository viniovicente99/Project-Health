import styles from './Loading.module.css';

interface loadingProps {
    text: string;
}

export function Loading({ text }: loadingProps){
    return(
        <div className={styles.summaryLoading}>
            <div className={styles.spinner}></div>
                <p className={styles.loadingText}>{text || 'Carregando projetos...'}</p>
        </div>
    ) 
};