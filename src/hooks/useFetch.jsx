import React, { useEffect } from 'react'
import { useState } from 'react';

const useFetch = (city, unit="metric") => {
const[data, setdata]=useState();
  const [loading, setLoading] = useState(false)
// const[loading, setloading]=useFetch(false);
  const API_KEY = import.meta.env.VITE_APP_ID;
const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`;


useEffect(()=>
{ async function fetching(){
    try{
          setLoading(true);
         const response=await fetch(url);
       
const result= await response.json();
setdata(result);
console.log(result);
if (!response.ok) {
  console.error("API Error:", result.message); 
}
    }
    catch(err){
        console.error("fetching error..", err);
        setdata(null);
    }
    setLoading(false);
    
}
if(city)
fetching();
}
   , [city, unit])

return ({data, loading});
  
}

export  {useFetch}
