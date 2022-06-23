import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LightSpeed } from 'react-reveal';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import useDestinations from '../../hooks/useDestinations';
import Loading from '../Shared/Loading';
import PrimaryButton from '../Shared/PrimaryButton';
import Destination from './Destination';

const Destinations = () => {
    const [destinations, isLoading] = useDestinations();
    const [user] = useAuthState(auth);
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='my-12'>
            <LightSpeed top cascade>
                <h3 className='text-5xl font-bold text-primary text-center'>Explore Germany</h3>
            </LightSpeed>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 my-5 lg:ml-5'>
                {
                    destinations.slice(0,3).map(destination=><Destination
                        key={destination._id}
                        destination= {destination}
                    ></Destination>)
                }
            </div>
            <div className='flex justify-center'>
                    <PrimaryButton><Link to='/destination'>Explore more Citys</Link></PrimaryButton>
            </div>
        </div>
    );
};

export default Destinations;