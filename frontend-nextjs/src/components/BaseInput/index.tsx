import {
    FieldError,
    FieldErrorsImpl,
    FieldValues,
    Merge,
    UseFormRegister,
} from 'react-hook-form';
import { MdError } from 'react-icons/md';
import styles from './styles.module.sass';

interface BaseInputProps {
    type: 'text' | 'number';
    label: string;
    placeholder?: string;
    register?: UseFormRegister<FieldValues>;
    registerFor?: string;
    errorsToShow?:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<FieldValues>>
    | undefined;
    defaultValue?: string | number;
    disabled?: boolean;
}

const BaseInput: React.FC<BaseInputProps> = ({
    type,
    label,
    placeholder,
    register,
    registerFor,
    errorsToShow,
    defaultValue,
    disabled,
}: BaseInputProps): JSX.Element => {
    return (
        <div className={styles['input-wrapper']}>
            {errorsToShow && (
                <span className={styles['error']}>
                    <MdError />
                    {`${errorsToShow?.message}`}
                </span>
            )}
            <div
                className={`
                        ${styles['form-input-container']}
                        ${errorsToShow && styles['error-color']
                    }
                    `}
            >
                <label
                    className={styles['form-input-label']}
                    htmlFor={registerFor}
                >
                    {label}
                </label>
                <input
                    className={`
                            ${styles['form-input']}
                            ${errorsToShow && styles['remove-border']}
                        `}
                    type={type}
                    placeholder={placeholder}
                    {...(register && registerFor ? register(registerFor) : {})}
                    defaultValue={defaultValue}
                    disabled={disabled}
                />
            </div>
        </div>
    );
};

export default BaseInput;