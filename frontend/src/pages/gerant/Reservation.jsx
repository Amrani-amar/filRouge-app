import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";


const Reservation = () =>{

    const [refetch, setRefetch] = useState(false);
    const [data, setData] = useState();
    const [detail, setDetail]  = useState();
    const {id} = useParams()
    useEffect(()=>{
        const getReserve = async ()=>{
            const response = await axios.get(`http://localhost:3000/api/salle/${id}/reservations`,{withCredentials:true});
            console.log(response.data);
            setData(response.data)
       }
       getReserve();

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

const confirmer = async(id)=>{
        try {
             const response = await axios.put(`http://localhost:3000/api/reservations/${id}`,{},{withCredentials:true});
            console.log(response.data);
            setRefetch(!refetch)
        } catch (error) {
            console.log(error)
        }
       
    }

    const accepter = async(id)=>{
        try {
             const response = await axios.put(`http://localhost:3000/api/reservations/${id}/annuler`,{},{withCredentials:true});
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
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>nom et prenom</th>
        <th>telephone</th>
        <th>date de debut</th>
        <th>date de fin</th>
        <th>Status</th>

        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      
    {
        data?.map((salle, idx)=>{
            return <tr key={salle._id}>
                <th>{idx+1}</th>
        <th>{salle.nom} {salle.prenom}</th>
        <td>{salle.telephone}</td>
        <td>{salle.dateDebut.slice(0,10)}</td>
        <td>{salle.dateFin.slice(0,10)}</td>
        <td>{salle.statut}</td>
   
        <td><div className="space-x-5">
            
          <button className="btn btn-sm"  onClick={()=>accepter(salle._id)}>Accépter</button>
          <button className="btn btn-sm"  onClick={()=>confirmer(salle._id)}>Confirmer</button>
          <button className="btn btn-sm" onClick={()=>annuler(salle._id)}>    Annuler</button>
           <button onClick={()=> supprimer(salle._id)} className="btn btn-sm bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border-red-500">Supprimer</button>
       
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
    <p className="py-4"><span className="text-lg font-bold">place parking : </span> {detail?.parking}</p>
    <p className="py-4"><span className="text-lg font-bold">Nombre de places : </span> {detail?.table}</p>
    <p className="py-4"><span className="text-lg font-bold">Date de creation : </span> {detail?.date}</p>
  </form>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
    </>
}
export default Reservation