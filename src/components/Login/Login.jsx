import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Triangle } from 'react-loader-spinner'
import Slider from "react-slick";
import logo from '../../Assets/paseLogo.png'
import { useQuery } from 'react-query'
import tmdbApi from '../../api/TmdbApi'
import {Helmet} from "react-helmet";

export default function Login() {
  window.scroll({
    top:0,
  })
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed:3000,
    fade:true,
  };

  let navigate=useNavigate();
  let[isLoding,setIsLoding]=useState(false)
  let [eror,setEror]=useState(null)

  let validationSchema=yup.object({

    email:yup.string().email("email unvalied").required(),
    password:yup.string().matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,"password must have one spitial char and one capital char").required(),
  })
  async function handelSubmit(values){
    setIsLoding(true);
    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
    .catch((error)=>{setEror(error.response.data.message);setIsLoding(false)});
    if(data.message=="success"){
      localStorage.setItem("token",data.token)
      navigate('/');
      setIsLoding(false)
    }
  }
  let formik=useFormik({
    initialValues:{
        email:"",
        password:"",
    },validationSchema,
    onSubmit:handelSubmit,
  })


  
  let {getMoviesList}=tmdbApi;
  let {data,isLoading:sIsLoading}=useQuery('movieDataRegister',()=>getMoviesList("upcoming","movie",1))


  return <>
              <Helmet>
                <title>sign in</title>
            </Helmet>
  <section className='body '>
    <div className="container my-5">
      <div className="row align-items-center g-4">
      <div className='col-lg-7 '>
        <div className='position-relative border border-0 rounded-5 overflow-hidden'>
        <Slider {...settings}>

        {data?.data.results.map((movie,index)=>index<8?
                    <div key={movie.id} >
      <div  style={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${movie.backdrop_path
      })`,height:`500px`,backgroundPositionX:`center`,backgroundPositiony:`center`,backgroundSize:`cover`,position:`relative`}} className=''>
          <div className='position-absolute top-0 start-0 end-0 bottom-0 bg-black bg-opacity-50 d-flex justify-content-center align-items-center'>
            <img src={logo} className='w-50' alt="" />
          </div>
          </div>
          </div>:"")}
        </Slider>
      </div>
        </div>
        <div className="col-lg-5">
        <div className='w-100 '>
      <div className="box ">
        <form onSubmit={formik.handleSubmit}>
        <div className="form ">
            <h2>SIGN IN</h2>


            {eror?<p className='alert alert-danger p-2 my-1'>{eror}</p>:""}



            <div className="inputBox">
                <input type="email" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} required/>
                <span>UserEmail</span>
                <i></i>
            </div>
            {formik.errors.email&&formik.touched.email?<p className='text-danger  p-1 my-1'>{formik.errors.email}</p>:""}



            <div className="inputBox">
                <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}  required/>
                <span>Password</span>
                <i></i>
            </div>
            {formik.errors.password&&formik.touched.password?<p className='text-danger  p-1 my-1'>{formik.errors.password}</p>:""}


            <div className="links my-2 px-3">
                <Link to="/forgotPassword">Forgot password</Link>
                <Link  to="/register">Signup</Link>     
                </div>
            <div style={{width:'30%'}}> 

            <button type='submit' className='btn btn-dark'>Sign In</button>
            </div>
        </div>
        </form>
    </div>
</div>
        </div>

      </div>
    </div>
  </section>
  {isLoding&&sIsLoading?  <div className='loading'>
  <Triangle
  height="100"
  width="100"
  color="blue"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  wrapperClassName=""
  visible={true}
/>
  </div>:""}

  </>


}
