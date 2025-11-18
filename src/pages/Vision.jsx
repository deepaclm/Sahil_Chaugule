import React from 'react'
import StickyCards from "../components/StickyCards";
import { useEffect } from 'react';



const Vision = () => {

   useEffect(()=>{
       window.scrollTo(0, 0);
    })
  return (
    <div ><StickyCards/></div>
  )
}

export default Vision