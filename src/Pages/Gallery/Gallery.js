import React, { useState } from 'react';
import { useQuery } from 'react-query';
import usePhotos from '../../hooks/usePhotos';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
const Gallery = () => {
    const [photos, isLoading]= usePhotos()
    if(isLoading){
        <Loading></Loading>
    }
    return (
        <>
            <PageTitle title="Gallery"></PageTitle>
            <div>
                <h3 className='text-5xl font-bold text-primary text-center my-12'>Photo Gallery</h3 >
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 my-5 lg:ml-12'>
                {
                    photos?.map(photo=>{
                        return(
                            <div key={photo._id} className="card lg:max-w-lg md:max-h-72 bg-base-100 md:shadow-xl md:mr-5">
                                <img src={photo.image} alt="" className='w-100 rounded-lg pics'/>
                            </div>
                        )
                    })
                }
            </div>
            
        </>
)};

export default Gallery;