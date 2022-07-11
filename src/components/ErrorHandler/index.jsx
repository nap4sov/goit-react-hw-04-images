import styles from './styles.module.css';
import PropTypes from 'prop-types';

const ErrorHandler = ({ message }) => (
    <div className={styles.container}>
        <p className={styles.message}>{message}</p>
    </div>
);

ErrorHandler.propTypes = {
    message: PropTypes.string.isRequired,
};

export default ErrorHandler;
