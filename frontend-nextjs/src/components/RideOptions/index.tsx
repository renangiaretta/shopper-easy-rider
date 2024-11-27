'use client'
import { useEffect } from 'react'
import { useAppSelector } from '../../store'
import DriverCard from '../DriverCard'
import SectionTitle from '../SectionTitle'
import styles from './styles.module.sass'
import StaticMap from '../StaticMap'
import SectionContainer from '../SectionContainer'

const RideOptions: React.FC = (): JSX.Element => {
    const { availableDrivers } = useAppSelector(state => state.drivers)

    useEffect(() => { }, [availableDrivers])

    const renderDriverCards = () => {
        if (!availableDrivers) return null
        return availableDrivers.map(driver => (
            <DriverCard key={driver.id} driver={driver} />
        ))
    }

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
                        {renderDriverCards()}
                    </ul>
                </div>
            </div>
        </SectionContainer>
    )
}

export default RideOptions
