import {useState, useEffect} from 'react';
import './App.css';
import BreweryData from './BreweryData';

export default function App(){
const [data, setData] = useState([]);
const [searchInput, setSearchInput] = useState('')
const [cityFilter, setCityFilter] = useState('')
const state = `texas`;
function oneDay(){
  var date = new Date().toLocaleDateString();
  if(localStorage.brewery_date === date)
  return false;
  localStorage.brewery_date = date
  return true;
}
async function fetchData(){
    let response = await fetch(`https://api.openbrewerydb.org/breweries?by_state=${state}`)
    let data = await response.json();
    return data
}
useEffect(()=>{
  fetchData()
    .then(data=> {
      setData(data)
      console.log(data)}
      )
    .catch(err=>console.log("Error: ", err))
    if (oneDay()) {
      fetchData()
      .then(data=> {
        setData(data)
        console.log(data)}
        )
      .catch(err=>console.log("Error: ", err))}
}, []);
/*Create a set of cities */
const uniqueValue= new Set(data.map(v=>v.city))
  return (
    <div className="page">
      
       <input
      className = "search-input"
      placeholder="Search by Name"
      onChange={(e)=>setSearchInput(e.target.value)}
      />
      

    <div className="brewery-page">
    <select className="city-select" onChange={(f)=>setCityFilter(f.target.value)}>
        <option value="">All cities</option>
        {Array(...uniqueValue).sort((a,b)=>{return a>b ? 1 :-1}).map(value1=>
        <option key={value1} value= {value1}>{value1}</option>
          )}
      
      </select>
      {/*Filter data by city*/
      data.filter((city)=>{
        if(cityFilter===""){
          return city
        } else if (city.city === cityFilter){
          return city
        }
      })
      /*Filter data by searchInput*/
      .filter((name)=>{
        if(searchInput===""){
          return name
        } else if (name.name.toLowerCase().includes(searchInput.toLowerCase())){
          return name
        }
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
