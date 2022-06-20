import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import DeleteConfirmModal from './DeleteConfirmModal';
import DestinationRow from './DestinationRow';

const ManageDestinations = () => {
    const [deletingDestination, setDeletingDestination] = useState(null);
    const {data: destinations, isLoading, refetch} = useQuery('manageDestination', ()=>fetch('https://aqueous-dawn-43600.herokuapp.com/destination',{
        method: "GET",
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res=> res.json()));

    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='w-full mx-5'>
            <h2 className="text-2xl">Total Destinations: {destinations.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Job</th>
                            <th>Speciality</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            destinations.map((destination, index)=> <DestinationRow
                                key = {destination._id}
                                destination={destination}
                                index = {index}
                                refetch= {refetch}
                                setDeletingdestination= {setDeletingDestination}
                            ></DestinationRow>)
                        }
                    </tbody>
                </table>
            </div>
                {deletingDestination  && <DeleteConfirmModal 
                    deletingDestination = {deletingDestination}
                    refetch = {refetch}
                    setDeletingDestination= {setDeletingDestination}
                ></DeleteConfirmModal>}
        </div>
    );
};

export default ManageDestinations;