import React from 'react'
import Slider from "react-slick";
import { Triangle } from 'react-loader-spinner';
import tmdbApi from '../../api/TmdbApi'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
export default function MovieList({type,sort,pageNum}) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed:3000,
    pauseOnHover:false,
    focusOnSelect:true,
    pauseOnFocus:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  let {getMoviesList}=tmdbApi;
  let {data,isLoading,isError,error}=useQuery(type+sort,()=>getMoviesList(type,sort,pageNum))
  return <>
  {isLoading?
  <div className='loading'>
  <Triangle
  height="100"
  width="100"
  color="blue"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  wrapperClassName=""
  visible={true}
/>
  </div>
  
  
  :
          <Slider {...settings}>
          {data?.data.results.map((item)=>{
            return <div key={sort+item.id}>

              <Link to={`/${sort}/details/${item.id}`}>
              <div style={{}} className='px-1 position-relative hover-div'>
                    <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className='w-100' alt="" />
                    <div className='absolute d-flex justify-content-center align-items-center '>
                    <p  className="fa-brands fa-youtube fs-1 fw-bold red"></p>
                    </div>
              </div>
              </Link>

                  </div>
            
            
            
          })}
                  
                  </Slider>
  }

  </>

}
