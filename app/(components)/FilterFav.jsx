'use client'
import React from 'react'

function FilterFav({toggle}) {
    const handleToggle = ()=>{
        toggle = !toggle;
        console.log(toggle);
      }
  return (
    
        <button onClick={handleToggle}>
            Toggle me
        </button>
    
  )
}

export default FilterFav