import React from 'react';
import banner1 from "../../assets/images/banner1.jpg"
import banner2 from "../../assets/images/banner2.webp"
import PrimaryButton from '../Shared/PrimaryButton';
const Banner = () => {
    return (
        <div style={{
            background: `url(${banner2})`
        }} className="hero min-h-screen">
            <div className="hero-overlay bg-opacity-60 "></div>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className=''>
                    <img src={banner1} className="max-w-xs rounded-lg shadow-2xl pics" />
                </div>
                <div>
                    <h1 className="text-5xl font-bold text-white">Find your <span className='text-orange-500'>next tour</span></h1>
                    <p className="py-6 text-2xl text-white ">The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.</p>
                    <PrimaryButton>Let's Discover the world</PrimaryButton>
                </div>

            </div>
        </div>
    );
};

export default Banner;