import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css'
import { CartContext } from '../../Context/cartContent.js';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Cart = () => {
    const [cartDetails, setCartDetails] = useState({});
    const [hasItems, setHasItems] = useState(false); // State indicating if there are items in the cart

    let { getCart, deleteProductFromCart, updateProductQuantity, setNumOfCartItems } = useContext(CartContext);

    async function removeItem(id) {
        let { data } = await deleteProductFromCart(id);
        console.log(data);
        setCartDetails(data);
        setNumOfCartItems(data.numOfCartItems);
        setHasItems(data.data.products.length > 0); // Update the state of having items in the cart
    }

    async function updateCount(id, count) {
        let { data } = await updateProductQuantity(id, count);
        // console.log(data);
        data.data.products.map((ele) => {
            if (ele.count === 0) {
                removeItem(ele.product._id);
            }
        });
        setCartDetails(data);
        setHasItems(data.data.products.length > 0); // Update the state of having items in the cart
    }

    async function getCartDetails() {
        let { data } = await getCart();
        console.log(data);
        setNumOfCartItems(data.numOfCartItems);
        setCartDetails(data);
        setHasItems(data.data.products.length > 0); // Update the state of having items in the cart
    }

    useEffect(() => {
        getCartDetails();
    }, []);

    return (
        <>
        <Helmet>
                <title>Fresh Cart | Cart</title>
        </Helmet>
            <div className="container my-5">
                <div className="mx-auto bg-main-light p-5">
                    <h1 className="mb-4">Cart Shop</h1>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="h5">Total price : <span className="text-main">{cartDetails.data?.totalCartPrice ?? 'N/A'} EGP</span></h3>
                        <h3 className="h5">Total Cart Items : <span className="text-main">{cartDetails?.numOfCartItems}</span></h3>
                    </div>


                    {cartDetails.data?.products.map((ele) => (
                        <div key={ele.product._id} className="row py-2 border-bottom">
                            <div className="col-md-1">
                                <img src={ele.product.imageCover} className='w-100' alt="" />
                            </div>
                            <div className="col-md-11">
                                <div className="d-flex justify-content-between">
                                    <div className="left-side">
                                        <h4>{ele.product.title}</h4>
                                        <p>{ele.price} EGP</p>
                                    </div>
                                    <div className="right-side">
                                        <button onClick={() => updateCount(ele.product._id, ele.count - 1)} className='btn main-btn'>-</button>
                                        <span className='mx-2'>{ele.count}</span>
                                        <button onClick={() => updateCount(ele.product._id, ele.count + 1)} className='btn main-btn'>+</button>
                                    </div>
                                </div>
                                <button className='btn text-danger p-0' onClick={() => removeItem(ele.product._id)}><i className='fa fa-trash-can'></i> Remove</button>
                            </div>
                        </div>
                    ))}

                    {!hasItems && <div className="container my-5 text-center">
                        <h1>No items in Cart</h1>
                    </div>} {/* Display message if cart is empty */}

                    {/* Use the state to disable the Checkout button */}
                    <Link className={`btn bg-main w-100 text-white mt-5 ${!hasItems ? 'disabled' : ''}`} to={'/checkout'} disabled={!hasItems}>Checkout</Link>
                </div>
            </div>
        </>
    );
}

export default Cart;
