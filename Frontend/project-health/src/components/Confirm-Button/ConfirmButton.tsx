
import { useState } from 'react';
import styles from './ConfirmButton.module.css';
import { MessageCircleWarning } from 'lucide-react';

interface Props {
    onConfirm: () => void;
    onCancel: () => void;
    text: string;
    subText?: string;
};

export function ConfirmButton({ onConfirm, onCancel, text, subText}: Props){

    const [open, setOpen] = useState(true);


    return (
        <>
    <div className={styles.confirmWrapper}>
      <MessageCircleWarning  className={styles.iconAnim} size={150}/>
      <p className={styles.loadingText}>{text || 'Tem certeza que deseja realizar essa ação?'}</p>
      {subText && (
        <p className={styles.secondLoadingText}>{subText || ''}</p>
      )}
    </div>
    <div className={styles.buttonWrapper}>
        <button
        type='button'
        onClick={onCancel}
        className={styles.cancelButton}>
            Cancelar
        </button>
        <button
        type='button'
        onClick={onConfirm}
        className={styles.confirmButton}>
            Confirmar
        </button>
    </div>
      </>
    )
};