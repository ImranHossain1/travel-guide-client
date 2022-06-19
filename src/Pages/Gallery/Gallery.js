import React, { useState } from 'react';
import { useQuery } from 'react-query';
import usePhotos from '../../hooks/usePhotos';
import Loading from '../Shared/Loading';
import '../Home/Gallery.css'
const Gallery = () => {
    const [photos, isLoading]= usePhotos()
    if(isLoading){
        <Loading></Loading>
    }
    return (
        <>
            <div>
                <h3 className='text-5xl font-bold text-primary text-center my-12'>Photo Gallery</h3 >
            </div>
            <div className='gallery my-12'>
                {
                    photos?.map(photo=>{
                        return(
                            <div key={photo._id} className='pics'>
                                <img src={photo.image} alt="" className='w-100 rounded-lg'/>
                            </div>
                        )
                    })
                }
            </div>
        </>
)};

export default Gallery;