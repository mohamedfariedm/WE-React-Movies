import React from 'react'
import tmdbApi from '../../api/TmdbApi';
import { useQuery } from 'react-query';
import { Triangle } from 'react-loader-spinner';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

export default function SimilarMovies({sort,id,bar}) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 8,
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
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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

  let {creditsSimilar}=tmdbApi;
  let {data,isLoading,isError,error}=useQuery("similar"+sort+id+bar,()=>creditsSimilar(sort,id,bar))
  
  if (isError||data?.data.results.length==0) {
    return <p className='text-white text-center h4'>No match resault </p>
  }
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
            if(item.poster_path!==null){

            return<div key={item.id}>
              <Link to={`/${sort}/details/${item.id}`}>
              <div style={{}} className='px-2 position-relative hover-div'>
                    <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className='w-100' alt="" />
                    <div className='absolute d-flex justify-content-center align-items-center '>
                    <p  className="fa-brands fa-youtube fs-1 fw-bold red"></p>
                    </div>
              </div>
              </Link>

                  </div>
            }
          })}
                  
                  </Slider>
  }

  </>

}