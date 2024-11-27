import styles from './styles.module.sass'

interface MainComponentProps {
    children: React.ReactNode
}

const MainComponent: React.FC<MainComponentProps> = ({ children }: MainComponentProps): JSX.Element => {
    return (
        <main className={styles['main-container']}>
            {children}
        </main>
    )
}

export default MainComponent