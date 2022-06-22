import React, { useState } from 'react';
import useDestinations from '../../hooks/useDestinations';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import PrimaryButton from '../Shared/PrimaryButton';
import TravelDestination from './TravelDestination';

const TravelDestinations = () => {
    const [destinations, isLoading] = useDestinations();
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='my-12'>
            <PageTitle title="Destination"></PageTitle>
            <h3 className='text-4xl font-bold text-primary text-center mx-3'>Explore Germany</h3>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 my-5 lg:ml-5 '>
                {
                    destinations.map(destination=><TravelDestination
                        key={destination._id}
                        destination= {destination}
                    ></TravelDestination>)
                }
            </div>
        </div>
    );
};

export default TravelDestinations;