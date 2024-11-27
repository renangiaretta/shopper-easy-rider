import {
    FieldError,
    FieldErrorsImpl,
    FieldValues,
    Merge,
    UseFormRegister,
} from 'react-hook-form';
import { MdError } from "react-icons/md";
import BaseOption from '../BaseOption';
import styles from './styles.module.sass';


interface BaseSelectProps {
    id: string;
    label: string;
    options: string[] | number[];
    register: UseFormRegister<FieldValues>;
    registerFor: string;
    errorsToShow:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<FieldValues>>
    | undefined;
    defaultValue?: string;
}

const BaseSelect: React.FC<BaseSelectProps> = ({
    id,
    label,
    options,
    register,
    registerFor,
    errorsToShow,
    defaultValue,
}: BaseSelectProps): JSX.Element => {
    return (
        <div className={styles['input-wrapper']}>
            {errorsToShow && (
                <span
                    className={styles['error']}
                >
                    <MdError />{`${errorsToShow?.message}`}
                </span>
            )}
            <div
                className={`
                        ${styles['form-input-container']}
                        ${errorsToShow && styles['error-color']
                    }`}
            >
                <label
                    className={styles['form-input-label']}
                    htmlFor={id}
                >
                    {label}
                </label>
                <select
                    className={`${styles['form-input-input']} ${errorsToShow && styles['error-color']
                        }`}
                    id={id}
                    {...register(registerFor)}
                    defaultValue={defaultValue}
                >
                    <option
                        className={`${styles['form-input-option']} ${errorsToShow && styles['error-color']
                            }`}
                        value=""
                    >
                        Todos
                    </option>
                    {options.length > 0
                        && options.map((el) => (
                            <BaseOption key={el} text={el} value={el} />
                        ))}
                </select>
            </div>
        </div>
    );
};

export default BaseSelect;