import { useState } from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
    const [value, setValue] = useState('');

    const handleTextInput = event => {
        setValue(event.currentTarget.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit(value);
    };

    return (
        <header className={styles.searchbar}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <button type="submit" className={styles.button}>
                    <span className={styles.label}>Search</span>
                </button>

                <input
                    value={value}
                    onChange={handleTextInput}
                    className={styles.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
