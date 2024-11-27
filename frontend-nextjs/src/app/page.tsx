import BackgroundImage from '@/components/BackgroundImage';
import styles from './styles.module.sass'
import MainComponent from '@/components/MainComponent';
export default function Home() {
  return (
    <main className={styles['app-main']}>
      <MainComponent>
        <BackgroundImage
          title='Solicite uma viagem!'
          subtitle='Sua aventura começa com um simples pedido. Prepare-se!'
          linkText='Começar agora'
          linkTarget='ride-request'
        />

      </MainComponent>
    </main>
  );
}
