import { BsPersonLinesFill } from "react-icons/bs";
import styles from './styles.module.sass';
import { IRide } from "@/interfaces/rides.interface";
interface RideCardProps {
    ride: IRide;
}

const RideCard: React.FC<RideCardProps> = ({ ride }: RideCardProps): JSX.Element => {
    return (
        <li className={styles['ride-card-container']}>
            <div className={styles['ride-card-header']}>
                <div className={styles['ride-card-driver']}>
                    <BsPersonLinesFill color="#ffffff" size={'2rem'} />
                    <h3>Motorista: {ride.driver.name}</h3>
                </div>
                <p className={styles['ride-card-trip-date']}>{new Date(ride.date).toLocaleString('pt-BR')}</p>
            </div>
            <div className={styles['ride-card-card-body']}>
                <div className={styles['ride-card-info-group']}>
                    <strong>Origem:</strong>
                    <span>{ride.origin}</span>
                </div>
                <div className={styles['ride-card-info-group']}>
                    <strong>Destino:</strong>
                    <span>{ride.destination}</span>
                </div>
                <div className={styles['ride-card-info-group']}>
                    <strong>Distância:</strong>
                    <span>{ride.distance} km</span>
                </div>
                <div className={styles['ride-card-info-group']}>
                    <strong>Tempo:</strong>
                    <span>{ride.duration}</span>
                </div>
                <div className={styles['ride-card-info-group']}>
                    <strong>Valor:</strong>
                    <span>R${ride.value.toFixed(2)}</span>
                </div>
            </div>
        </li>
    );
};

export default RideCard;
