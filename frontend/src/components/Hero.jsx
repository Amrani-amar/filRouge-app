// import React from 'react'
import HomeSearch from './search/HomeSearch'
const Hero = () => {
  return (
<div className="hero min-h-screen" style={{backgroundImage: 'url(/pexels-rosario-fernandes-3835638.jpg)'}}>
  <div className="hero-overlay bg-opacity-40 w-full"></div>
  <div className="hero-content text-center text-neutral-content w-full relative">
    <div className="w-full absolute -top-52">
      <h1 className='text-5xl font-semibold italic text-white opacity-100 text-start mb-10'>Trouvez une salle pour votre événement </h1>
    <HomeSearch/>
      {/* <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
      <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <button className="btn btn-primary">Get Started</button> */}

    </div>
  </div>
</div>
  )
}

export default Hero;