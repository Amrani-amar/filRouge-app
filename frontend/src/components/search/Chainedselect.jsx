import React from 'react'

const Select = ({label='label', data, setData, indexTitle, indexData, value}) => {
  return (
    <select value={value || label} className="select select-lg select-bordered border-black text-black bg-primary/50 w-full " onChange={(e) =>setData(e.target.value)}>
    <option disabled >
      {label}
    </option>
    {
        data?.map(item => {
            return item[indexTitle] === indexData ? 
             <option key={item.id} value={item.title}>{item.title}</option>
             :null
        })
    }

</select>
  )
}

export default Select