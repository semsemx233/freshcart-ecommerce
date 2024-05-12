import React, { useContext, useState } from 'react';
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import axios from 'axios';
import { useFormik } from 'formik';
import { TokenContext } from '../../Context/Token';
import { Helmet } from 'react-helmet';

const Login = () => {
    let navigate = useNavigate()
    let [errorMessage, setErrorMessage] = useState('')
    let [isLoading, setIsLoading] = useState(false)

    let { setToken } = useContext(TokenContext)

    async function callLogin(reqBody) {

        setErrorMessage('')
        setIsLoading(true)
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', reqBody)
            .catch(err => {
                setIsLoading(false)
                setErrorMessage(err.response.data.message)
            })

        if (data.message == "success") {
            //login
            localStorage.setItem('userToken', data.token)
            setToken(data.token)
            navigate('/home')
        }
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, 'Password must start with an uppercase letter and contain 4 to 9 characters including lowercase letters and numbers.').required('Password is Required')
    })

    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: callLogin
    })

    return <>
        <Helmet>
                <title>Fresh Cart | Login</title>
        </Helmet>
        <div className='w-50 mx-auto my-5'>
            <h2 className='mb-3'>Login Now :</h2>
            {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : null}

            <form onSubmit={loginForm.handleSubmit}>

                <div className="form-group mb-2">
                    <label htmlFor="Email" className='mb-1'>Email</label>
                    <input type="email" id='Email' value={loginForm.values.email} name='email' className='form-control' onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} />
                    {loginForm.errors.email && loginForm.touched.email ? <div className='alert alert-danger mt-2 p-2'>{loginForm.errors.email}</div> : null}
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="Password" className='mb-1'>Password</label>
                    <input type="password" id='Password' value={loginForm.values.password} name='password' className='form-control' onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} />
                    {loginForm.errors.password && loginForm.touched.password ? <div className='alert alert-danger mt-2 p-2'>{loginForm.errors.password}</div> : null}
                </div>

                <div className="d-flex justify-content-between">
                    <Link to={'/forgetpassword'} className='text-main'>Forget Password ?</Link>
                <button className='btn bg-main text-white d-block ms-auto'>
                    {isLoading ? <i className='fa fa-spinner fa-spin'></i> : 'Login'}
                </button>
                </div>
            </form>
        </div>
    </>
}

export default Login;