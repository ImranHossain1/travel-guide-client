import React from 'react';
import Loading from '../Pages/Shared/Loading';
import { useQuery } from 'react-query';
const useNotifications = () => {
        const {data: messages, isLoading, refetch} = useQuery('messages', ()=>fetch(' https://aqueous-dawn-43600.herokuapp.com/notifications',{
            method: 'GET', 
            headers:{
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=> res.json()));

        return [messages, isLoading, refetch];

};

export default useNotifications;