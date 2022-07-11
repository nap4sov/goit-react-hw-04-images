import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ imageUrl, onClose }) => {
    useEffect(() => {
        const handleCloseOnEsc = event => {
            if (event.code !== 'Escape') {
                return;
            }
            onClose();
        };

        window.addEventListener('keydown', handleCloseOnEsc);
        return () => {
            window.removeEventListener('keydown', handleCloseOnEsc);
        };
    }, [onClose]);

    const handleCloseOnClick = event => {
        if (event.target !== event.currentTarget) {
            return;
        }
        onClose();
    };

    return createPortal(
        <div onClick={handleCloseOnClick} className={styles.overlay}>
            <div className={styles.modal}>
                <img src={imageUrl} alt="" />
            </div>
        </div>,
        modalRoot,
    );
};

Modal.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modal;
