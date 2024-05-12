import React, { useContext, useEffect, useState } from 'react';
import styles from './Categories.module.css'
import axios from 'axios';
import Slider from 'react-slick';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/cartContent';
import Product from '../Product/Product';
import { Helmet } from 'react-helmet';

const Categories = () => {

    let settings = {
        dots: true,
        infinite: true,
        slidesToShow: 7,
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



    let { addToCart, setNumOfCartItems } = useContext(CartContext)

    function getProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }

    let { data, isLoading } = useQuery('featuredProducts', getProducts)
    // console.log(data?.data?.data);

    async function addCart(id) {
        let res = await addToCart(id)
        console.log(res);
        if (res.data.status == "success") {
            toast.success(res.data.message);
            setNumOfCartItems(res.data.numOfCartItems)
        } else {
            toast.error("This didn't work.")
        }
    }

    let [catId, setCatId] = useState('6439d58a0049ad0b52b9003f')
    let [catName, setCatName] = useState()

    function showCat(cat) {
        console.log(cat);
        setCatName(cat.name)
        setCatId(cat._id)
    }

    return (
        <>
        <Helmet>
                <title>Fresh Cart | Categories</title>
        </Helmet>
            <div className='container cat-box text-center mt-5'>
                <h2 className='my-5'>What you are shopping for today?</h2>

                <Slider {...settings}>

                    {categories.map(cat => <Link onClick={(e) => { e.preventDefault(); showCat(cat); }}>
                        <div key={cat._id} className="cat">
                            <img src={cat.image} height={160} className='w-100 rounded-circle' alt={cat.name} />

                            <h5>{cat.name}</h5>
                        </div>
                    </Link>
                    )}


                </Slider>

            </div>




            <div className="container py-5">
                {isLoading ? <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass="justify-content-center"
                /> : <div>
                    <h2 className='mt-5'>{catName}</h2>

                    <div className="row">
    {(() => {
        const filteredData = data?.data?.data.filter(ele => ele.category._id === catId);
        if (filteredData.length === 0) {
            return <h2 className='my-5'>Sorry, no items available at the moment</h2>;
        } else {
            return filteredData.map((ele) => (
                <Product key={ele.id} ele={ele} />
            ));
        }
    })()}
</div>
</div>}

            </div>



        </>
    );
}

export default Categories;