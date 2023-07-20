import { useEffect, useState } from 'react'
import SalleCard from '../components/salles/SalleCard'
import axios from 'axios';

const Salles = () => {

    const [salles, setSalles] = useState(null);
    useEffect(()=>{

        const fetchSalle = async ()=>{
            try {
                const response = await axios.get('http://localhost:3000/api/salleValidee',{withCredentials:true});
                setSalles(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchSalle();
    },[]);

  return (
   <>
   <h1 className='block text-center text-3xl my-10'>Nos Salles</h1>
   
   <section className='w-full  max-w-7xl m-auto flex gap-5'>
    {
        salles?.map((salle)=> <SalleCard title={salle.titre} description={salle.description} salleId={salle._id} img={salle.images[0]?.url} key={salle._id}/>)
    }
  
   </section>
   </>
  )
}

export default Salles