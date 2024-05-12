import React, { useContext, useEffect, useState } from 'react';
import styles from './WishList.module.css'
import { CartContext } from '../../Context/cartContent';
import { ThreeDots } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const WishList = () => {

    const [wishList, setWishList] = useState({})

    let { getWishList, deleteProductFromWishList, addToCart, setNumOfCartItems, setNumOfWishItems } = useContext(CartContext)

    async function getUserWishList() {
        let { data } = await getWishList()
        console.log(data);
        // setNumOfCartItems(data.numOfCartItems)
        setNumOfWishItems(data.count)
        setWishList(data)
    }


    async function removeItem(id) {
        let { data } = await deleteProductFromWishList(id)
        console.log(data);
        if (data.status == "success") {
            toast.success(data.message);
            // setNumOfCartItems(data.numOfCartItems)
            getUserWishList()
            // setWishList(data)

        } else {
            toast.error("This didn't work.")
        }
    }


    async function addCart(id) {
        let res = await addToCart(id)
        // console.log(res);
        if (res.data.status == "success") {
            toast.success(res.data.message);
            setNumOfCartItems(res.data.numOfCartItems)
            removeItem(id)
            getUserWishList()
        } else {
            toast.error("This didn't work.")
        }
    }



    useEffect(() => {
        getUserWishList()
    }, [])


    return (
        <>
        <Helmet>
                <title>Fresh Cart | Wish List</title>
        </Helmet>
            {wishList?.data?.length > 0 ? (
                <div className="container my-5">
                    <div className="mx-auto bg-main-light p-5">
                        <h1 className="mb-4">Wish List</h1>
                        <h3 className="h5">Total Wish List Items : <span className="text-main">{wishList.count}</span></h3>
                        {wishList.data.map((ele) => (
                            <div key={ele._id} className="row py-2 border-bottom">
                                <div className="col-md-1">
                                    <img src={ele.imageCover} className='w-100' alt="" />
                                </div>
                                <div className="col-md-11">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="left-side">
                                            <h4>{ele.title}</h4>
                                            <p>{ele.price} EGP</p>
                                        </div>
                                        <div className="right-side">
                                            <button onClick={() => addCart(ele.id)} className='btn bg-main text-white w-100'>Add to cart</button>
                                        </div>
                                    </div>
                                    <button className='btn text-danger p-0' onClick={() => removeItem(ele._id)}><i className='fa fa-trash-can'></i> Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="container my-5 text-center">
                    <h1>No items in Wish List</h1>
                </div>
            )}
        </>
    );
}

export default WishList;
