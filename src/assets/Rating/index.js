import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import './index.css'
function Rate({data}) {
  return (
    <div className='rating'>
        <span>{data}</span>
        <StarIcon className='icon'/>
        
    </div>
  )
}

export default Rate
