import React from 'react'
import { useParams } from 'react-router-dom'
import tmdbApi from '../../api/TmdbApi'
import { useQuery } from 'react-query'
import RealiesdDetails from '../RealiesdDetails/RealiesdDetails'
import RealatedVideos from '../RealatedVideos/RealatedVideos'
import SimilarMovies from '../SimilarMovies/SimilarMovies'
import { Helmet } from 'react-helmet'

export default function Details() {
  window.scroll({
    top: 0,
    left: 0,
  }); 

  const{sort,id}=useParams()
  let{detail}=tmdbApi
let{data:details,isLoading,isError}=useQuery("details"+sort+id,()=>detail(sort,id))
  return <>
            <Helmet>
                <title>{details?.data.original_title||details?.data.original_name||details?.data.name}</title>
            </Helmet>
          
    <div className='bg-black vh-100 position-fixed shadow-top top-0 bottom-0 start-0 end-0 z-back'>
                <div style={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${details?.data.backdrop_path})`,backgroundPositionX:`center`,backgroundPositionY:`center`,backgroundSize:`cover`,width:`100%`,height:`50vh`}}></div>
                <div className='bg-black vh-100 position-fixed shadow-top top-50 bottom-0 start-0 end-0 '></div>

  </div>
  <header className='bg-marvel'>
    <div className="container pt-5 px-4  trans-form">
      <div className="row justify-content-center mt-5 align-items-center  g-5">
        <div className="col-lg-4  text-center py-5">
          <img src={`https://image.tmdb.org/t/p/w500/${details?.data.poster_path}`} className='w-75 rounded-5 shadow-more ' alt="" />
        </div>
        <div className='col-lg-8  text-white py-5 px-4'>
          <h2 className='fw-bold'>{details?.data.original_title||details?.data.original_name||details?.data.name}</h2>
          <div>
            <ul className='list-unstyled flex-wrap d-flex justify-content-start align-items-center'>
              {details?.data.genres.map((gener)=>
              <li key={gener.id} className='border rounded-5 ms-3 mt-3 py-1 px-3'>{gener.name.split("&")}</li>
              )}
            </ul>
          </div>
          <div>
            <p>{details?.data.overview}</p>
          </div>
          <div>
                <h4 className='py-3'>casts</h4>
                <div className='row text-center flex-wrap'>

          <RealiesdDetails sort={sort} id={id}/>
                </div>
          </div>
        </div>
      </div>

  </div>
  </header>
  <section className=' bg-black py-3'>
  <div className=' text-start text-white px-5 py-4 '>
      <h2>{details?.data.original_title||details?.data.original_name||details?.data.name}</h2>
    </div>
    <div className='d-flex justify-content-center align-items-center'>

    <RealatedVideos sort={sort} id={id}/>
    </div>
  </section>
  <section className='bg-black py-3'>
    <div className='px-5'>
    <div className='text-start text-white  py-4 '>
      <h2>Similar Movies</h2>
    </div>
    <SimilarMovies sort={sort} id={id} bar={"similar"}/>
    </div>
  </section>
  <section className='bg-black py-3'>
    <div className='px-5'>
    <div className='text-start text-white  py-4 '>
      <h2>recommendations Movies</h2>
    </div>
    <SimilarMovies sort={sort} id={id} bar={"recommendations"}/>
    </div>
  </section>




  </>

}
