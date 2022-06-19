import React from 'react';
import { useQuery } from 'react-query';

const usePhotos = () => {
    const {data: photos, isLoading} = useQuery(["photos"], ()=>fetch('http://localhost:5000/photos').then(res=>res.json()));
    return [photos, isLoading]
};

export default usePhotos;