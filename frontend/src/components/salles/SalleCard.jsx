
import { Link } from 'react-router-dom'

const SalleCard = ({title, description, salleId, img}) => {
  return (
<div className="card w-96 bg-base-100 shadow-xl">
  <figure className='h-48 '><img className="object-fill" src={img} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <p>{description}</p>
    <div className="card-actions justify-end">
      <Link className="btn btn-primary" to={`/detailSalle/${salleId}`}>Detail</Link>
    </div>
  </div>
</div>
  )
}

export default SalleCard