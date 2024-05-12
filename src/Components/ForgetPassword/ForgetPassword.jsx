import React, { useState } from 'react';
import styles from './ForgetPassword.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const ForgetPassword = () => {

    let [isLoading, setIsLoading] = useState(false)

    let navigate = useNavigate()

    // Forgot Password
    async function sendCode(values) {

        setIsLoading(true)

        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
        .catch(err => {
            toast.error(err.response.data.message)
        })

        console.log(data);
        if (data.statusMsg == 'success') {
            toast.success(data.message)
            document.querySelector('.forget-password').classList.add('d-none')
            document.querySelector('.verify-code').classList.remove('d-none')
        }

        setIsLoading(false)
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required')
    })

    let formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: validationSchema,
        onSubmit: sendCode
    })

    // Verify Reset Code
    async function verifyResetCode(values) {

        setIsLoading(true)

        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
        .catch(err => {
            toast.error(err.response.data.message)
        })
        console.log(data);
        if (data.status == 'Success') {
            toast.success(data.status)
            navigate('/resetpassword')
        } 

        setIsLoading(false)
    }

    const validationSchema2 = Yup.object({
        resetCode: Yup.string().required('Verify Reset Code is Required').max(10, 'Verify Reset Code max is 10 numbers!')
    })


    let verifyFormik = useFormik({
        initialValues: {
            resetCode: ''
        },
        validationSchema: validationSchema2,
        onSubmit: verifyResetCode
    })

    return (
        <>
        <Helmet>
                <title>Fresh Cart | Forget Password</title>
        </Helmet>

            {/* Forgot Password */}
            <div className='forget-password w-50 mx-auto my-5'>
                <h2 className='mb-3'>Forget Password :</h2>
                {/* {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : null} */}
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="Email" className='mb-1'>Email</label>
                    <input type="email" id='Email' name='email' className='form-control mb-2' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger mt-2 p-2'>{formik.errors.email}</div> : null}

                    <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white d-block ms-auto'>
                    {isLoading ? <i className='fa fa-spinner fa-spin'></i> : 'Send Code'}
                    </button>
                </form>
            </div>

            {/* Verify Reset Code */}
            <div className='verify-code w-50 mx-auto my-5 d-none'>
                <h2 className='mb-3'>Verify Reset Code :</h2>
                {/* {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : null} */}
                <form onSubmit={verifyFormik.handleSubmit}>
                    <label htmlFor="resetCode" className='mb-1'>Reset Code</label>
                    <input type="text" id='resetCode' name='resetCode' className='form-control mb-2' value={verifyFormik.values.resetCode} onChange={verifyFormik.handleChange} onKeyUp={console.log(verifyFormik.errors.resetCode)} onBlur={verifyFormik.handleBlur} />
                    {verifyFormik.errors.resetCode && verifyFormik.touched.resetCode ? <div className='alert alert-danger mt-2 p-2'>{verifyFormik.errors.resetCode}</div> : null}

                    <button disabled={!(verifyFormik.isValid && verifyFormik.dirty)} className='btn bg-main text-white d-block ms-auto'>Verify Code</button>
                </form>
            </div>

        </>
    );
}

export default ForgetPassword;