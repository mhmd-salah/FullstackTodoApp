import React, { useState } from "react";
import { useLocation } from "react-router-dom";




const TransitionOverlay=()=>{
   const location = useLocation()
   const [isAnimating,setIsAnimation] = useState(false)
   React.useEffect(()=>{
      setIsAnimation(true)
      const timer = setTimeout(() => {
         setIsAnimation(false)
      }, 1000);
      return ()=> clearTimeout(timer)
   },[location.pathname])
   return <div className={`transition-overlay ${isAnimating?'active':""}`}></div>;
}
export default TransitionOverlay;