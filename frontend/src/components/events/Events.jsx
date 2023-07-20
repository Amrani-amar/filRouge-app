import typeEvenement from '../../data/typeEvenement.json'
import SingleEvent from './SingleEvent'
const Events = () => {
  return (
    <div className='w-full  max-w-7xl m-auto mt-20'>
      <h2 className='text-3xl mb-5'>Choisir une salle par événement</h2>
      <div className='flex flex-wrap gap-5'>
        { typeEvenement.map((event,idx)=>{
      return <SingleEvent key={idx} title={event.title}/>
      })}
      </div>
     
    </div>
  )
}

export default Events