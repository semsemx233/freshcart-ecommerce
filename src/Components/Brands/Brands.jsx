import React, { useContext, useEffect, useState } from 'react';
import styles from './Brands.module.css'
import axios from 'axios';
import { Helmet } from 'react-helmet';

const Brands = () => {


    let [brands, setBrands] = useState([])

    async function getBrands(){
        let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
        console.log(data.data);
        setBrands(data.data)
    }

    useEffect(()=>{
        getBrands()
    }, [])

    return (
        <>
        <Helmet>
                <title>Fresh Cart | Brands</title>
        </Helmet>
            <div className="container my-5">
                <div className="row">
                    {brands.map((brand)=> <div key={brand._id} className="col-md-3">
                        <img src={brand.image} alt={brand.name} />
                    </div>)}
                </div>
            </div>
        </>
    );
}

export default Brands;