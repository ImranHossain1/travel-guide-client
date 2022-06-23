import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import usePhotos from '../../hooks/usePhotos';
import Loading from '../Shared/Loading';
import PrimaryButton from '../Shared/PrimaryButton';
import {motion} from 'framer-motion';
import { Bounce, LightSpeed } from 'react-reveal';

const Gallery = () => {
    const [width, setWidth] = useState(0);
    const carousel = useRef();
    const [user] = useAuthState(auth);
    const [photos, isLoading]= usePhotos();
    useEffect(()=>{
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    },[photos])
    if(isLoading){
        <Loading></Loading>
    }
    return (
        <>
            <LightSpeed top cascade>
                <h3 className='text-5xl font-bold text-primary text-center my-5'>Photo Gallery</h3 >
                </LightSpeed>
            <div className='m-5 '>
                <motion.div ref={carousel} className='carousel rounded' whileTap={{cursor: 'grabbing'}}>
                    <motion.div drag="x" dragConstraints={{right:0, left: -width}} className='inner-carousel'>
                    {
                        photos?.slice(0,6).map(photo=>{
                            return(
                                <motion.div key={photo._id} className='item pics'>
                                    <Bounce right cascade>
                                        <img src={photo.image} alt=""/>
                                    </Bounce>
                                </motion.div>
                            )
                        })
                    }
                    </motion.div>
                </motion.div>
            </div>
            <div className='flex justify-center mt-12'>
                {
                    user? <PrimaryButton><Link to='/gallery'>See More Photos</Link></PrimaryButton> 
                    : <PrimaryButton><Link to='/gallery'>Log in to See More Photos</Link></PrimaryButton>
                }
            </div>
        </>
)};

export default Gallery;