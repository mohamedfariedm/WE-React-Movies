import React, { useEffect, useState } from 'react'
import style from './WishList.module.css'
import { Helmet } from 'react-helmet'
import image from '../../Assets/footer-bg.jpg'
import { Link } from 'react-router-dom'

export default function WishList() {
  window.scroll({
    top:0,
  })


  const[mobail,setMobile]=useState(false)
  useEffect(()=>{
    const query=window.matchMedia('(max-width : 800px)');
    setMobile(query.matches);
    const handelMatch=(event)=>{
      setMobile(event.matches);
    }
    query.addEventListener('change',handelMatch)
    return()=>{
      query.removeEventListener('change',handelMatch)
    }
  },[])

let[arr,setArr]=useState(JSON.parse(localStorage.getItem("moviesArray")))
useEffect(()=>{
  localStorage.setItem("moviesArray",JSON.stringify(arr))
},[arr])

let movies=[...arr];
  function fireDelete(id){
    setArr(movies.filter((movie)=>movie.id!==id))
  }
  return <>
                <Helmet>
                <title>Watch Later</title>
            </Helmet>
  <section style={{backgroundImage:`url(${image})`,backgroundPositionX:`center`,backgroundPositionY:`center`,backgroundSize:`cover`}}>
  <div className='text-white d-flex justify-content-center align-items-end mb-5' style={{height:`25vh`}}>
    <h2 className=' py-2 h3'>watch Later</h2>
    </div>
  <div className='row  shadow-more px-3 mx-auto py-3 justify-content-center border border-0 rounded-5' style={{width:`100%`}}>
    <div className="container-lg">

  {arr.length==0?<div className='text-white h2 text-center'> you don't have eny movies</div>:
  
  
  
  arr.map((movie)=>

  <div key={"later"+movie.id} className="  col-12 d-flex justify-content-center align-items-center bg-transparent  mt-5">
      
      <div  style={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${movie.backdrop
      })`,backgroundPositionX:`center`,backgroundPositiony:`center`,backgroundSize:`cover`}} className={mobail?'rounded-5 position-relative row  justify-content-center align-items-center  w-100 shadow-lg':'rounded-5 position-relative row  justify-content-center align-items-center  w-75 shadow-lg'}>
        <div className='position-absolute top-0 bottom-0 start-0 end-0 z-2 bg-dark opacity-75 rounded-5'></div>
        <div className="col-md-3 col-sm-5  position-relative z-3">
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster}`} className='w-100 border border-0 rounded-5 shadow-more' alt="" />
        </div>
        <div className="col-md-9 col-sm-7 position-relative z-3 text-white">
          <h2 className='text-danger py-3'>{movie.title}</h2>
          <p>{movie.paragraph}</p>
          <div className='d-flex justify-content-center align-items-center '>

          <Link to={`/${movie.sort}/details/${movie.id}`} className='me-2 text-center'>
                  <p  className="btn btn-success red p-1">watch now</p>
            </Link>
          <div onClick={()=>fireDelete(movie.id)}  className='ms-2 text-center'>
                  <p  className="btn btn-danger red p-1">Remove</p>
            </div>
          </div>
        </div>
      </div>

  </div>
  )}
    </div>
  </div>
  </section>  </>

}
