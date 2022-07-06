import React from 'react';
import { Link } from 'react-router-dom';
import notfound from '../../assets/404.png'
import PrimaryButton from '../Shared/PrimaryButton';
const NotFound = () => {
    return (
        <div className='flex flex-col justify-center items-center mb-12'>
            <img src={notfound} alt=""  className='w-full min-h-screen mb-5'/>
            <Link to='/'><PrimaryButton className='rounded-pill button px-5 py-3'>Go Back</PrimaryButton></Link>
        </div>
    );
};

export default NotFound;