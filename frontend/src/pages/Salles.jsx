import { useEffect, useState } from 'react'
import SalleCard from '../components/salles/SalleCard'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import typeEvenement from "../data/typeEvenement.json";
import wilayas from "../data/wilayas.json";
import communes from "../data/communes.json";

import Select from '../components/search/Select';
import Chainedselect from '../components/search/Chainedselect';
const Salles = () => {

    const [salles, setSalles] = useState(null);
    const [wilaya, setWilaya] = useState("");
    const [commune, setCommune] = useState("");
    const [typeEvent, setTypeEvent] = useState("");

    useEffect(()=>{

        const fetchSalle = async ()=>{
            try {
                const response = await axios.get(`http://localhost:3000/api/salleValidee?wilaya=${wilaya}&commune=${commune}`,{withCredentials:true});
                setSalles(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchSalle();
    },[wilaya, commune, typeEvenement]);

  return (
   <>
   <h1 className='block text-center text-3xl my-10'>Nos Salles</h1>
   <ToastContainer />
  
  <div className='flex gap-5 mb-5'>

    <Select  label="Type d'evenement"
                data={typeEvenement}
                setData={setTypeEvent}
                value={typeEvent}/>
            <Select label="Wilaya" data={wilayas} setData={setWilaya}   value={wilaya} />
            <Chainedselect
                label="Commune"
                data={communes}
                setData={setCommune}
                indexTitle="wilaya_id"
                indexData={wilaya}
                value={commune}
            />

  </div>
   <section className='w-full  max-w-7xl m-auto grid grid-cols-1 place-items-center lg:grid-cols-3 gap-5'>
    {
        salles?.map((salle)=> <SalleCard title={salle.titre} description={salle.description} salleId={salle._id} img={salle.images[0]?.url} key={salle._id}/>)
    }
  
   </section>
   </>
  )
}

export default Salles;