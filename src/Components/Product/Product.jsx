import React, { useContext, useState, useEffect } from 'react';
import styles from './Product.module.css'
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/cartContent';
import toast from 'react-hot-toast';

const Product = ({ ele }) => {

    const { addToCart, addToWishList, setNumOfCartItems, getWishList, setNumOfWishItems, numOfWishItems, deleteProductFromWishList } = useContext(CartContext);
    const [wishList, setWishList] = useState([]);
    const [heart, setHeart] = useState(false);

    useEffect(() => {
        async function checkProductInWishList() {
            const { data } = await getWishList();
            const productIdsInWishList = data.data.map(item => item.id);
            setHeart(productIdsInWishList.includes(ele.id));
        }

        checkProductInWishList();
    }, [ele.id, getWishList]);

    async function getUserWishList() {
        const { data } = await getWishList();
        setWishList(data.data);
        setNumOfWishItems(data.count);
    }

    async function addCart(id) {
        let res = await addToCart(id);
        if (res.data.status === "success") {
            toast.success(res.data.message);
            setNumOfCartItems(res.data.numOfCartItems);
        } else {
            toast.error("This didn't work.");
        }
    }

    async function addWishList(id) {
        if (heart) {
            // If the product is already in the wishlist, remove it
            let res = await deleteProductFromWishList(id);
            if (res.data.status === "success") {
                toast.success(res.data.message);
                setHeart(false);
                await getUserWishList();
            } else {
                toast.error("This didn't work.");
            }
        } else {
            // If the product is not in the wishlist, add it
            let res = await addToWishList(id);
            if (res.data.status === "success") {
                toast.success(res.data.message);
                setHeart(true);
                await getUserWishList();
            } else {
                toast.error("This didn't work.");
            }
        }
    }
    

    return (
        <div className="col-md-2">
            <div className="product px-2 py-3 position-relative">
                <Link to={'/details/' + ele.id}>
                    <img src={ele.imageCover} alt={ele.title} className="w-100" />
                    <p className="text-main">{ele.category.name}</p>
                    <h3 className='h5'>{ele.title.split(' ').slice(0, 3).join(' ')}</h3>
                    <div className="d-flex justify-content-between">
                        <p>{ele.price} EGP</p>
                        <p>
                            <i className='fa fa-star rating-color'></i>
                            {ele.ratingsAverage}
                        </p>
                    </div>
                </Link>
                <button onClick={() => addCart(ele.id)} className='btn bg-main text-white w-100'>Add to cart</button>
                <i onClick={() => {
                    addWishList(ele.id);
                }} className={`fa ${heart ? 'fa-heart text-danger' : 'fa-regular fa-heart'} fa-2x position-absolute top-0 end-0 m-3`}></i>
            </div>
        </div>
    );
}

export default Product;
