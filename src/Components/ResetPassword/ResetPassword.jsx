import React, { useState } from 'react';
import styles from './ResetPassword.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const ResetPassword = () => {

    let [isLoading, setIsLoading] = useState(false)

    let navigate = useNavigate()

    // Reset Password
    async function sendCode(values) {

        setIsLoading(true)

        let { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
        .catch(err => {
            toast.error(err.response.data.message)
        })

        console.log(data);
        if (data?.token) {
            toast.success('Your password has been reset successfully.')
            toast.success('You will be redirected to the login page after 5 seconds')
            
            setTimeout(function() {
                navigate('/login')
            }, 5000);
            
        }

        setIsLoading(false)
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        newPassword: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, 'Password must start with an uppercase letter and contain 4 to 9 characters including lowercase letters and numbers.').required('Password is Required')
    })

    let formik = useFormik({
        initialValues: {
            email: '',
            newPassword:''
        },
        validationSchema: validationSchema,
        onSubmit: sendCode
    })

    return (
        <>
        <Helmet>
                <title>Fresh Cart | Reset Password</title>
        </Helmet>
            {/* Reset Password */}
            <div className='forget-password w-50 mx-auto my-5'>
                <h2 className='mb-3'>Forget Password :</h2>

                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="Email" className='mb-1'>Email</label>
                    <input type="email" id='Email' name='email' className='form-control mb-2' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger mt-2 p-2'>{formik.errors.email}</div> : null}

                    <label htmlFor="newPassword" className='mb-1'>New Password</label>
                    <input type="password" id='newPassword' name='newPassword' className='form-control mb-2' value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.newPassword && formik.touched.newPassword ? <div className='alert alert-danger mt-2 p-2'>{formik.errors.newPassword}</div> : null}

                    <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white d-block ms-auto'>
                    {isLoading ? <i className='fa fa-spinner fa-spin'></i> : 'Reset Password'}
                    </button>
                </form>
            </div>
        </>
    );
}

export default ResetPassword;