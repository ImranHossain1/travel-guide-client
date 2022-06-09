import React from 'react';
import Banner from './Banner';
import Contact from './Contact';
import Destinations from './Destinations';
import PhotoGallery from './PhotoGallery';
import Statistics from './Statistics';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Destinations></Destinations>
            <PhotoGallery></PhotoGallery>
            <Statistics></Statistics>
            <Contact></Contact>
        </div>
    );
};

export default Home;