import React from 'react';
import styles from './AllOrders.module.css'
import { Helmet } from 'react-helmet';

const AllOrders = () => {
    return (
        <>
        <Helmet>
                <title>Fresh Cart | Orders</title>
        </Helmet>
            <div className="container">
                <div className="bg-success p-5 my-5 text-center text-white">
                    <h2>Your order has been successfully placed!</h2>
                </div>
            </div>
        </>
    );
}

export default AllOrders;