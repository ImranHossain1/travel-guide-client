import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const TravelGallery = ({destinationName}) => {
    const {data:images, isLoading, refetch} = useQuery(['images'], ()=>fetch(`https://aqueous-dawn-43600.herokuapp.com/destinationPhoto/${destinationName}`,{
        method: 'GET'
    }).then(res=>res.json()));
    if(isLoading){
        <Loading></Loading>
    }
    return (
        <div>
            <h2 className='text-5xl font-bold text-primary text-center my-12'>Explore More About <span className='text-orange-400'>{destinationName}</span> </h2>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 my-5 lg:ml-12'>
                {
                    images?.map(photo=>{
                        return(
                            <div key={photo._id} className="card lg:max-w-lg md:max-h-64 bg-base-100 md:shadow-xl md:mr-5">
                                <img src={photo.image} alt="" className='w-100 rounded-lg pics'/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default TravelGallery;