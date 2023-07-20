// import React from 'react'
import { Link } from 'react-router-dom'

const SingleEvent = ({title}) => {
  return (
    <Link to="">
    <div className="card w-96 bg-base-100 shadow-xl image-full">
  <figure><img src="pexels-rosario-fernandes-3835638.jpg" alt="Shoes" /></figure>
  <div className="card-body justify-between">
    <h2 className="card-title">{title}</h2>
    {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
    <div className="card-actions justify-end">
      {/* <button className="btn btn-primary">Voir plus</button> */}
    </div>
  </div>
</div></Link>
  )
}

export default SingleEvent