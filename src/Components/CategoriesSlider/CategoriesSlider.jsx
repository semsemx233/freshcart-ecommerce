import React, { useEffect, useState } from 'react';
import styles from './CategoriesSlider.module.css'
import axios from 'axios';
import Slider from 'react-slick';

const CategoriesSlider = () => {
    let settings = {
        dots: true,
        infinite: true,
        slidesToShow: 8,
        swipeToSlide: true,
        autoplay: true,
        // autoplaySpeed: 200
    };


    let [categories, setCategories] = useState([])

    async function getCategories() {
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        // console.log(data);
        setCategories(data.data)
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <>
            <div className="container my-5">
                <h2>Shop Popular Categories</h2>
                <Slider {...settings}>

                    {categories.map(cat => <div key={cat._id} className="cat ">
                        <img src={cat.image} height={200} className='w-100' alt={cat.name} />
                        <h5>{cat.name}</h5>
                    </div>)}

                </Slider>

            </div>
        </>
    );
}

export default CategoriesSlider;