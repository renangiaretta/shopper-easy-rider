'use client';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store'; // Para pegar o estado do Redux
import MainComponent from '@/components/MainComponent';
import RideOptions from '@/components/RideOptions';

export default function RideOptionsPage() {
    const availableDrivers = useAppSelector(state => state.drivers.availableDrivers);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (availableDrivers.length > 0) {
            setIsLoading(false);
        }
    }, [availableDrivers]);

    return (
        <MainComponent>
            {isLoading ?
                <div>Carregando...</div> :
                <RideOptions />
            }
        </MainComponent>
    );
}
