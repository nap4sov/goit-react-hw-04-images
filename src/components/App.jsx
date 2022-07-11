import { useState, useEffect, useLayoutEffect } from 'react';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Searchbar from './Searchbar';
import ErrorHandler from './ErrorHandler';
import Button from './Button';
import { fetchImages } from '../services/pixabayAPI';

const STATUS = {
    IDLE: 'idle',
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
};
const ERROR_MESSAGE = 'Nothing found to match your query';

export const App = () => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState(STATUS.IDLE);
    const [images, setImages] = useState([]);
    const [totalImages, setTotalImages] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const imagesEmpty = images.length === 0;
    const allImagesShown = images.length >= totalImages;

    useEffect(() => {
        if (query === '') {
            return;
        }

        setStatus(STATUS.PENDING);

        fetchImages(query, page)
            .then(data => {
                if (data.total === 0) {
                    throw new Error(ERROR_MESSAGE);
                }
                setImages(images => [...images, ...data.hits]);
                setTotalImages(data.totalHits);
                setStatus(STATUS.FULFILLED);
            })
            .catch(error => {
                setTotalImages(0);
                setErrorMessage(error.message);
                setStatus(STATUS.REJECTED);
            });
    }, [query, page]);

    useLayoutEffect(() => {
        if (page < 2) {
            return;
        }

        const scrollHeight = 366 * 1.5;

        window.scrollBy({
            top: scrollHeight,
            behavior: 'smooth',
        });
    }, [page, images]);

    const handleSubmit = newQuery => {
        if (query !== newQuery) {
            setImages([]);
        }
        setQuery(newQuery);
        setPage(1);
    };

    const onLoadMoreClick = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <>
            <Searchbar onSubmit={handleSubmit} />
            <div className="container">
                {!imagesEmpty && <ImageGallery images={images} />}
                {status === STATUS.PENDING ? (
                    <Loader />
                ) : (
                    !allImagesShown && <Button onClick={onLoadMoreClick} />
                )}
                {status === STATUS.REJECTED && <ErrorHandler message={errorMessage} />}
            </div>
        </>
    );
};
