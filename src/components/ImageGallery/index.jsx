import ImageGalleryItem from 'components/ImageGalleryItem';
import Modal from 'components/Modal';
import { useState } from 'react';
import PropTypes from 'prop-types';

const ImageGallery = ({ images }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState('');

    const toggleModal = () => {
        setModalOpen(isModalOpen => !isModalOpen);
    };

    const handleGalleryItemClick = event => {
        toggleModal();
        setModalImageUrl(
            images.find(image => image.id === Number(event.currentTarget.id)).largeImageURL,
        );
    };
    return (
        <ul className="ImageGallery">
            {images.map(({ id, webformatURL }) => (
                <ImageGalleryItem
                    key={id}
                    id={id}
                    smallImg={webformatURL}
                    onClick={handleGalleryItemClick}
                />
            ))}
            {isModalOpen && <Modal imageUrl={modalImageUrl} onClose={toggleModal} />}
        </ul>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
        }),
    ),
};

export default ImageGallery;
