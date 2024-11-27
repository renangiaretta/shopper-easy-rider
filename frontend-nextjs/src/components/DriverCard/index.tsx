import { animateScroll as scroll } from 'react-scroll';
import { toast } from 'react-toastify';


import { api } from '../../services/api.service';
import { IDriver } from '../../interfaces/drivers.interface';
import { useAppSelector } from '../../store';
import { useState } from 'react';
import BaseButton from '../BaseButton';

import styles from './styles.module.sass';
import { BsPersonLinesFill } from 'react-icons/bs';
import RatingStars from '../RatingStars';
import { useRouter } from 'next/navigation';

interface DriverCardProps {
    driver: IDriver;
}

const DriverCard: React.FC<DriverCardProps> = ({ driver }: DriverCardProps): JSX.Element => {
    const { additionalRideData, estimatedRide } = useAppSelector((state) => state.rides);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const buildRequestData = () => ({
        customer_id: additionalRideData!.customerId,
        origin: additionalRideData?.originString,
        destination: additionalRideData?.destinationString,
        distance: estimatedRide?.distance,
        duration: estimatedRide?.duration,
        driver: {
            id: driver.id,
            name: driver.name,
        },
        value: driver.value,
    });

    const handleChooseClick = async () => {
        setLoading(true);
        try {
            await api.patch('/confirm', buildRequestData());
            scroll.scrollToTop();
            router.push('/ride-history');
            toast.success('Confirmação realizada com sucesso! Tenha uma ótima viagem!', {
                position: 'bottom-right',
            });
        } catch (error) {
            console.error(error);
            toast.error('Não foi possível confirmar a viagem. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <li className={styles["driver-card"]}>
            <div className={styles["left-content"]}>
                <div className={styles['driver-name-wrapper']}>
                    <BsPersonLinesFill size={'2rem'} />
                    <h3 className={styles["driver-name"]}>{driver.name}</h3>
                </div>
                <p className={styles["description"]}>{driver.description}</p>
                <span className={styles["vehicle"]}>Veículo: {driver.vehicle}</span>
                <div className={styles["review"]}>
                    <div className={styles["rating-wrapper"]}>
                        <span className={styles["rating"]}>Avaliação:
                        </span>
                        <RatingStars rating={driver.review.rating} />

                    </div>
                    <p className={styles["comment"]}>"{driver.review.comment}"</p>
                </div>
            </div>
            <div className={styles["right-content"]}>
                <span className={styles["price"]}>R$ {driver.value.toFixed(2)}</span>

                <BaseButton
                    type="button"
                    onClick={handleChooseClick}
                    text="Escolher"
                    style="large"
                    loading={loading}
                />
            </div>
        </li>
    );
};

export default DriverCard;
