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
      //add new sub elements
    ]
  },
  {
    path:'/connexion',
    element: <Connexion/>
  },{
    path:"/s'enregistrer",
    element:<Register/>
  }
  //add new elements
  

]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
