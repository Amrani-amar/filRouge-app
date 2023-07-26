import { useEffect } from "react";
import {  NavLink, Outlet, useNavigate } from "react-router-dom";


const Dashboard = ()=>{


    const config = {
        'admin' : [
            {
                text: 'Salles',
                link: 'admin/salles'
            },
            {
                text:'utilisateurs',
                link:'admin/users'
            }
        ],
        'gerant' : [
            {
                text: 'mes Salles',
                link: 'gerant/mesSalles'
            }
        ],
        'utilisateur' : [
            {
                text: 'mes Résérvation',
                link: 'user/mesreservation'
            }
        ],

    }
    const navigate = useNavigate()

    useEffect(()=>{
        if(localStorage.connected && localStorage.connected == "true"){
            if(localStorage.role == 'admin'){
                navigate('/dashboard/admin/salles')
            }else  if(localStorage.role == 'gerant'){
                navigate('/dashboard/gerant/mesSalles')
            }else{
                
                navigate('/dashboard/user/mesreservation')
            }

        }else{
            navigate('connexion')
        }
    },[])
    return <>
    
    
    <div className="drawer mt-5">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content  ">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Navigation</label>
  </div> 
  <div className="drawer-side z-40">
    <label htmlFor="my-drawer" className="drawer-overlay"></label>
    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}

      {
        config[localStorage.role].map((item,idx)=>{

            return <li key={idx}><NavLink to={item.link}>{item.text}</NavLink></li>
        })
      }
    </ul>

   
  </div>
</div> <section>

        <Outlet/>
    </section>
</>
}

export default Dashboard;