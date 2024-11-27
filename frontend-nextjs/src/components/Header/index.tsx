import styles from './styles.module.sass'
import Link from 'next/link'
import Image from 'next/image'
import logo from './../../../public/logo.png'

const Header: React.FC = (): JSX.Element => {
    return (
        <header className={styles['header-container']}>
            <nav className={styles['header-nav']}>
                <Link className={styles['header-logo-wrapper']} href={'/'}>
                    <Image src={logo} alt="logo" width={180} height={60} style={{ borderRadius: '40px' }} />
                </Link>
                <Link className={styles['header-link-text']} href={'/historico-de-viagens'}>Histórico de viagens</Link>
                <Link className={styles['header-link']} href={'/'}>Início</Link>
            </nav>
        </header>
    )
}

export default Header