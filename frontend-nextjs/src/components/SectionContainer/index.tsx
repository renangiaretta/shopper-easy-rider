import styles from './styles.module.sass'

interface SectionContainerProps {
    children: React.ReactNode
}

const SectionContainer: React.FC<SectionContainerProps> = ({ children }: SectionContainerProps): JSX.Element => {
    return (
        <div className={styles['section-container']}>
            {children}
        </div>
    )
}

export default SectionContainer