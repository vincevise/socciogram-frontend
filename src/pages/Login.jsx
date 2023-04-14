import React, { useEffect, useRef, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { loginUserThunk, selectUserDetails } from '../features/currentUserSlice';
 

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showPassword, setShowpassword] = useState(true)
    const [error, setError] = useState('')
    const currentUser = useSelector(selectUserDetails) 

    const handlePassword = () => {
      setShowpassword(!showPassword)
    }

    const handleGuestCredentials = ()=>{
        dispatch(loginUserThunk({email:'jarreddunn@gmail.com', password:'123456'}))
    }

    useEffect(()=>{
        if(currentUser.authenticated) navigate('/home')
    },[currentUser])

  return (
    <>
    <div  className='w-full min-h-screen bg-slate-200 flex items-center justify-center'> 
        <div className='bg-white w-96 p-2 rounded-md'> 
            <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                errors.email = 'Required';
                } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={async(values, { setSubmitting }) => {
                setTimeout(async() => { 
                    const response = await dispatch(loginUserThunk(values))
                    if(response.type === 'user/loginUser/fulfilled'){
                        navigate('/home')
                    }
                    if(response.type === 'user/loginUser/rejected'){
                        // console.log(response.error.message)
                        setError('Invalid credentials')
                    }
                    setSubmitting(false);
                }, 400);
            }}
            >
            {({ isSubmitting }) => (
                <Form className='flex flex-col 
                    [&>input]:px-4  
                    [&>input]:py-2  
                    gap-2 
                    p-4  '
                >
                <span className='text-red-500'>{error}</span>
                <label htmlFor="email-input" className='text-left'>
                    Email
                </label>
                <Field 
                    type="email" 
                    name="email" 
                    className='border border-slate-300 rounded-md outline-blue-500' 
                    id="email-input"
                />
                <ErrorMessage name="email" component="div" className='text-right text-red-500 relative'/> 
                <label htmlFor="password-input" className='text-left'>
                    Password 
                </label>
                <div className='flex items-center relative '>
                    <Field 
                        type={showPassword ? "password" : "text"}
                        name="password" 
                        className='border border-slate-300 rounded-md outline-blue-500 py-2 px-4 w-full'
                        id="password-input" 
                    />
                    <button className='absolute right-3 text-sm' onClick={handlePassword} type="button"   >{showPassword ? 'SHOW' : 'HIDE'}</button>
                </div>
                <ErrorMessage name="password" component="div" /> 
                
                
                <button type="submit" disabled={isSubmitting} className='bg-blue-500 text-white py-2 font-semibold rounded-md mt-2'>
                    Login
                </button>
                
                <button type="submit" disabled={isSubmitting} className='bg-white text-gray-800 border border-gray-800 py-2 font-semibold rounded-md mt-2 hover:bg-gray-100' onClick={handleGuestCredentials}>
                    Use Guest Credentials
                </button>
                <p className='mt-6'>Not a user ? <Link to={'/register'} className='text-blue-600'>Sign Up</Link></p>
                </Form>
            )}
            </Formik>
        </div>
    </div>
    </>
  )
}

export default Login