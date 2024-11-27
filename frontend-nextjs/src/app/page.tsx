import BackgroundImage from '@/components/BackgroundImage';
import styles from './styles.module.sass'
import MainComponent from '@/components/MainComponent';
import RideEstimate from '@/components/RideEstimate';
import { Element } from 'react-scroll';
export default function Home() {
  return (
      <MainComponent>
        <BackgroundImage
          title='Solicite uma viagem!'
          subtitle='Sua aventura começa com um simples pedido. Prepare-se!'
          linkText='Começar agora'
          linkTarget='ride-estimate'
        />
          <RideEstimate />
      </MainComponent>
  );
}
