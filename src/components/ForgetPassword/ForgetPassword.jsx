import React, { useState } from 'react'
import style from './ForgetPassword.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import toast,{Toaster} from 'react-hot-toast'
import {useNavigate } from 'react-router-dom'
import * as yup from 'yup'
export default function ForgetPassword() {
window.scroll({
  top:0,
})

  let [operator,setOperator]=useState(0)
  async function forgoten(value){
  await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,value)
  .then((responce)=>{if(responce.data.statusMsg=="success"){
    toast.success("find code in your email",{
      duration:5000
    })
    setOperator(1)
  };})
  .catch((()=>{
    toast.error("pleace try again",{
      duration:5000
    })
  }))
  }
  async function handelVerfication(value){
  await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,value)
  .then((responce)=>{if(responce.data.status=="Success"){
    setOperator(2)
  };})
  .catch((()=>{
    toast.error("Verfication Code not valied",{
      duration:5000
    })
  }))
  }
  let navigate=useNavigate();
  async function handelReseat(value){
  await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,value)
  .then((responce)=>{if(responce.status==200){
    toast.success("done",{
      duration:5000
    })
    navigate("/login")

  };})
  .catch((()=>{
    toast.error("Verfication Code not valied",{
      duration:5000
    })
  }))
  }
  let formik=useFormik({
    initialValues:{
      email:"",
    },onSubmit:forgoten,
  })
  let verfication=useFormik({
    initialValues:{
      resetCode:"",
    },onSubmit:handelVerfication
  })

  let validationSchema=yup.object({

    email:yup.string().email("email unvalied").required(),
    newPassword:yup.string().matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,"password must have one spitial char and one capital char").required(),
  })

  let reseatPassword=useFormik({
    initialValues:{
      email:"",
      newPassword: ""
    },validationSchema,
    onSubmit:handelReseat
  })
  return <>
  {operator==0?<section className='bg-black p-5 d-flex justify-content-center align-items-center flex-column'>
  <h2 className='text-center text-white mt-5 '>Restore Password</h2>
  <div className="w-50 p-5 d-flex justify-content-center align-items-center" style={{minWidth:`300px`}}>
    <form onSubmit={formik.handleSubmit} className='w-100 d-flex flex-column justify-content-center align-items-center'>
    <input className='form-control'placeholder='Enter your Email' type="email" name='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
    <div>
    <button type='submit' className='btn btn-outline-danger mt-5'>Send Code</button>
    </div>
    </form>
  </div>
</section>:""}

{operator==1?<section className=' bg-black p-5 d-flex justify-content-center align-items-center flex-column'>
  <h2 className='text-center text-white mt-5'>Verfication Code</h2>
  <div className="container-md p-5 d-flex justify-content-center align-items-center" style={{minWidth:`300px`}}>
    <form onSubmit={verfication.handleSubmit} className='w-100 d-flex flex-column justify-content-center align-items-center'>
    <input className='form-control' placeholder='Verfication Code' type="text" name='resetCode' value={verfication.values.resetCode} onBlur={verfication.handleBlur} onChange={verfication.handleChange} />
    <div>
    <button type='submit' className='btn btn-outline-danger mt-5'>Send Code</button>
    </div>
    </form>
  </div>
</section>:""}

{operator==2?<section className=' bg-black p-5 d-flex justify-content-center align-items-center flex-column'>
  <h2 className='text-center text-white mt-5'>Verfication Code</h2>
  <div className="container-md p-5 d-flex justify-content-center align-items-center" style={{minWidth:`300px`}}>
    <form onSubmit={reseatPassword.handleSubmit} className='w-100 d-flex flex-column justify-content-center align-items-center'>
    <input className='form-control' placeholder='Email' type="email" name='email' value={reseatPassword.values.email} onChange={reseatPassword.handleChange} onBlur={reseatPassword.handleBlur} required/>
    {reseatPassword.errors.email&&reseatPassword.touched.email?<p className='text-danger  p-1 my-1'>{reseatPassword.errors.email}</p>:""}
    <input className='form-control mt-4' placeholder='New Password' type="password" name='newPassword' value={reseatPassword.values.newPassword} onChange={reseatPassword.handleChange} onBlur={reseatPassword.handleBlur} required/>
    {reseatPassword.errors.newPassword&&reseatPassword.touched.newPassword?<p className='text-danger  p-1 my-1'>{reseatPassword.errors.newPassword}</p>:""}

    <div>
    <button type='submit' className='btn btn-outline-danger mt-5'>Reaset</button>
    </div>
    </form>
  </div>
</section>:""}

  </>

}
