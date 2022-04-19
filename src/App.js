import {useState, useEffect} from "react";
import './App.css';
import BreweryData from "./BreweryData";

export default function App() {
  const [data, setData] = useState([]);
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

  return (
    <div className="page">
     <div className="brewery-page">
       {data.map((brewery)=>{
         return(
           <BreweryData key={brewery.id} {...brewery} />)
       })}
     </div>
    </div>
  );
}


