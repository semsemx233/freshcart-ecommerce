import React, { useContext, useEffect, useState } from 'react';
import styles from './FeatuerProducts.module.css'
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/cartContent';
import toast from 'react-hot-toast';
import Product from '../Product/Product';




const FeatuerProducts = () => {

    let { addToCart, addToWishList, setNumOfCartItems, getWishList, setNumOfWishItems, numOfWishItems, isWishListed, setIsWishListed } = useContext(CartContext)

    function getProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }

    let { data, isLoading } = useQuery('featuredProducts', getProducts)
    // console.log(data?.data?.data);




    async function getUserWishList() {
        let { data } = await getWishList()
        // console.log(data)
        
        console.log('data.data => ', data.data);

        setNumOfWishItems(data.count)

    }


    useEffect(() => {
        getUserWishList()
    }, [])

    // useEffect(() => {
    //     console.log('wishList from useEffect => ', wishList);
    // }, [wishList]);



    return (
        <>
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
                /> : <div className="row">
                    {data?.data?.data.map((ele) => <Product key={ele.id} ele={ele}/>
                    )}

                </div>}

            </div>
        </>
    );
}

export default FeatuerProducts;