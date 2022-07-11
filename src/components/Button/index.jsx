import styles from './styles.module.css';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => (
    <button onClick={onClick} className={styles.button} type="button">
        Load more
    </button>
);

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default Button;
