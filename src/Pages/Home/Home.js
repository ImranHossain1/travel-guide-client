import React from 'react';
import PageTitle from '../Shared/PageTitle';
import Banner from './Banner';
import Contact from './Contact';
import Destinations from './Destinations';
import PhotoGallery from './PhotoGallery';
import Statistics from './Statistics';

const Home = () => {
    return (
        <div>
            <PageTitle title="Home"></PageTitle>
            <Banner></Banner>
            <Destinations></Destinations>
            <PhotoGallery></PhotoGallery>
            <Statistics></Statistics>
            <Contact></Contact>
        </div>
    );
};

export default Home;