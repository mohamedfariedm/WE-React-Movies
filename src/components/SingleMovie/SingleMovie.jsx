import React, { useEffect, useState } from 'react'
import tmdbApi from '../../api/TmdbApi';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Triangle } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';
export default function SingleMovie({type,sort}) {
  let {getMoviesList,serch}=tmdbApi;
  let{pageNum}=useParams()
  const [page,setPage]=useState(Number(pageNum))

  let {data,isLoading,isError,isPreviousData ,error,refetch:Irefetch}=useQuery(type+sort+page,()=>getMoviesList(type,sort,page),
  {
    keepPreviousData:true,
  }
  )
  let {data:sData,isLoading:sIsloading,isError:sIsError,isFetching,refetch}=useQuery("search"+sort,()=>serch(sort,term),
  {
    enabled:false,
    keepPreviousData:true,
  }
  )
  function concatref(){
    setPage(Number(pageNum))
    Irefetch()
  }
useEffect(()=>{concatref()},[pageNum])



let navigate=useNavigate();
  function pageCounter(step){
    if(page==1&&step==-1){
      setPage(1)
      window.scroll({
        top: 0,
        left: 0,
      });     
       navigate(`/${sort}s/1`)
    }else if(page==data?.data.total_pages&&step==1){
      window.scroll({
        top: 0,
        left: 0,
      }); 
            document.scrolltop=100%

      navigate(`/${sort}s/${data?.data.total_pages}`)
    }else{
      setPage(page+step)
      window.scroll({
        top: 0,
        left: 0,
      }); 
            navigate(`/${sort}s/${page+step}`)
    }
  }

  const[search,setSerch]=useState(0)
  const[term,setTerm]=useState("")

  useEffect(()=>{
  },[term])


  const[mobail,setMobile]=useState(false)
  useEffect(()=>{
    const query=window.matchMedia('(max-width : 350px)');
    setMobile(query.matches);
    const handelMatch=(event)=>{
      setMobile(event.matches);
    }
    query.addEventListener('change',handelMatch)
    return()=>{
      query.removeEventListener('change',handelMatch)
    }
  },[])

  useEffect(()=>{},[mobail])
let moviesArray=[]


useEffect(()=>{
if(localStorage.getItem("moviesArray")!==null){
  moviesArray=JSON.parse(localStorage.getItem("moviesArray"))
}
},[moviesArray])



function addToWatchLater(id,title,poster,backdrop,paragraph,sort){

  let movie={id:id,title:title,poster:poster,backdrop:backdrop,paragraph:paragraph,sort:sort}
  var count=0;
  for(let i=0;i<moviesArray.length;i++){
    if(id==moviesArray[i].id){
      count++
    }
    }
if(count==0){
  moviesArray.push(movie)
  localStorage.setItem("moviesArray",JSON.stringify(moviesArray))
  toast.success("movie added succesfuly",{
    duration: 4000,
    position: 'top-center',
  style:{backgroundColor:`black`,color:`green`,marginTop:`65px`}
  })

}else{
  toast.error("the movie already exiest",{
    duration: 4000,
    position: 'top-center',
  style:{backgroundColor:`black`,color:`green`,marginTop:`65px`}
  })
}
}






  if (isError) {
    return <span className='text-white h1 text-center p-5 bg-black bg-opacity-75 vh-50 '>Error : Page is Not found </span>
  }

  if (sIsError) {
    return <span className='text-white h1 text-center p-5 bg-black bg-opacity-75 vh-50 '> </span>
  }





  return <>

  
  <div className='d-flex justify-content-center align-items-center'>

{term?<p className='text-white fw-bold fs-4' >Search</p>
:



<>    <p className={data?.data.page==1?'p-2 fw-bold fs-4 mx-5 ':'text-white  p-2 fw-bold fs-4 mx-5 pointer'} onClick={()=>pageCounter(-1)}><i className="fa-solid fa-backward"></i></p>
    <p className='text-white fw-bold fs-4' >{data?.data.page}</p>
    <p className={data?.data.page==data?.data.total_pages?'p-2 fw-bold fs-4 mx-5 ':'text-white  p-2 fw-bold fs-4 mx-5 pointer'} onClick={()=>pageCounter(1)}><i className="fa-solid fa-forward"></i></p>
</>}


  </div>
  <div className='d-flex justify-content-start align-items-center'>
    {search===0?<label onClick={()=>{setSerch(1)}}  htmlFor='serch'><span className='pointer hov text-white bg-dark border border-0 rounded-5 fs-6 px-4 py-2 '><i className="fa-solid me-3 fa-search text-white hov2"></i>search...</span> </label>
    :
    <input id='serch' placeholder='search' className={mobail?'pointer hov2 text-white bg-dark border border-0 rounded-5 fs-6 px-2 mb-4 py-1 w-50':'pointer hov2 text-white bg-dark border border-0 rounded-5 fs-6 px-2 mb-4 py-1 '} onInput={(e)=>{setTerm(e.target.value);refetch();}}/>
}
  </div>
            {
            isLoading? 
            <div className='loading'>
            <Triangle
            height="100"
            width="100"
            color="blue"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}/>
            </div>
          :term.length>1?  
          sData?.data.results.map((item,index)=>{
            if(index<data?.data.results.length-1&&item.poster_path!=null){

          return<>
          
          
          
          <div key={item.id} className='col-xxl-2 col-xl-3 col-lg-4 col-md-6 p-3 d-flex align-items-center justify-content-center'>
            <div  className='px-1 position-relative hover-div '>
                  <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className='w-100 rounded-5' alt="" />
                  <div className='mov d-flex justify-content-center align-items-center flex-column p-2 rounded-5'>
            <Link to={`/${sort}/details/${item.id}`}>
                  <p  className="fa-brands fa-youtube fs-1 fw-bold red"></p>
            </Link>
              <h3 className='h5 fw-bold text-white text-center py-2'>{item.title||item.original_name}</h3>
              <p key={"parse"+item.id} onClick={()=>addToWatchLater(item.id,item.title||item.original_name,item.poster_path,item.backdrop_path,item.overview,sort)}  className="text-white text-decoration-none  red btn btn-outline-danger"> watch later</p>
                  </div>
            </div>
                </div>
          </>
            }
        }):
            data?.data.results.map((item,index)=>{
              if(index<data?.data.results.length-1&&item.poster_path!=null){
            return<div key={item.id} className='col-xxl-2 col-xl-3 col-lg-4 col-md-6 p-3 d-flex align-items-center justify-content-center'>
              <div  className='px-1 position-relative hover-div '>
                    <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className='w-100 rounded-5' alt="" />
                    <div className='mov d-flex justify-content-center align-items-center flex-column p-2 rounded-5'>
              <Link to={`/${sort}/details/${item.id}`}>
                    <p  className="fa-brands fa-youtube fs-1 fw-bold red"></p>
              </Link>
                <h3 className='h5 fw-bold text-white text-center py-2'>{item.title||item.original_name}</h3>
                    <p key={"parse"+item.id} onClick={()=>addToWatchLater(item.id,item.title||item.original_name,item.poster_path,item.backdrop_path,item.overview,sort)}  className="text-white text-decoration-none  red btn btn-outline-danger"> watch later</p>
                    </div>
              </div>
                  </div>
              }
          })}

<div className='d-flex justify-content-center align-items-center my-5'>
{term?
    <p className='text-white fw-bold fs-4' >{sData?.data.results.length===0?"not found":"Search"}</p>

:



<>    <p className={data?.data.page==1?'p-2 fw-bold fs-4 mx-5 ':'text-white  p-2 fw-bold fs-4 mx-5 pointer'} onClick={()=>pageCounter(-1)}><i className="fa-solid fa-backward"></i></p>
    <p className='text-white fw-bold fs-4' >{data?.data.page}</p>
    <p className={data?.data.page==data?.data.total_pages?'p-2 fw-bold fs-4 mx-5 ':'text-white  p-2 fw-bold fs-4 mx-5 pointer'} onClick={()=>pageCounter(1)}><i className="fa-solid fa-forward"></i></p>
</>}
  </div>
  <Toaster/>
  </>

}
