import {useState, useEffect} from 'react';
import './App.css';
import BreweryData from './BreweryData';

export default function App(){
const [data, setData] = useState([]);
const [searchInput, setSearchInput] = useState('')
const [cityFilter, setCityFilter] = useState('')
const [typeFilter, setTypeFilter] = useState('')
const state = `texas`;

function oneDayPassed(){
  var date = new Date().toLocaleDateString();
  if(localStorage.getItem('date') === date)
  return false;
  localStorage.setItem('date', date);
  return true;
}

console.log(localStorage.getItem('date'))

useEffect(()=>{
  async function fetchData(){
    try{ 
      const response = await fetch(`https://api.openbrewerydb.org/breweries?by_state=${state}`)
      let breweryData = await response.json()
      localStorage.setItem("data", JSON.stringify(breweryData))
      setData(JSON.parse(localStorage.getItem("data")))
      console.log("data updated")
      localStorage.setItem("state", state)
    }
    catch(err){console.log("Error: ", err)}
  }
  if (oneDayPassed() || state !== localStorage.getItem("state")) fetchData()
  else if (!oneDayPassed()) {
    setData(JSON.parse(localStorage.getItem("data")))
    console.log("not updated")}

  setInterval(() => {
    fetchData();
  }, 1000 * 60 * 60 * 24) /* every 24 hours, we'll fetch the data, assuming browser still on.*/
 
}, [state]);

/*Create a set of cities */
const uniqueValue= new Set(data.map(v=>v.city))
const uniqueTypes = new Set(data.map(t=> t.brewery_type))
  return (
    <div className="page">
      <h1 id="title">{state} Brewery Data</h1>
       <input
      className = "search-input"
      placeholder="Search by Name"
      onChange={(e)=>setSearchInput(e.target.value)}
      />
      

    <div className="brewery-page">
      <div className="filter">
    <select className="select" onChange={(t)=>setTypeFilter(t.target.value)}>
        <option value="">All types</option>
        {Array(...uniqueTypes).sort((a,b)=>{return a>b ? 1 :-1}).map(value1=>
        <option key={value1} value= {value1}>{value1}</option>
          )}
      
      </select>
      <select className="select" onChange={(f)=>setCityFilter(f.target.value)}>
        <option value="">All cities</option>
        {Array(...uniqueValue).sort((a,b)=>{return a>b ? 1 :-1}).map(value=>
        <option key={value} value= {value}>{value}</option>
          )}
      
      </select>
      </div>
      {/*Filter data by type, city*/
      data.filter((type)=>{
        if(typeFilter===""){
          return type}
        else return type.brewery_type=== typeFilter
      })
      .filter((city)=>{
        if(cityFilter===""){
          return city}
        else return (city.city === cityFilter)
      })
      /*Filter data by searchInput*/
      .filter((name)=>{
        if(searchInput===""){
          return name
        } else return (name.name.toLowerCase().includes(searchInput.toLowerCase()))
      })
      /*Sort data alphabetically A-Z*/
      .sort((a,b)=>{
        return a.name >b.name ? 1 : -1;
      /*Display Data*/
      }).map((brewery) => {
        return(
          <BreweryData key={brewery.id} {...brewery}/>
        )
      })
    }
 </div>

  </div>
  )
}
