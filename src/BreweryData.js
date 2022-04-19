import {useState} from "react"
import "./BreweryData.css";

export default function BreweryData(props){
    const {name,street, city, brewery_type, phone, website_url} = props
    const  [toggle,setToggle] = useState(false)
    function showContacts(){
        setToggle(!toggle)
    }
return(
    <div className="container">
    <div className="info">
    <span className="info-title">{name} </span> 
        {website_url && <a href={website_url}><i className="small bi bi-box-arrow-up-right"></i></a>}
        <ul>
        <li>Type: {brewery_type.slice(0,1).toUpperCase() +  brewery_type.slice(1)}</li>
        <li>Street: {street ? street :"N/A"}</li>
        <li>City: {city}</li>
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