
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'


const Mainlayout = () => {
  return (
    <>
       <Navbar/>
      <div className='max-w-7xl mx-auto'>
        <Outlet />
      </div>
    </>

  )
}

export default Mainlayout;