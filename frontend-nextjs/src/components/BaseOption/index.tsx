import styles from './styles.module.sass';

interface BaseOptionProps {
    text: string | number;
    value: string | number;
}

const BaseOption: React.FC<BaseOptionProps> = ({ text, value }: BaseOptionProps): JSX.Element => {
    return (
        <option className={styles['base-option']} value={value}>
            {text}
        </option>
    );
};

export default BaseOption;