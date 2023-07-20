import axios from 'axios';
import  { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const Detailsalle = () => {
  const [salle, setSalle] = useState(null);
  let { salleId } = useParams();
    useEffect(()=>{

        const fetchSalle = async ()=>{
            try {
                const response = await axios.get(`http://localhost:3000/api/salle/${salleId}`,{withCredentials:true});
                setSalle(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchSalle();
    },[]);



   

  return (
    <section className='max-w-6xl mx-auto  mt-10 '> 

<h1 className='text-3xl'>{salle?.nom}</h1>
<h2 className='text-3xl font-bold'>20000DA</h2>
<div className='flex gap-5 my-5  '>

{/* carousel */}
 <div className="carousel carousel-center rounded-box w-[75%] h-[80vh] ">
  {
    salle?.images.map((image,idx)=>{
      return <div className="carousel-item  w-full" key={idx}>
      <img src={image.url} alt="Burger" />
    </div> 
    })
  }
    
   </div>

   {/* details */}
  <div className='w-[25%] pl-5'> 

  <h3 className='text-lg font-semibold'>adresse</h3>
  <p className='mb-5'>{salle?.adresse}</p>

  <h3 className='text-lg font-semibold'>Nombre de table</h3>
  <p className='mb-5'>{salle?.nombre_de_tables}</p>

  <h3 className='text-lg font-semibold'>Nombre de place parking</h3>
  <p className='mb-5'>{salle?.places_Parking}</p>

  
  <h3 className='text-lg font-semibold'>Agrement</h3>
  <p className='mb-5'>{salle?.agrement}</p>

  
  
  </div>

</div>

{/* description */}

<p className='text-md '>{salle?.description}</p>


<div className='my-5 flex gap-5 justify-center'>

  <Link className="btn btn-primary" to={`/Reserver/${salleId}`} >Réserver</Link>
  <button className="btn">Demander un avis</button>
</div>
    </section>
  //   <div className="carousel carousel-center rounded-box">
  //   <div className="carousel-item  w-full">
  //     <img src="/Jrz1Q9_900x.webp" alt="Burger" />
  //   </div> 
  //   <div className="carousel-item  w-full">
  //     <img src="/Jrz1Q9_900x.webp" alt="Burger" />
  //   </div> 
  //   <div className="carousel-item  w-full">
  //     <img src="/Jrz1Q9_900x.webp" alt="Burger" />
  //   </div> 
  //   <div className="carousel-item  w-full">
  //     <img src="/Jrz1Q9_900x.webp" alt="Burger" />
  //   </div> 
  //   <div className="carousel-item  w-full">
  //     <img src="/Jrz1Q9_900x.webp" alt="Burger" />
  //   </div> 
  //   <div className="carousel-item  w-full">
  //     <img src="/Jrz1Q9_900x.webp" alt="Burger" />
  //   </div> 
  //   <div className="carousel-item  w-full">
  //     <img src="/Jrz1Q9_900x.webp" alt="Burger" />
  //   </div>
  // </div>
  )
}

export default Detailsalle