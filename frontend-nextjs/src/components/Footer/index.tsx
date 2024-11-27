import React from 'react';
import styles from './styles.module.sass';
import Link from 'next/link';

const Footer: React.FC = (): JSX.Element => {
    return (
        <footer className={styles["footer-container"]}>
            <div className={styles["footer-content"]}>
                <Link href="#" className={styles["footer-link"]}>Privacidade</Link>
                <Link href="#" className={styles["footer-link"]}>Termos</Link>
                <Link href="#" className={styles["footer-link"]}>Suporte</Link>
                <Link href="#" className={styles["footer-link"]}>Contato</Link>
            </div>
            <div className={styles["footer-bottom"]}>
                <p className={styles["footer-copyright"]}>&copy; 2024 Easy Rider - O melhor está por vir. Aperte o cinto!</p>
                <p className={styles["footer-copyright"]}>&reg; Desenvolvido por Renan Giareta</p>
            </div>
        </footer>
    );
};

export default Footer;
