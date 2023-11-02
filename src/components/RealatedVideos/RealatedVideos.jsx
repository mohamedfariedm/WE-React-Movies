import React, { useEffect,useState } from 'react'
import tmdbApi from '../../api/TmdbApi'
import { useQuery } from 'react-query';

export default function RealatedVideos({sort,id}) {
  let{getVideos}=tmdbApi;
  const{data,isError,isLoading}=useQuery("videos"+sort+id,()=>getVideos(sort,id))

  const [width, setWidth] = useState(0)

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth-window.innerWidth*10/100)
    }
    
    window.addEventListener("resize", handleResize)
    
    handleResize()
    
    return () => { 
      window.removeEventListener("resize", handleResize)
    }
  }, [setWidth])
return <>
{data?.data.results.length!==0?  <span key={data?.data.results[data?.data.results.length-1].id} className=''>
    <iframe src={`https://www.youtube.com/embed/${data?.data.results[data?.data.results.length-1].key}`} 
                    width={width}
                    height={width*7/16}
                    title="video"
    ></iframe>
  </span>:""}


  </>

}
