import React from 'react';
import { useQuery } from 'react-query';

const useDestinations = () => {
    const {data: destinations, isLoading} = useQuery(["destinations"], ()=>fetch('http://localhost:5000/destination').then(res=>res.json()));
    return [destinations, isLoading]
};

export default useDestinations;