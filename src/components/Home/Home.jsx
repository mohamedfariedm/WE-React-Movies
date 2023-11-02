import React from 'react'
import MainSlider from '../MainSlider/MainSlider'
import { Link } from 'react-router-dom'
import MovieList from '../MovieList/MovieList'
import { Helmet } from 'react-helmet'

export default function Home() {
  window.scroll({
    top:0,
    left:0,
  })
  return <>
              <Helmet>
                <title>WE Movies</title>
            </Helmet>
     <MainSlider/>
    <section className='bg-black text-white'>
      <div className="container py-4 px-2">
        <div className='d-flex justify-content-between align-items-center'>
          <h3 className='py-2'>Trending</h3>
          <Link to="/movies/1" className='small btn btn-dark text-white border border-1 rounded-5 px-4'>view more</Link>
        </div>
        <MovieList sort={"movie"} type={"upcoming"} pageNum={1}/>
      </div>
      <div className="container py-4 px-2">
        <div className='d-flex justify-content-between align-items-center'>
          <h3 className='py-2'>Trending tv</h3>
          <Link to="/tvs/1" className='small btn btn-dark text-white border border-1 rounded-5 px-4'>view more</Link>
        </div>
        <MovieList sort={"tv"} type={"on_the_air"} pageNum={1}/>
      </div>
      <div className="container py-4 px-2">
        <div className='d-flex justify-content-between align-items-center'>
          <h3 className='py-2'>Popular </h3>
          <Link to="/movies/1" className='small btn btn-dark text-white border border-1 rounded-5 px-4'>view more</Link>
        </div>
        <MovieList sort={"movie"} type={'popular'} pageNum={1}/>
      </div>
      <div className="container py-4 px-2">
        <div className='d-flex justify-content-between align-items-center'>
          <h3 className='py-2'>Popular tv</h3>
          <Link to="/tvs/1" className='small btn btn-dark text-white border border-1 rounded-5 px-4'>view more</Link>
        </div>
        <MovieList sort={"tv"} type={'popular'} pageNum={1}/>
      </div>
      <div className="container py-4 px-2">
        <div className='d-flex justify-content-between align-items-center'>
          <h3 className='py-2'>Top Movies</h3>
          <Link to="/movies/1" className='small btn btn-dark text-white border border-1 rounded-5 px-4'>view more</Link>
        </div>
        <MovieList sort={"movie"} type={`top_rated`} pageNum={1}/>
      </div>
      <div className="container py-4 px-2">
        <div className='d-flex justify-content-between align-items-center'>
          <h3 className='py-2'>Top tv</h3>
          <Link to="/tvs/1" className='small btn btn-dark text-white border border-1 rounded-5 px-4'>view more</Link>
        </div>
        <MovieList sort={"tv"} type={`top_rated`} pageNum={1}/>
      </div>
    </section>
  </>

}
