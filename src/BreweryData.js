import {useState} from "react"
import "./BreweryData.css";

export default function BreweryData(props){
    const {name,street, city, postal_code, brewery_type, phone, website_url} = props
    const  [toggle,setToggle] = useState(false)
    function showContacts(){
        setToggle(!toggle)
    }
return(
    <div className="container">
    <div className="info">
    <span className="info-title">{name} </span> 
        {website_url && <a href={website_url} target="_blank" rel="noreferrer noopener"><i className="small bi bi-box-arrow-up-right"></i></a>}
        <ul>
        <li>Type: {brewery_type.slice(0,1).toUpperCase() +  brewery_type.slice(1)}</li>
        <li>Location: {street ? street :""}, {city}</li>
        <li>Zip code: {postal_code}</li>
        </ul>
    {toggle && 
            <div className="contact-info">
                <div>Phone: {phone ?
                 phone.slice(0,3) + "-" + phone.slice(3,6) + "-" + phone.slice(6)
                 : "N/A"}</div>
                <div>Website: {website_url ? website_url : "N/A"}</div>
                </div>}
            </div>
        <div className="toggle" onClick={showContacts}>+</div>
    </div>
)
}