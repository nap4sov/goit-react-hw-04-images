import styles from './styles.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ smallImg, id, onClick }) => {
    return (
        <li className={styles.item} id={id} onClick={onClick}>
            <img src={smallImg} alt="" className={styles.image} />
        </li>
    );
};

ImageGalleryItem.propTypes = {
    smallImg: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
