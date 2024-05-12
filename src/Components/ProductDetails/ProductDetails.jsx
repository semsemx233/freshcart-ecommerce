import React, { useContext, useEffect, useState } from 'react';
import styles from './ProductDetails.module.css'
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import Slider from 'react-slick';
import { CartContext } from '../../Context/cartContent';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const ProductDetails = () => {

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };


    const [details, setDetails] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    let params = useParams()

    async function getProductDetails(id) {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        setDetails(data.data)
        setIsLoading(false)
    }

    let {addToCart, setNumOfCartItems} = useContext(CartContext)

    // let {data, isLoading} = useQuery('details', ()=> getProductDetails(params.id))

    async function addCart(id) {
        let res = await addToCart(id)
        console.log(res);
        if(res.data.status == "success"){
            toast.success(res.data.message);
            setNumOfCartItems(res.data.numOfCartItems)
        }else{
            toast.error("This didn't work.")
        }
    }


    useEffect(() => {
        getProductDetails(params.id)
    }, [])

    return (
        <>
            <div className="container my-5">
                {isLoading ? <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass="justify-content-center"
                    /> : <div className="row align-items-center">
                    <div className="col-md-4">
                        <Slider {...settings}>
                            {details.images.map((ele, index)=> <img key={index} src={ele} alt=''/>)}
                        </Slider>
                    </div>
                    <Helmet>
                            <title>Fresh Cart | {details?.title}</title>
                    </Helmet>
                    <div className="col-md-8">
                        <h2>{details.title}</h2>
                        <p>{details.description}</p>
                        <p>{details.category.name}</p>
                        <div className="d-flex justify-content-between">
                            <h5>{details.price} EGP</h5>
                            <h5><i className='fa fa-star rating-color'></i> {details.ratingsAverage}</h5>
                        </div>
                        <button onClick={()=> addCart(details.id)} className='btn bg-main text-white w-100'>Add to cart</button>
                    </div>
                </div>}

            </div>
        </>
    );
}

export default ProductDetails;