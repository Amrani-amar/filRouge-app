// import React from 'react'

const Select = ({label='label', data, setData, value}) => {
  return (
    <select value={value || label} className="select select-lg select-bordered border-black text-black w-full bg-primary/50 " onChange={(e) =>setData(e.target.value)}>
    <option disabled >
      {label}
    </option>
    {
        data?.map(item => {
            return <option key={item.id} value={item.title}>{item.title}</option>
        })
    }

</select>
  )
}

export default Select