import styles from './styles.module.sass';
import { ImSpinner2 } from 'react-icons/im';

interface SpinnerProps {
    color?: string;
    size?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ color, size }: SpinnerProps): JSX.Element => {
    return (
        <div role="progressbar" className={styles['spinner-container']}>
            <ImSpinner2
                className={`${styles['spinner']} ${color ? styles[`${color}`] : ''
                    }
			${size ? styles[`${size}`] : ''}	
			`}
            />
        </div>
    );
};

export default Spinner;