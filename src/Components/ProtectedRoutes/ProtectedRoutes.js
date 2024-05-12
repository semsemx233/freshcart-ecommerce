import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const ProtectedRoutes = (props) => {
    let navigate = useNavigate()

    if(localStorage.getItem('userToken') != null) {
        return props.children
    }else {
        // navigate('login')
        return <Navigate to={'/login'} />
    }
}

export default ProtectedRoutes