import { BadgeCheck } from 'lucide-react';
import styles from './SuccessMessage.module.css';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { useProjects } from '../../hooks/useProjects';

interface SuccessMessageProps {
  text: string;
  onClose: () => void;
  loadProjects: () => Promise<void>;
}

export function SuccessMessage({ text, onClose, loadProjects }: SuccessMessageProps) {

  async function handleClose(){
    await loadProjects();
    onClose();
  }
  return (
    <>
    <div className={styles.successWrapper}>
      <BadgeCheck className={styles.iconAnim} size={150}/>
      <p className={styles.loadingText}>{text}</p>
    </div>
    <div className={styles.buttonWrapper}>
        <button onClick={handleClose} className={styles.okButton}>Fechar
        </button>
      </div>
    </>
  );
}
