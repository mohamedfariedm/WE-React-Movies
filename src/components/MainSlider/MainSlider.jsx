import React, { useEffect, useState } from 'react'
import tmdbApi from '../../api/TmdbApi'
import { useQuery } from 'react-query';
import Slider from "react-slick";
import { Triangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import RealatedVideos from '../RealatedVideos/RealatedVideos';

export default function MainSlider() {

  let[ind,setInd]=useState(0)
  function handelChange(err){
    setInd(err)
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 50,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed:5000,
    pauseOnHover:false,
    fade:true,
    afterChange:handelChange,
  };
  const[mobail,setMobile]=useState(false)
  useEffect(()=>{
    const query=window.matchMedia('(max-width : 450px)');
    setMobile(query.matches);
    const handelMatch=(event)=>{
      setMobile(event.matches);
    }
    query.addEventListener('change',handelMatch)
    return()=>{
      query.removeEventListener('change',handelMatch)
    }
  },[])




      let {getMoviesList}=tmdbApi;
      let {data,isLoading}=useQuery('movieData',()=>getMoviesList("upcoming","movie",1))


      let [video,setVideo]=useState(0)
      function handelclick(id){
          setVideo(id)
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
        :     <>    
                   <Slider {...settings}>
                {data?.data.results.map((movie,index)=>index<5?
                    <div key={movie.id} >
      <div  style={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${movie.backdrop_path
      })`,height:`100vh`,backgroundPositionX:`center`,backgroundPositiony:`center`,backgroundSize:`cover`}} className=''>
        <div className=' bg-darkul w-100 d-flex  justify-content-center  align-items-center text-white '>
        <div className='container pt-5 px-4'>
          <div className="row  g-2 align-items-center justify-content-center">
            <div className={ind==index?"col-md-7 opacity-100 ":"col-md-7 opacity-0 trans "}>
              <h2 className='h1 fw-bold pt-3'>{movie.original_title}</h2>
              <p>{movie.overview.split(" ").slice(0,20).join(" ")}...</p>
              <div className={mobail?' text-centet d-flex justify-content-center align-items-center flex-column':"text-centet d-flex justify-content-center align-items-start py-2"}>
                <Link to={`/movie/details/${movie.id}`} className={mobail?' ms-3 my-1 btn bg-danger text-white   rounded-4 px-4 py-1 w-75 hov2 position-relative z-3':`ms-3 my-1 btn bg-danger text-white  rounded-4 px-5 py-1 hov2 real`  } > Watch Now</Link>
                <p onClick={()=>handelclick(movie.id)} className={mobail?'ms-3 my-1 btn text-white border-white  rounded-4 px-4 py-1 shadow-lg w-75 hov position-relative z-3':'ms-3 my-1 btn text-white border-white  rounded-4 px-5 py-1 shadow-lg hov real'}> Trailer</p>

              </div>
            </div>
            <div className={ind==index?"col-md-5 d-flex justify-content-center  ":"col-md-5 d-flex justify-content-center scall "}>
              <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} className='w-50 border border-0 rounded-5 shadow-lg' alt="" />
            </div>
          </div>
        </div>
        </div>
      </div>

      
      </div>
      :"" )     
       }

                    
        </Slider>

        
         <div onClick={()=>setVideo(0)} className={video?'position-fixed top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center flex-column bg-black text-danger z-200 bg-opacity-75':'d-none'}>
          <h1 className='py-2'>trailer</h1>
          <div className='d-flex justify-content-center align-items-center'>

         <span className='bg-black' onClick={(e)=>{e.stopPropagation();}}><RealatedVideos sort={"movie"} id={video}/></span>
          </div>
       </div>
        
        </>
        
        }









        </>

}
