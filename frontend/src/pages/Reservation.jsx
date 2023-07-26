import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



const Reservation =  ()=>{
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const[telephone,setTelephone]=useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [message, setMessage] = useState('');
  
    let { salleId } = useParams();
useEffect(()=>{
    console.log(dateDebut)
},[dateDebut])
    const navigate = useNavigate();


    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post(`http://localhost:3000/api/reservations/${salleId}`, {
            nom,
            prenom,
            telephone,
            dateDebut,
            dateFin
          }, {
            withCredentials: true
          });
    
          console.log(response.data);
    
          setMessage('La réservation a été créée avec succès.');
    
          setNom('');
          setPrenom('');
          setTelephone('');
          setDateDebut('');
          setDateFin('');
    
          navigate('/salles'); // Rediriger vers une autre page après la réservation
        } catch (error) {
          console.log(error);
          setMessage('Une erreur est produite lors de la création de la réservation.');
        
        }
      };


return <section className="max-w-6xl mx-auto mt-10">
<h1 className="text-4xl mb-5">Réserver une salle</h1>

    <form onSubmit={handleFormSubmit} className="space-y-3">
        <div>
            <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
            <input value={nom} onChange={(e)=> setNom(e.target.value)} type="text" name="name" id="nom" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required=""/>
        </div>
        <div>
            <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prenom</label>
            <input value={prenom} onChange={(e)=> setPrenom(e.target.value)}  type="text" name="name" id="prenom" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required=""/>
        </div>
        <div>
            <label htmlFor="tel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Téléphone</label>
            <input value={telephone} onChange={(e)=> setTelephone(e.target.value)}  type="text" name="name" id="tel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required=""/>
        </div>
        <div>
            <label htmlFor="dd" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date de Debut</label>
            <input value={dateDebut} onChange={(e)=> setDateDebut(e.target.value)}  type="date" name="name" id="dd" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" min={new Date().toISOString().split('T')[0]}/>
        </div>
        <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date de Fin</label>
            <input value={dateFin} onChange={(e)=> setDateFin(e.target.value)}  type="date" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" min = {dateDebut || new Date().toISOString().split('T')[0]}/>
        </div>
        <button type="submit" className="btn btn-primary">Réserver</button>
    </form>
</section>
}

export default Reservation;