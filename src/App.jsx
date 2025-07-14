import { useState, useRef } from 'react';
import { useFetch } from './hooks/useFetch.jsx';
import { FaSearch, FaWind } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';
import React from 'react';
import './App.css';
import 'tailwindcss';

function App() {
  const [city, setCity] = useState('Lahore');
    const [unit, setUnit] = useState('metric');
  const inputRef = useRef();
  const { data, loading } = useFetch(city, unit);
  const [recentSearch, setRecentSearch]= useState([]);

  const search = () => {
    const inputCity = inputRef.current.value;
    if (inputCity.trim()) {
      setCity(inputCity.trim());
    }


 setRecentSearch(prev => {
    const updated = [inputCity, ...prev.filter(c => c !== inputCity)];
    return updated.slice(0, 5); 
  });
 inputRef.current.value = "";
  };
  function handleunits(){
     setUnit(prev => (prev==='metric'?'imperial':'metric'));
  }
   const unitSymbol = (unit ==='metric'?'°C':'°F');

  return (

    <div className="bg-blue-100 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4"> WeatherApp</h1>

      <div className="flex items-center gap-2 mb-6">
        <input
          className="bg-blue-50 rounded-xl p-2 border border-blue-300 pl-3 text-black"
          ref={inputRef}
          placeholder="Search for a city"
        />
        <button onClick={search}>
          <FaSearch size={20} />
        </button>
      </div>
      {loading?<p>loading..</p>:""}

      {/* {data && !loading ? ( */}
         {data&& !loading&& data.main && data.wind && data.weather ?
          <>
        <div className="bg-white shadow-md rounded-xl p-4 space-y-2 text-blue-900 w-fit">
          <h2 className="text-xl font-semibold">{data.name}</h2>
         
          <p className="flex items-center gap-2">
            <WiHumidity size={34} />
            Humidity: {data.main.humidity}%
          </p>
          <p className="flex items-center gap-2">
            <FaWind size={28} /> Wind Speed: {data.wind.speed}{unit==="metric"?"m/s":"mph"}
          </p>
          <p className="text-lg"> Temperature: {data.main.temp}{unitSymbol} <button onClick={handleunits}>Switch to {unit==="metric"?"Celsius":"Fahrenhite"}</button></p>
          <p className="capitalize bg-blue-950 text-blue-100 rounded-lg"> {data.weather[0].description}</p>
  

          <p className='bg-blue-200 text-blue-900 w-30'>Search History/</p>
        <ul>{recentSearch.map((item)=>(
          <li className='capitalize'>◾{item}</li>
        ))}</ul>
        </div>

        </> :"Enter a valid city name"}
        {}

      
        <p className="text-gray-600">Loading weather data...</p>
     
    </div>
  );
}

export default App;
