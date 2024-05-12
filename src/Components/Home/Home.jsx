import React from 'react';
import styles from './Home.module.css'
import MainSlider from '../MainSlider/MainSlider';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import { Helmet } from 'react-helmet';
import FeatuerProducts from '../FeatuerProducts/FeatuerProducts';


const Home = () => {
    return (
        <>
        <Helmet>
                <title>Fresh Cart | Home</title>
        </Helmet>
            <MainSlider/>
            <CategoriesSlider />
            <FeatuerProducts/>
        </>
    );
}

export default Home;