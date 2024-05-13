import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let CartContext = createContext()



function addToCart(id) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
        productId: id
    }, {
        headers: {
            token: localStorage.getItem('userToken')
        }
    }).then((res) => res).catch((err) => err)
}

function addToWishList(id) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
        productId: id
    }, {
        headers: {
            token: localStorage.getItem('userToken')
        }
    }).then((res) => res).catch((err) => err)
}

function getCart() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
            token: localStorage.getItem('userToken')
        }
    }
    )
        .then((res) => res)
        .catch((err) => err)
}

function getWishList() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: {
            token: localStorage.getItem('userToken')
        }
    })
        .then((res) => res)
        .catch((err) => err);
}



function updateProductQuantity(id, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
            count
        },
        {
            headers: {
                token: localStorage.getItem('userToken')
            }
        }
    )
        .then((res) => res)
        .catch((err) => err)
}

function deleteProductFromCart(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
            token: localStorage.getItem('userToken')
        }
    }
    )
        .then((res) => res)
        .catch((err) => err)
}

function deleteProductFromWishList(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: {
            token: localStorage.getItem('userToken')
        }
    }
    )
        .then((res) => res)
        .catch((err) => err)
}

export default function CartContextProvider(props) {

    const [cartId, setCartId] = useState(null)
    const [numOfCartItems, setNumOfCartItems] = useState(null)
    const [numOfWishItems, setNumOfWishItems] = useState(null)


    function onlinePayment(shippingAddress) {
        // 66123048be8b523235ba2dfc
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://semsemx233.github.io`,
            {
                shippingAddress
            },
            {
                headers: {
                    token: localStorage.getItem('userToken')
                }
            }
        )
            .then((res) => res)
            .catch((err) => err)
    }

    async function getInitialCart() {
        let { data } = await getCart();
        setNumOfCartItems(data?.numOfCartItems)
        setCartId(data?.data._id)
        console.log('Initial Cart => ', data?.data._id);
    }

    async function getInitialWishList() {
        let { data } = await getWishList();
        setNumOfWishItems(data?.count)
    }

    useEffect(() => {
        if (localStorage.getItem('userToken') != null) {

            getInitialCart()
            getInitialWishList()
        }

    }, [])

    return <CartContext.Provider value={{ addToCart, addToWishList, getCart, getWishList, deleteProductFromCart, deleteProductFromWishList, updateProductQuantity, onlinePayment, numOfCartItems, setNumOfCartItems, numOfWishItems, setNumOfWishItems }}>
        {props.children}
    </CartContext.Provider>
}