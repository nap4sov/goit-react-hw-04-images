import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ imageUrl, onClose }) => {
    useEffect(() => {
        window.addEventListener('keydown', handleCloseOnEsc);
        return () => {
            window.removeEventListener('keydown', handleCloseOnEsc);
        };
    }, []);

    const handleCloseOnEsc = event => {
        if (event.code !== 'Escape') {
            return;
        }
        onClose();
    };
    const handleCloseOnClick = event => {
        if (event.target !== event.currentTarget) {
            return;
        }
        onClose();
    };

    return createPortal(
        <div onClick={handleCloseOnClick} className="Overlay">
            <div className="Modal">
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
