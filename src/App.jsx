import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LayOut from './Components/LayOut/LayOut';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import TokenContextProvider, { TokenContext } from './Context/Token';
import { useContext, useEffect } from 'react';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Checkout from './Components/Checkout/Checkout';
import AllOrders from './Components/AllOrders/AllOrders';
import WishList from './Components/WishList/WishList';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';

function App() {

  let { setToken } = useContext(TokenContext)

  const routes = createBrowserRouter([
    {
      path: '', element: <LayOut />, children: [
        { path: '', element: <ProtectedRoutes> <Home /> </ProtectedRoutes> },
        { path: 'home', element: <ProtectedRoutes> <Home /> </ProtectedRoutes> },
        // {path: 'products', element: <ProtectedRoutes> <Products /> </ProtectedRoutes>},
        {
          path: 'categories', element: <ProtectedRoutes> <Categories /> </ProtectedRoutes>
        },
        {
          path: 'brands', element: <ProtectedRoutes> <Brands /> </ProtectedRoutes>
        },
        {
          path: 'cart', element: <ProtectedRoutes> <Cart /> </ProtectedRoutes>
        },
        {
          path: 'wishlist', element: <ProtectedRoutes> <WishList /> </ProtectedRoutes>
        },
        {
          path: 'details/:id', element: <ProtectedRoutes> <ProductDetails /> </ProtectedRoutes>
        },
        {
          path: 'checkout', element: <ProtectedRoutes> <Checkout /> </ProtectedRoutes>
        },
        {
          path: 'allorders', element: <ProtectedRoutes> <AllOrders /> </ProtectedRoutes>
        },


        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forgetpassword', element: <ForgetPassword /> },
        { path: 'resetpassword', element: <ResetPassword /> },


        { path: '*', element: <NotFound /> }
      ]
    }
  ])

  useEffect(() => {
    if (localStorage.getItem('userToken') != null) {
      setToken(localStorage.getItem('userToken'))
    }
  }, [])


  return <RouterProvider router={routes}></RouterProvider>


}

export default App;
