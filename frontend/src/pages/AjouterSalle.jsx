import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import wilayas from "../data/wilayas.json";
import communes from "../data/communes.json";
import evnts from "../data/typeEvenement.json";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AjouterSalle = ()=>{

    const [nom, setNom] = useState('');
    const [adresse, setAdresse] = useState('');
    const [commune, setCommune] = useState('');
    const [wilaya , setWilaya] = useState('');
    const [type_Evenement , setType_Evenement] = useState([]);
  
    const [agrement, setAgrement] = useState('');
    const [nombre_de_tables, setNombre_de_tables] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [places_Parking, setPlaces_parking] = useState('');
  
    const checkRefs = useRef([]);
 
       const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.connected !== 'true' ){
          navigate('/CONNEXION')
      
        }else if (localStorage.role !== "admin" && localStorage.role !== "gerant" ){
          navigate('/CONNEXION')
        }
    },[navigate]);

useEffect(()=>{setCommune('')},[wilaya])
useEffect(()=>{console.log(type_Evenement)},[type_Evenement])
const notify = () => toast("Wow so easy!");
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('adresse', adresse);
        formData.append('commune', commune);
        formData.append('wilaya', wilaya);
        formData.append('type_Evenement', type_Evenement);
    
    
    
        formData.append('agrement', agrement);
        formData.append('nombre_de_tables', nombre_de_tables);
        formData.append('description', description);
        formData.append('places_Parking', places_Parking);
        formData.append('image',images)
    
        try {
          const response = await axios.post('http://localhost:3000/api/Salle', formData, {
            withCredentials: true,
          });
    
          console.log(response.data);
        
    
          setNom('');
          setAdresse('');
          setCommune('');
          setWilaya('');
          setAgrement('');
          setType_Evenement('');
          setNombre_de_tables('');
          setDescription('');
          setImages(null);
          setPlaces_parking('');
          notify()
          navigate('/salles');
        } catch (error) {
          console.log(error);
        }
      };


return <section className="pt-10 backdrop-blur-3xl bg-opacity-10 " >
<h1 className="text-4xl mb-5 block text-black max-w-6xl mx-auto">Ajouter Votre salle</h1>

    <form onSubmit={handleFormSubmit} className="space-y-3 max-w-6xl mx-auto">
        <div>
            <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom de la Salle</label>
            <input value={nom} onChange={(e)=> setNom(e.target.value)} type="text" name="name" id="nom" className="bg-primary/50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required=""/>
        </div>
        <div>
            <label htmlFor="wilaya" className="block mb-2 text-sm font-medium text-900 dark:text-white">Wilaya</label>
            <select value={wilaya } id='wilaya' className="select select-md select-bordered border-black text-black w-full bg-primary/50 " onChange={(e) =>setWilaya(e.target.value)}>
            <option disabled value="" >Séléctionnez votre wilaya</option>
    {
        wilayas?.map(item => {
            return <option key={item.id} value={item.title}>{item.title}</option>
        })
    }

        </select>
        </div>
        <div>
            <label htmlFor="commune" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Commmune</label>
            <select value={commune } id='commune' className="select select-md select-bordered border-black text-black w-full bg-primary/50 " onChange={(e) =>setCommune(e.target.value)}>
            <option disabled value='' >Séléctionnez votre Commune</option>
    {
        communes?.map(commune => {
            return commune.wilaya_id == wilaya && <option key={commune.id} value={commune.title}>{commune.title}</option>
        })
    }

        </select>
        </div>
        <div>
            <label htmlFor="adresse" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adresse</label>
            <input value={adresse} onChange={(e)=> setAdresse(e.target.value)} type="text" name="name" id="adresse" className="bg-primary/50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Entrez l'adresse de la salle" required=""/>
        </div>
        <div>
            <label htmlFor="agrement" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Agrement</label>
            <input value={agrement} onChange={(e)=> setAgrement(e.target.value)} type="text" name="name" id="agrement" className="bg-primary/50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Entrez votre agrément" required=""/>
        </div>

        <div>
            <label htmlFor="evnt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type Evénement</label>
            <div className="flex gap-5 flex-wrap">
                {
                    evnts.map((evnt,idx)=>{

                        return <div className="flex items-center mb-4" key={evnt.id}>
                        <input id={`default-checkbox${evnt.id}`} type="checkbox" value={evnt.title} ref={(ref)=> (checkRefs.current[idx] = ref)} 
                        onChange={()=>{
                            if(checkRefs.current[idx].checked == true){
                                setType_Evenement((prev)=>[...prev, checkRefs.current[idx].value] )
                            }else{
                                    setType_Evenement(()=>{
                                            return type_Evenement.filter( item => item !== checkRefs.current[idx].value )
                                    })
                            }
                        }}  
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor={`default-checkbox${evnt.id}`} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{evnt.title}</label>
                    </div>
                    })
                }
           

            </div>
        </div>
        <div>
            <label htmlFor="nbrtable" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de place</label>
            <input value={nombre_de_tables} onChange={(e)=> setNombre_de_tables(e.target.value)} type="text" name="name" id="nbrtable" className="bg-primary/50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Entrez votre Nombre de place" required=""/>
        </div>
        <div>
            <label htmlFor="parking" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de palce parking</label>
            <input value={places_Parking} onChange={(e)=> setPlaces_parking(e.target.value)} type="text" name="name" id="parking" className="bg-primary/50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Entrez votre nombre de place de parking" required=""/>
        </div>
        <div>
            <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <input value={description} onChange={(e)=> setDescription(e.target.value)} type="text" name="name" id="desc" className="bg-primary/50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Entrez votre Description" required=""/>
        </div>
        <div>
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Images</label>
            <input  onChange={(e) => setImages(e.target.files[0])}  type="file" name="name" id="image" className="bg-primary/50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Entrez vos images" required=""/>
        </div>
        <button type="submit" className="btn btn-primary">Réserver</button>
    </form>
</section>

}
export default AjouterSalle;