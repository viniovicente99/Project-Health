import styles from './Modal.module.css';
import { createPortal } from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    disableClose?: boolean;
}

export function Modal( {isOpen, onClose, title, disableClose = false, children} : ModalProps){

    if(!isOpen) return null;

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            >
                {title && <h2 className={styles.title}>{title}</h2>}

                {!disableClose && onClose && (
                    <button
                className={styles.close}
                onClick={onClose}
                aria-label="Fechar modal">
                 ✕
                </button>
                )}
                {children}
            </div>
        </div>,
        document.body
    )
}