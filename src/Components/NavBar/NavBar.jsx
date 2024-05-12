import React, { useContext } from "react";
import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../Assets/images/logo.svg'
import { TokenContext } from "../../Context/Token";
import { CartContext } from "../../Context/cartContent";

const NavBar = () => {
    let { token, setToken } = useContext(TokenContext)
    let { numOfCartItems, numOfWishItems } = useContext(CartContext)
    // console.log(token, 'tokentokentoken');
    let navigate = useNavigate()


    function logOut() {
        localStorage.removeItem('userToken')
        setToken(null)
        navigate('/login')

    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <Link className="navbar-brand" to={'home'}>
                        <img src={logo} alt="logo" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {token ? <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={'home'}>
                                    Home
                                </Link>
                            </li>

                            {/* <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={'products'}>Products</Link>
                            </li> */}
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to={'categories'}>
                                    Categories
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to={'brands'}>
                                    Brands
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to={'wishlist'}>
                                    Wish List
                                    <span class="ms-1 badge rounded-pill bg-main">{numOfWishItems != 0 ? numOfWishItems : null}</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link position-relative" aria-current="page" to={'cart'}>
                                    Cart
                                </Link>
                            </li>
                        </ul> : null}

                        <ul className="navbar-nav ms-auto">

                            <li className="nav-item align-self-center">
                                <i className="fa-brands mx-1 fa-facebook"></i>
                                <i className="fa-brands mx-1 fa-twitter"></i>
                                <i className="fa-brands mx-1 fa-instagram"></i>
                                <i className="fa-brands mx-1 fa-tiktok"></i>
                                <i className="fa-brands mx-1 fa-youtube"></i>
                                <i className="fa-brands mx-1 fa-linkedin"></i>
                            </li>


                            {token ? <>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={logOut}>
                                        Logout
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link position-relative" aria-current="page" to={'cart'}>

                                        <i className="fa fa-shopping-cart "></i>
                                        <span class="position-absolute top-0 start-50  badge rounded-pill bg-main">{numOfCartItems}</span>
                                    </Link>
                                </li> </> : <>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to={'register'}>
                                        Register
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to={'login'}>
                                        Login
                                    </Link>
                                </li>
                            </>}

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
