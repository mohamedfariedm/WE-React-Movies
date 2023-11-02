import React, { useEffect, useState } from 'react'
import image from '../../Assets/paseLogo.png'
import { Link,NavLink,useNavigate } from 'react-router-dom'

export default function Navbar() {
  let navigate=useNavigate();
  function logOut(){
    localStorage.removeItem("token")
    navigate("/login");
  }


  const[ultra,setUltra]=useState(false)
  useEffect(()=>{
    const hamada=window.matchMedia('(max-width : 300px)');
    setUltra(hamada.matches);
    const handelUltra=(event)=>{
      setUltra(event.matches);
    }
    hamada.addEventListener('change',handelUltra)
    return()=>{
      hamada.removeEventListener('change',handelUltra)
    }
  },[])



  const[mobail,setMobile]=useState(false)
  useEffect(()=>{
    const query=window.matchMedia('(max-width : 999px)');
    setMobile(query.matches);
    const handelMatch=(event)=>{
      setMobile(event.matches);
    }
    query.addEventListener('change',handelMatch)
    return()=>{
      query.removeEventListener('change',handelMatch)
    }
  },[])

  useEffect(()=>{},[ultra,mobail])

 

  const[active,setActive]=useState("")
  const [navScrol,setNavScrol]=useState(false);
  window.addEventListener("scroll",(e)=>{
    if(window.scrollY===0){
      setNavScrol(false)
    }else{
      setNavScrol(true)
    }
  })
let noNav=false
  if(localStorage.getItem("token")!==null){
 noNav=true
  }else{
    noNav=false
  }
  return <>
  {noNav?  <nav className={navScrol?'bg-transp-rev text-white  fixed-top w-100 ':'bg-transp text-white w-100  fixed-top'}>
    <div className={mobail?'container d-flex justify-content-between align-items-center py-1 ':'container d-flex justify-content-between align-items-center py-3 '}>
      <Link to={""} className='d-flex justify-content-center align-items-center text-danger list-color-none'>
        <i className={ultra?'fa fa-sold fa-play px-2 fs-5':'fa fa-sold fa-play px-2 fs-2'}></i>
        <img className='px-2' src={image} width={ultra?100:150} alt="" />
      </Link>
      <div className='d-flex align-items-center justify-content-center '>
        <ul className='list-unstyled d-flex align-items-center justify-content-center p-0 m-0'>
          {mobail?"":<>          
          <li className='px-3 '><NavLink className ="text-decoration-none text-white list-color" to={""}>Home</NavLink></li>
          <li className='px-3 '><NavLink  className ="text-decoration-none text-white list-color"   to={"movies/1"}>Movies</NavLink></li>
          <li className='px-3 '><NavLink  className ="text-decoration-none text-white list-color"  to={"tvs/1"}>TV Serios</NavLink></li>
          <li className='px-3 '><NavLink  className ="text-decoration-none text-white list-color"   to={"wishlist"}>WishList</NavLink></li>
          <li className='px-3 list-color' onClick={logOut}>LogOut</li></>}



          {mobail?        
          <li className="nav-item d-flex justify-content-center align-items-center">
          <p className="nav-link btn d-flex justify-content-center align-items-center pt-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className={ultra?"fa-solid fa-bars fs-6":"fa-solid fa-bars fs-1"}></i>
          </p>
          <ul className="dropdown-menu bg-dark mt-4 end-0 top-0 text-center motion">
          <li className=' py-2 '><NavLink className = "text-decoration-none text-white list-color"   to={""}>Home</NavLink></li>
          <li className=' py-2 '><NavLink  className = "text-decoration-none text-white list-color"   to={"/movies/1"}>Movies</NavLink></li>
          <li className=' py-2 '><NavLink  className = "text-decoration-none text-white list-color"   to={"/tvs/1"}>TV Serios</NavLink></li>
          <li className=' py-2 '><NavLink  className = "text-decoration-none text-white list-color"   to={"/wishlist"}>WishList</NavLink></li>
          <li className=' py-2 text-white list-color ' onClick={logOut}>LogOut</li>
          </ul>
        </li>:""
}
        </ul>

      </div>
    </div>
  </nav>:""}




  </>

}
