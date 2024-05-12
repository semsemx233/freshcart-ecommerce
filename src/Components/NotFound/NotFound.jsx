import React from 'react';
import styles from './NotFound.module.css'
import notFoundImg from '../../Assets/images/error.svg'
import { Helmet } from 'react-helmet';

const NotFound = () => {
    return <>
        <Helmet>
            <title>Fresh Cart | Page not found</title>
        </Helmet>

        <div className='container my-5 text-center'>
            <img className='w-75' src={notFoundImg} alt="Not Found" />
        </div>
    </>
}

export default NotFound;