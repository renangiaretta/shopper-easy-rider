'use client';
import { useEffect } from 'react';
import { useAppSelector } from '../../store';
import DriverCard from '../DriverCard';
import SectionTitle from '../SectionTitle';
import styles from './styles.module.sass';
import StaticMap from '../StaticMap';
import SectionContainer from '../SectionContainer';

const RideOptions = () => {
    const driversData = useAppSelector(state => state.drivers);

    return (
        <SectionContainer>
            <div className={styles['ride-options-wrapper']}>
                <div className={styles['ride-options-left-container']}>
                    <SectionTitle text="Trajeto" />
                    <div className={styles['ride-options-map-container']}>
                        <StaticMap />
                    </div>
                </div>

                <div className={styles['ride-options-right-container']}>
                    <SectionTitle text="Motoristas disponíveis" />
                    <ul className={styles['ride-options-list-container']}>
                        {driversData.availableDrivers && driversData.availableDrivers.length > 0 ? (
                            driversData.availableDrivers.map(driver => (
                                <DriverCard key={driver.id} driver={driver} />
                            ))
                        ) : (
                            <div>Carregando...</div> // mensagem de carregamento
                        )}
                    </ul>
                </div>
            </div>
        </SectionContainer>
    );
};

export default RideOptions;
