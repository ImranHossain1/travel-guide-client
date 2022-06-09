import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import usePhotos from '../../hooks/usePhotos';
import Loading from '../Shared/Loading';
import PrimaryButton from '../Shared/PrimaryButton';
import './Gallery.css'
const Gallery = () => {
    const [photos, isLoading]= usePhotos()
    if(isLoading){
        <Loading></Loading>
    }
    return (
        <>
            <div>
                <h3 className='text-5xl font-bold text-primary text-center my-5'>Photo Gallery</h3 >
            </div>
            <div className='gallery my-12'>
                {
                    photos?.slice(0,5).map(photo=>{
                        return(
                            <div key={photo._id} className='pics'>
                                <img src={photo.imgUrl} alt="" className='w-100 rounded-lg'/>
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex justify-center'>
                <PrimaryButton><Link to='/gallery'>See More Photos</Link></PrimaryButton>
            </div>
        </>
)};

export default Gallery;