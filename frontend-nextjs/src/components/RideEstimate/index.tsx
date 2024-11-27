'use client'
import styles from './styles.module.sass'
import BaseButton from '../BaseButton'
import BaseInput from '../BaseInput'
import SectionTitle from '../SectionTitle'
import { FieldValues, useForm } from 'react-hook-form'
import { api } from '../../services/api.service'
import { useState } from 'react'
import { estimateRideSchema } from '../../schemas/estimate-ride.schema'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { driversActions } from '../../store/drivers/drivers-slice'
import { ridesActions } from '../../store/rides/rides-slice'
import SectionContainer from '../SectionContainer'
import { animateScroll as scroll } from 'react-scroll'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

const RideEstimate: React.FC = (): JSX.Element => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(estimateRideSchema)
    });
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false)

    const estimateRoute = async (data: FieldValues) => {
        const additionalData = {
            customerId: data.customer_id,
            originString: data.origin,
            destinationString: data.destination,
        }
        try {
            setLoading(true)
            const res = await api.post('/estimate', data)
            dispatch(driversActions.availableDrivers(res.data.options))
            dispatch(ridesActions.estimatedRide(res.data))
            dispatch(ridesActions.additionalRideData(additionalData))
            scroll.scrollToTop()
            router.push('/opcoes-de-viagem')
        } catch (error) {
            console.error(error)
            toast.error('Não foi possível realizar a solicitação. Verifique os dados e tente novamente', {
                position: 'bottom-right'
            })
        } finally {
            setLoading(false)
        }
    }


    return (
        <SectionContainer>
            <form
                id='ride-estimate'
                onSubmit={handleSubmit(estimateRoute)}
                className={styles['ride-req-form']}>
                <SectionTitle
                    text={'Solicite Sua Viagem Agora!'}
                />
                <div className={styles['ride-req-inputs-container']}>
                    <div className={styles['ride-req-double-input-container']}>
                        <BaseInput
                            type='text'
                            label='ID do usuário'
                            placeholder='Insira o ID do usuário'
                            register={register}
                            registerFor='customer_id'
                            errorsToShow={errors.customer_id}
                        />
                        <BaseInput
                            type='text'
                            label='Origem'
                            placeholder='Insira a origem'
                            register={register}
                            registerFor='origin'
                            errorsToShow={errors.origin}
                        />
                    </div>
                    <BaseInput
                        type='text'
                        label='Destino'
                        placeholder='Insira o destino'
                        register={register}
                        registerFor='destination'
                        errorsToShow={errors.destination}
                    />
                </div>
                <BaseButton
                    style='large'
                    type='submit'
                    text='Solicitar viagem'
                    loading={loading}
                />
            </form>
        </SectionContainer>
    )
}

export default RideEstimate
