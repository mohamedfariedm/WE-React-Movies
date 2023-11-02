import React from 'react'
import image from '../../Assets/footer-bg.jpg'
import SingleMovie from '../SingleMovie/SingleMovie'
import { Helmet } from 'react-helmet'

export default function TvSerios() {
  window.scroll({
    top:0,
    left:0,
  })
  return <>
                <Helmet>
                <title>Series</title>
            </Helmet>
  <section style={{backgroundImage:`url(${image})`,backgroundPositionX:`center`,backgroundPositionY:`center`,backgroundSize:`cover`}}>
  <div className='text-white d-flex justify-content-center align-items-end mb-5' style={{height:`25vh`}}>
    <h2 className=' py-2 h3'>series</h2>
    </div>
  <div className='row  shadow-more px-3 mx-auto py-3 justify-content-center border border-0 rounded-5' style={{width:`100%`}}>
    <SingleMovie sort={"tv"} type={"top_rated"} />
  </div>
  </section>  </>

}
