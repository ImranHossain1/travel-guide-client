import React from 'react';
import { useQuery } from 'react-query';

const useDestinations = () => {
    const {data: destinations, isLoading} = useQuery(["destinations"], ()=>fetch('https://aqueous-dawn-43600.herokuapp.com/destination').then(res=>res.json()));
    return [destinations, isLoading]
};

export default useDestinations;