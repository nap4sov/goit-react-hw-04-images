import { Puff } from 'react-loader-spinner';
import styles from './styles.module.css';

const Loader = () => (
    <div className={styles.loader}>
        <Puff height="50" width="50" color="#3f51b5" ariaLabel="loading" />
    </div>
);

export default Loader;
