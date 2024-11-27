'use client'
import Link from 'next/link';
import styles from './styles.module.sass';

interface BackgroundImageProps {
    title: string;
    subtitle: string;
    linkText: string;
    linkTarget: string;
}
const BackgroundImage: React.FC<BackgroundImageProps>
    = ({ title, subtitle, linkText, linkTarget }: BackgroundImageProps): JSX.Element => {

        return (
            <div className={styles['background-image-container']}>
                <div className={styles['content-overlay']}>
                    <h1 className={styles['title']}>{title}</h1>
                    <p className={styles['subtitle']}>{subtitle}</p>
                    <Link
                        href={`#${linkTarget}`}
                        className={styles['action-link']}>
                        {linkText}
                    </Link>
                </div>
            </div>
        );
    };

export default BackgroundImage;
