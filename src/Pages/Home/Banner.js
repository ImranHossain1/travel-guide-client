import React from 'react';
import { Link } from 'react-router-dom';
import banner1 from "../../assets/images/banner1.jpg"
import banner2 from "../../assets/images/banner2.webp"
import PrimaryButton from '../Shared/PrimaryButton';
import Zoom from 'react-reveal/Zoom';
import { Fade } from 'react-reveal';
const Banner = () => {
    return (
        <div style={{
            background: `url(${banner2})`
        }} className="hero min-h-screen">
            <div className="hero-overlay bg-opacity-60 "></div>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <Zoom bottom>
                    <img src={banner1} className="max-w-xs rounded-lg shadow-2xl pics" />
                </Zoom>
                <Fade left cascade>
                    <div className='flex flex-col items-center'>
                        <h1 className="font-bold text-white text-center text-3xl md:text-5xl">Find your <span className='text-orange-500'>next tour</span></h1>
                        <p className="py-6 text-xl md:text-2xl text-white text-center">The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.</p>
                        <PrimaryButton><Link to='/destination'>Explore Germany</Link></PrimaryButton>
                    </div>
                </Fade>

            </div>
        </div>
    );
};

export default Banner;