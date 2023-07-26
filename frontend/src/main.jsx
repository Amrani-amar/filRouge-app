import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Salles from './pages/Salles.jsx';
import Home from './pages/Home.jsx';
import Mainlayout from './layouts/Mainlayout';
import Detailsalle from './pages/Detailsalle';
import Connexion from './pages/Connexion';
import Register from './pages/Register';
import Reservation from './pages/Reservation';
import AjouterSalle from './pages/AjouterSalle';
import Dashboard from './layouts/Dashboard';
import Mesreservation from './pages/utilisateur/Mesreservation'
import MesSalles from './pages/gerant/MesSalles';
import SalleReservation from './pages/gerant/Reservation';
import AllSalles from './pages/admin/Salles';
import Users from './pages/admin/Users';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout/>,
    children:[
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/salles',
        element: <Salles/>
      },
      {
        path: '/detailSalle/:salleId',
        element : <Detailsalle/>
      },
      {
        path: '/Reserver/:salleId/',
        element : <Reservation/>
      },
      {
        path: '/ajouterSalle',
        element: <AjouterSalle/>
      },
      {
        path: '/dashboard',
        element : <Dashboard/>,
        children: [
          {
            path: 'user/mesreservation',
            element : <Mesreservation/>
          },
          {
            path: 'gerant/mesSalles',
            element : <MesSalles/>
          },    
          {
            path: 'gerant/mesSalles/:id',
            element : <SalleReservation/>
          },    
          {
            path: 'admin/salles',
            element : <AllSalles/>
          }  ,    
          {
            path: 'admin/users',
            element : <Users/>
          }      
        ]
      }
    
    ]
  },
  {
    path:'/connexion',
    element: <Connexion/>
  },{
    path:"/s'enregistrer",
    element:<Register/>
  }
  
 
  

]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
