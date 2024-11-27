import styles from './styles.module.sass'

interface SectionTitleProps {
    text: string
}


const SectionTitle: React.FC<SectionTitleProps> = ({ text }: SectionTitleProps): JSX.Element => {
    return (
        <h2 className={styles['section-title']}>
            {text}
        </h2>
    )
}

export default SectionTitle