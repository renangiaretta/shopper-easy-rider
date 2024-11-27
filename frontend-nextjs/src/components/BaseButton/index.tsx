import React, { FormEvent } from 'react';
import Spinner from '../Spinner';
import styles from './styles.module.sass';

interface BaseButtonProps {
    style: 'small' | 'medium' | 'large';
    type: 'submit' | 'reset' | 'button' | undefined;
    text: string;
    loading?: boolean;
    onClick?: ((e: FormEvent) => void) | undefined;
}

const BaseButton: React.FC<BaseButtonProps> = ({
    style,
    type,
    text,
    loading,
    onClick,
}: BaseButtonProps): JSX.Element => {

    return (
        <div className={`${styles['base-button-wrapper']}`}>
            <button
                onClick={onClick}
                type={type}
                disabled={loading}
                className={`
                    ${styles[`${style}`]} 
                    ${loading
                    && styles['loading']
                    }
				`}
            >
                <span
                    className={`${loading && styles['hide-text']}`}>
                    {text}
                </span>
                {loading ? <Spinner /> : null}
            </button>
        </div>
    );
};

export default BaseButton;