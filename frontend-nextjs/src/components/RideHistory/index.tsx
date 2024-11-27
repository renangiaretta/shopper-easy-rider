'use client'
import { useCallback, useEffect, useState } from 'react'
import { api } from '../../services/api.service'
import { IRide } from '../../interfaces/rides.interface'
import { IDriver } from '../../interfaces/drivers.interface'
import SectionTitle from '../SectionTitle'
import RideCard from '../RideCard'
import SectionContainer from '../SectionContainer'
import BaseInput from '../BaseInput'
import BaseSelect from '../BaseSelect'
import BaseButton from '../BaseButton'
import { FieldValues, useForm } from 'react-hook-form'
import { Element } from 'react-scroll'
import { scroller } from 'react-scroll'
import { toast } from 'react-toastify'
import styles from './styles.module.sass'
import { getRidesSchema } from '@/schemas/get-rides.schema'
import { zodResolver } from '@hookform/resolvers/zod'

const RideHistory: React.FC = (): JSX.Element => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(getRidesSchema)
    })

    const [rides, setRides] = useState<IRide[]>([])
    const [allDrivers, setAllDrivers] = useState<IDriver[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const getRidesData = async (data: FieldValues) => {
        setLoading(true)
        try {
            const driverId = getDriverIdByName(data.driver)
            const res = await api.get(`/${data.customer_id}?driver_id=${driverId}`)

            setRides(res.data.rides)
            handleEmptyRides(res.data.rides)

            if (res.data.rides.length > 0) {
                scrollToRideHistory()
            }
        } catch (error) {
            console.error(error)
            setRides([])
            toast.error(
                'Não foi possível obter o histórico de corridas. Verifique os dados e tente novamente',
                { position: 'bottom-right' }
            )
        } finally {
            setLoading(false)
        }
    }

    const getDriversData = useCallback(async () => {
        try {
            const res = await api.get('/drivers/list')
            setAllDrivers(res.data)
        } catch (error) {
            console.error(error)
        }
    }, [])

    const getDriverIdByName = (driverName: string) => {
        const driver = allDrivers.find(driver => driver.name === driverName)
        return driver ? driver.id.toString() : ''
    }

    const handleEmptyRides = (rides: IRide[]) => {
        if (rides.length === 0) {
            toast.warning('Nenhuma corrida encontrada com este motorista.', { position: 'bottom-right' })
        }
    }

    const scrollToRideHistory = () => {
        scroller.scrollTo('ride-history', { smooth: true })
    }

    const renderRideHistory = () => (
        rides.length > 0 ? (
            <>
                <SectionTitle text={'Histórico de viagens'} />
                <ul className={styles['ride-history-list-container']}>
                    {rides.map(ride => <RideCard key={ride.id} ride={ride} />)}
                </ul>
            </>
        ) : null
    )

    useEffect(() => {
        getDriversData()
    }, [getDriversData])


    return (
        <SectionContainer>
            <div className={styles['ride-history-wrapper']}>
                <SectionTitle text={'Consultar histórico'} />
                <form className={styles['ride-history-form']} onSubmit={handleSubmit(getRidesData)}>
                    <div className={styles['ride-history-inputs-wrapper']}>
                        <BaseInput
                            type="text"
                            label="ID do usuário"
                            placeholder="ID do usuário"
                            register={register}
                            registerFor="customer_id"
                            errorsToShow={errors.customer_id}
                        />
                        <BaseSelect
                            id="driver"
                            label="Motorista"
                            options={allDrivers.map(driver => driver.name)}
                            register={register}
                            registerFor="driver"
                            errorsToShow={errors.driver}
                        />
                    </div>
                    <BaseButton type="submit" text="Buscar Viagens" style="large" loading={loading} />
                </form>
                <Element name="ride-history">
                    {renderRideHistory()}
                </Element>
            </div>
        </SectionContainer>
    )
}

export default RideHistory
