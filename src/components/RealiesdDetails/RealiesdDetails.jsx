import React from 'react'
import tmdbApi from '../../api/TmdbApi'
import { useQuery } from 'react-query'

export default function RealiesdDetails({id,sort}) {
let{credits}=tmdbApi
let{data:details,isLoading,isError}=useQuery("realised"+sort+id,()=>credits(sort,id))
return <>
{details?.data.cast.map((cas,index)=>{
if(index<5){
  return <div key={cas.id} className='col-lg-3 col-md-4 col-6 '>
    <div className="px-3">
    <img src={`https://image.tmdb.org/t/p/w500/${cas.profile_path}`} className='w-100 rounded-5 ' alt="" />
    </div>
    <p className='pt-2' >{cas.name}</p >
  </div>
}else{
  return ""
}
})}
  </>

}
