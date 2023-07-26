import axios from "axios";
import { useEffect, useState } from "react"


const Mesreservation = () =>{

    const [refetch, setRefetch] = useState(false);
    const [data, setData] = useState();
    const [detail, setDetail]  = useState();

    useEffect(()=>{
        const getReservation = async ()=>{
            const response = await axios.get('http://localhost:3000/api/users/reservation',{withCredentials:true});
            console.log(response.data);
            setData(response.data)
       }
       getReservation();

    },[refetch])


    const supprimer = async(id)=>{
        try {
             const response = await axios.delete(`http://localhost:3000/api/reservations/${id}`,{withCredentials:true});
            console.log(response.data);
            setRefetch(!refetch)
        } catch (error) {
            console.log(error)
        }
       
    }


    const annuler = async(id)=>{
        try {
             const response = await axios.put(`http://localhost:3000/api/reservations/${id}/annuler`,{},{withCredentials:true});
            console.log(response.data);
            setRefetch(!refetch)
        } catch (error) {
            console.log(error)
        }
       
    }
    return <> 
    <div className="overflow-x-auto mt-5">
  <table className="table">
  
    <thead>
      <tr>
        <th></th>
        <th>Salle</th>
        <th>Status</th>
        <th>date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      
    {
        data?.map((reservation, idx)=>{
            return <tr key={reservation._id}>
                <th>{idx+1}</th>
        <th>{reservation.salle.nom}</th>
        <td>{reservation.statut}</td>
        <td>{reservation.dateDebut.slice(0,10)}</td>
        <td><div className="space-x-5">
            
            <button className="btn btn-sm btn-primary" onClick={()=>{
             
                setDetail({
                    salle: reservation.salle.nom,
                    datedebut : reservation.dateDebut.slice(0,10),
                    datefin: reservation.dateFin.slice(0,10),
                    datereservation : reservation.createdAt.slice(0,10)
                })
                   window.my_modal_2.showModal()
                }}>Detail</button>
           <button onClick={()=> supprimer(reservation._id)} className="btn btn-sm bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border-red-500">Supprimer</button>
           { reservation.statut !== 'Annulée' &&  <button onClick={()=> annuler(reservation._id)} className="btn btn-sm">Annuler</button>}
            </div></td>
      </tr>
        })
    }
      
    </tbody>
  </table>
</div>
{/* modal */}
<dialog id="my_modal_2" className="modal">
  <form method="dialog" className="modal-box">
    <h3 className="font-bold text-lg">Detail</h3>
    <p className="py-4"><span className="text-lg font-bold">Salle : </span> {detail?.salle}</p>
    <p className="py-4"><span className="text-lg font-bold">Date de Debut : </span> {detail?.datedebut}</p>
    <p className="py-4"><span className="text-lg font-bold">Date De Fin : </span> {detail?.datefin}</p>
    <p className="py-4"><span className="text-lg font-bold">Date de reservation : </span> {detail?.datereservation}</p>
  </form>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
    </>
}
export default Mesreservation