import { useEffect,useState } from "react";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker } from 'react-leaflet'
import L from 'leaflet';
import { Popup } from 'react-leaflet/Popup'
import axios from 'axios';
import '../../Preloader.css';


function CarteInteractive() {
  const [isLoaded, setIsLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(false);
    const [clients,setClients] = useState([]);

    const markerIcon = new L.Icon({
      iconUrl:require("../../static/icon3.png"),
      iconSize:[25,25]
    })

    const closeAlert = async (event) =>{
      event.preventDefault();
      setSuccess(false);
      setError(false);
    }
    
    useEffect(()=>{
      
      const token = "Bearer "+localStorage.getItem('token');
      
      axios({
        method:"get",
        url:'http://localhost:8500/client/',
        responseType: 'json',
        headers: {
            'Authorization': token,
            'Content-type': "application/json"
        }
        })
        .then(function (response) {
            setIsLoaded(false);
            const data = response.data;
            console.log(data);
            if(data.success == true){
                setClients(data.data);
                setIsLoaded(false);
            }else{
              setErrorMessage(data.message);
              setError(true);
              setIsLoaded(false);
            }
        })
        .catch(function (error) {
            setIsLoaded(false);
            setErrorMessage("Erreur survenue");
            setError(true);
        });
    });

    function formatAccountid(id){
      if(id == null) return 0;

      return id.toString().padStart(4,"0");
    }

    const formatedDate = (date) =>{
      return (new Date(date)).toLocaleDateString()
    }; 

    const defineMarker = (client) =>{
       const date_dernier_collecte = client.date_dernier_collecte;
       const intervale_de_collecte = client.intervale_de_collecte;

       let iconName = "";

       if(date_dernier_collecte == null)

       if(iconName == "icon1"){

       }

       if(iconName == "icon2"){
        
       }

       if(iconName == "icon3"){
        
       }
    }; 


    return (
        <>
        <div className="pd-ltr-20 xs-pd-20-10">
                <div class="pd-20 card-box mb-30" style={{borderRadius:"50px"}}>
                    <div class="clearfix">
                    <div class="pull-left" style={{marginRight:"40px"}} >
                            <select class="form-control" style={{borderRadius:"50px"}}>
                                <option>Commune &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
                                <option>Commune 1</option>
                                <option>Commune 2</option>
                                <option>Commune 3</option>
                                <option>Commune 4</option>
                                <option>Commune 5</option>
                            </select>
                    </div>
                    <div class="pull-left" style={{marginRight:"40px"}}>
                            <select class="form-control" style={{borderRadius:"50px"}}>
                                <option>Zone &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
                                <option>Zone 1</option>
                                <option>Zone 2</option>
                                <option>Zone 3</option>
                                <option>Zone 4</option>
                                <option>Zone 5</option>
                            </select>
                    </div>
                    <div class="pull-left" style={{marginRight:"40px"}}>
                            <select class="form-control" style={{borderRadius:"50px"}}>
                                <option>Quartier &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
                                <option>Quartier 1</option>
                                <option>Quartier 2</option>
                                <option>Quartier 3</option>
                                <option>Quartier 4</option>
                                <option>Quartier 5</option>
                            </select>
                    </div>
                    <div class="pull-right">
                            <button class="btn btn-primary" style={{borderRadius:"50px"}}>Rechercher</button>
                    </div>
                    </div>
                </div>
        </div>
        
        <div className="pd-ltr-20 xs-pd-20-10">

        <div class="pd-20 card-box mb-30">
              <div class="clearfix">
                <div class="pull-left">
                  <h4 class="h4">Carte des zones couvertes</h4>
                </div>
              </div>
              <br/>
              <div class="clearfix">
              <MapContainer center={[-4.3377, 15.3113]} zoom={15} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
                {clients &&  
                  <>
                    {clients.map((client) => 
                    <>
                      <Marker position={[parseFloat(client.coord_latitude),parseFloat(client.coord_longitude)]} icon={markerIcon}>
                        <Popup>
                          Client:{client.nom} {client.postnom} {client.prenom}<br/>
                          Poubelle à QR Code 
                        </Popup>
                      </Marker>
                      </>
                     )}
                  </>
                } 
            </MapContainer>
              </div>
              </div>
              
          <div className="footer-wrap pd-20 mb-20 card-box" style={{display:"none"}}>
            DeskApp - Bootstrap 4 Admin Template By
            <a href="https://github.com/dropways" target="_blank">Ankit Hingarajiya</a>
          </div>
        </div>
        </>
    );
  }

  export default CarteInteractive;