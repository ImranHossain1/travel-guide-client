import React from 'react';
import { useQuery } from 'react-query';

const usePhotos = () => {
    const {data: photos, isLoading} = useQuery(["photos"], ()=>fetch('https://aqueous-dawn-43600.herokuapp.com/photos').then(res=>res.json()));
    return [photos, isLoading]
};

export default usePhotos;