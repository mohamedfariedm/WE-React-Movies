import React,{useRef,useState,useEffect} from 'react'
import img from '../../Assets/paseLogo.png'
import emailjs from '@emailjs/browser'
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function Footer() {

  function handelToast(){
    toast.error("coming soon")
  }
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_x072t42",
        "template_hhf7jh8",
        {
          from_name: form.name,
          to_name: "Mohamed faried",
          from_email: form.email,
          to_email: "mohamed.faried23267@gmail.com",
          message: form.message,
        },
        "_ogs3cj5pPM7JSKlc"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };
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
  return <>
  <section className='bg-black text-white position-relative indexMore'>

<div className="container">
  <footer className="pt-5">
    <img src={img} alt="weekEnd Movies" className='w-100' />
    <hr />
    <div className="row pt-5 justify-content-center align-items-center">
      <div className=" col-md-6 mb-3 ">
        <ul className={mobail?"nav d-flex flex-column align-items-center g-2  justify-content-center":"nav d-flex justify-content-around"}>
          <li className="nav-item mb-2 media-hov"><Link href="" className="nav-link p-0 media-hov text-light">Home</Link></li>
          <li className="nav-item mb-2 media-hov"><a onClick={handelToast} className="nav-link p-0 media-hov text-light pointer">About</a></li>
          <li className="nav-item mb-2 media-hov"><a onClick={handelToast} className="nav-link p-0 media-hov text-light pointer">Features</a></li>
          <li className="nav-item mb-2 media-hov"><a onClick={handelToast} className="nav-link p-0 media-hov text-light pointer">Pricing</a></li>
          <li className="nav-item mb-2 media-hov"><a onClick={handelToast} className="nav-link p-0 media-hov text-light pointer">FAQs</a></li>
        </ul>
        <Toaster />
      </div>

      <div className="col-md-6  mb-3 shadow-lg p-2">
        <form ref={formRef} onSubmit={handleSubmit}>
          <h5>Subscribe to my newProject</h5>
          <p>Please contact me and tell me your opinion </p>
          <div className="d-flex flex-column flex-sm-row w-100 gap-2">
            <label htmlFor="newsletter1" className="visually-hidden">Your Name</label>
            <input id="newsletter1" className="form-control" 
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="Name...."/>
          </div>
          <div className="d-flex flex-column flex-sm-row w-100 gap-2 mt-4">
            <label htmlFor="newsletter1" className="visually-hidden">Email Address</label>
            <input id="newsletter1" className="form-control" 
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="email...."/>
          </div>
          <div className="d-flex flex-column flex-sm-row w-100 gap-2 mt-4">
            <label htmlFor="newsletter1" className="visually-hidden">Massage</label>
            <textarea id="newsletter1" className="form-control" 
            rows={5}
            name='message'
            value={form.message}
            onChange={handleChange}
            placeholder="what do you wan't to say....."/>
          </div>
        <div className='d-flex justify-content-center align-items-center mt-4'>
            <button className="btn btn-outline-danger" type="submit" >{loading?"loading...":"Subscribe"}</button>
        </div>
        </form>
      </div>
    </div>

    <div className="d-flex flex-column flex-sm-row justify-content-between py-2 border-top">
      <p>© 2023 MohamedFaried..WeekEndMovies. All rights reserved.</p>
      <ul className="list-unstyled d-flex ">
        <li className="ms-3"><a className="text-light" href="https://www.instagram.com/friedovic/" target='_blank'><i className='fs-2 media-hov fa-brands  fa-instagram'></i></a></li>
        <li className="ms-3"><a className="text-light" href="https://www.facebook.com/eng.mohamed.fried" target='_blank'><i className='fs-2 media-hov fa-brands fa-facebook '></i></a></li>
        <li className="ms-3"><a className="text-light" href="https://www.linkedin.com/in/mohamed-faried-847267296/" target='_blank'><i className='fs-2 media-hov fa-brands fa-linkedin'></i></a></li>
      </ul>
    </div>
  </footer>
</div> 
  </section>
  </>

}
