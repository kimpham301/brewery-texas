import {useState, useEffect} from "react";
import './App.css';
import BreweryData from "./BreweryData";

export default function App() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const state = "texas";
  async function fetchData(){
    let response =  await fetch(`https://api.openbrewerydb.org/breweries?by_state=${state}`)
    let data = await response.json();
    return data;
  }
  useEffect(()=>{
    fetchData()
    .then(data =>{
      setData(data)}
    )
    .catch(err=>console.log("Error: ",err))
  }, []);
  const uniqueValue= new Set(data.map(v=>v.city))
  return (
    <div className="page">
      <input
      className = "search-input"
      placeholder="Search by Name"
      onChange={(e)=>setSearchInput(e.target.value)}
      />
     <div className="brewery-page">
       <select onChange={(f)=>setCityFilter(f.target.value)}>
        <option value="">All cities</option>
        {Array(...uniqueValue).map(value1=>
        <option key={value1} value= {value1}>{value1}</option>
          )}
          </select>
       {data.filter((city)=>{
        if(cityFilter===""){
          return city
        } else if (city.city === cityFilter){
          return city
        }
      })
       .filter((name)=>{
        if(searchInput===""){
          return name
        } else if (name.name.toLowerCase().includes(searchInput.toLowerCase())){
          return name
        }
      })
      .sort((a,b)=>{
        return a.name >b.name ? 1 : -1;
      })
      .map((brewery)=>{
         return(
           <BreweryData key={brewery.id} {...brewery} />)
       })}
     </div>
    </div>
  );
}


