import { useEffect,useState } from "react";
import axios from 'axios';
import '../../Preloader.css';

function CreateClient() {
    
    const [users,setUsers] = useState([]);
    const [zones,setZones] = useState([]);
    const [nom,setNom] = useState("");
    const [postnom,setPostnom] = useState("");
    const [prenom,setPrenom] = useState("");
    const [sexe,setSexe] = useState("");
    const [idCommune,setIdCommune] = useState("");
    const [idQuartier,setIdQuartier] = useState("");
    const [avenue,SetAvenue] = useState("");
    const [numParcelle,SetNumParcelle] = useState("");
    const [latitude,SetLatitude] = useState("");
    const [longitude,SetLongitude] = useState("");
    const [idZone,SetIdZone] = useState("");
    const [typeClient,SetTypeClient] = useState("MENAGE");
    const [intervalCollecte,SetIntervalCollecte] = useState("");
    const [isLoaded,setIsLoaded] = useState(false);
	
    const [errorNom,setErrorNom] = useState("");
    const [errorPostnom,setErrorPostnom] = useState("");
    const [errorPrenom,setErrorPrenom] = useState("");
    const [errorSexe,setErrorSexe] = useState("");
    const [errorIdCommune,SetErrorIdCommune] = useState("");
    const [errorIdQuartier,SetErrorIdQuartier] = useState("");
    const [errorAvenue,SetErrorAvenue] = useState("");
    const [errorNumParcelle,SetErrorNumParcelle] = useState("");
    const [errorLatitude,SetErrorLatitude] = useState("");
    const [errorLongitude,SetErrorLongitude] = useState("");
    const [errorIdZone,SetErrorIdZone] = useState("");
    const [errorTypeClient,SetErrorTypeClient] = useState("");
    const [errorIntervalCollecte,SetErrorIntervalCollecte] = useState("");

    const [isSuccess,setIsSuccess] = useState(false);
    const [isError,setIsError] = useState(false);
    const [responseMessage,setResponseMessage] = useState("");
    const [btnText,setBtnText] = useState("Enregistrer");

    const closeAlert = async (event) =>{
        event.preventDefault();
        setIsSuccess(false);
        setIsError(false);
    }

    useEffect(()=>{
      
        const token = "Bearer "+localStorage.getItem('token');
        
        axios({
          method:"get",
          url:'http://localhost:8500/zone/',
          responseType: 'json',
          headers: {
              'Authorization': token,
              'Content-type': "application/json"
          }
          })
          .then(function (response) {
              const data = response.data;

              if(data.success == true){
                  setZones(data.data);
              }
          })
          .catch(function (error){});
      });

    const onSubForm = async (event) =>{
        event.preventDefault();
		
		if(!typeClient){
            SetErrorTypeClient("Type client invalide");
          return;
        }else{
            SetErrorTypeClient("");
        }
		
		if(!intervalCollecte){
            SetErrorIntervalCollecte("Interval de collecte invalide");
          return;
        }else{
            SetErrorIntervalCollecte("");
        }
		
		if(typeClient == "MENAGE"){			
			if(!nom){
				setErrorNom("Nom invalide");
			  return;
			}else{
				setErrorNom("");
			}
			
			if(!postnom){
				setErrorPostnom("Postnom invalide");
			  return;
			}else{
				setErrorPostnom("");
			}
			
			if(!prenom){
				setErrorPrenom("Prenom invalide");
			  return;
			}else{
				setErrorPrenom("");
			}

			if(!sexe){
				setErrorSexe("Sexe invalide");
			  return;
			}else{
				setErrorSexe("");
			}
		
		}
        
        if(!idCommune){
            SetErrorIdCommune("Commune invalide");
          return;
        }else{
            SetErrorIdCommune("");
        }
        
        if(!idQuartier){
            SetErrorIdQuartier("Quartier invalide");
          return;
        }else{
            SetErrorIdQuartier("");
        }
        
        if(!avenue){
            SetErrorAvenue("Avenue invalide");
          return;
        }else{
            SetErrorAvenue("");
        }
        
        if(!numParcelle){
            SetErrorNumParcelle("Numéro parcelle invalide");
          return;
        }else{
            SetErrorNumParcelle("");
        }
        
        if(!latitude){
            SetErrorLatitude("Latitude invalide");
          return;
        }else{
            SetErrorLatitude("");
        }
        
        if(!longitude){
            SetErrorLongitude("Longitude invalide");
          return;
        }else{
            SetErrorLongitude("");
        }
        
        if(!idZone){
            SetErrorIdZone("Zone invalide");
          return;
        }else{
            SetErrorIdZone("");
        }
		

        setIsLoaded(true);
        setIsError(false);
        setIsSuccess(false);
        setResponseMessage("");
        setBtnText("Chargement...");
        
        const token = "Bearer "+localStorage.getItem('token');
        
        axios({
        method:"post",
        url:'http://localhost:8500/client/store',
        responseType: 'json',
        data:{
            nom,
            postnom,
            prenom,
            sexe,
            id_commune:idCommune,
            id_quartier:idQuartier,
            avenue:avenue,
            num_parcelle:numParcelle,
            coord_longitude:(longitude).toString(),
            coord_latitude:(latitude).toString(),
            id_zone:idZone,
			type_client:typeClient,
			interval_collecte:intervalCollecte
        },
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        })
        .then(function (response) {
  
            const data = response.data;
  
            if(data.success === true){
                setNom("");
                setPostnom("");
                setPrenom("");
                setSexe("");
                setIdCommune("");
                setIdQuartier("");
                SetAvenue("");
                SetNumParcelle("");
                SetLatitude("");
                SetLongitude("");
                SetIdZone("");
				SetTypeClient("");
				SetIntervalCollecte("");
                
                setIsError(false);
                setIsSuccess(true);
                setResponseMessage(data.message);
                setBtnText('Enregistrer');
            }else{
                setIsSuccess(false);
                setIsError(true);
                setResponseMessage(data.message);
                setIsLoaded(false);
                setBtnText("Enregistrer");
            }
        })
        .catch(function (error) {
            setIsError(true);
            setResponseMessage("Erreur survenue lors de l'opération");
            setIsLoaded(false);
            setBtnText("Enregistrer");
        });
      }
      
      function formatAccountid(id){
        return id.toString().padStart(4,"0");
      }

    return (
        <>

            <div className="pd-ltr-20 xs-pd-20-10">
            {isError == true &&   
                  <div className="alert alert-danger" >
                    <p>{responseMessage}</p>
                    <span className="close" style={{cursor:"pointer","margin-top":"-35px"}} onClick={closeAlert}>
                      <span aria-hidden="true">&times;</span>
                    </span>
                  </div>
              }
              {isSuccess == true &&   
                  <div className="alert alert-success" >
                    <p>{responseMessage}</p>
                    <span className="close" style={{cursor:"pointer","margin-top":"-35px"}} onClick={closeAlert}>
                      <span aria-hidden="true">&times;</span>
                    </span>
                  </div>
              }
        <div class="pd-20 card-box mb-30">
              <div class="clearfix">
                <div class="pull-left">
                  <h4 class="h4">Nouveau Client (Lieu public ou ménage) </h4>
                </div>
              </div>
              <form>
			     <div class="row">
				  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label>Type client</label>
                      <select class="form-control" value={typeClient} onChange={(e) => SetTypeClient(e.target.value)}>
                            <option value="">Choisir</option>
                                <option value="MENAGE">Ménage</option>
								<option value="LIEU_PUBLIC">Lieu public</option>
                       </select>
                    </div>
                    <p style={{color:"red"}}>{errorTypeClient}</p>
                  </div>
				    <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label>Interval de collecte</label>
                      <input type="text" class="form-control" value={intervalCollecte} onChange={(e) => SetIntervalCollecte(e.target.value)} placeholder="entrer interval de collecte"/>
                    </div>
                    <p style={{color:"red"}}>{errorIntervalCollecte}</p>
                  </div>
                </div>        
				{typeClient == "MENAGE" &&  
					<div class="row">
					  <div class="col-md-6 col-sm-12">
						<div class="form-group">
						  <label>Nom</label>
						  <input type="text" class="form-control" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="entrer nom"/>
						</div>
						<p style={{color:"red"}}>{errorNom}</p>
					  </div>
					  <div class="col-md-6 col-sm-12">
						<div class="form-group">
						  <label>Post-nom</label>
						  <input type="text" class="form-control" value={postnom} onChange={(e) => setPostnom(e.target.value)} placeholder="entrer post-nom"/>
						</div>
						<p style={{color:"red"}}>{errorPostnom}</p>
					  </div>
					</div>	
				}
				{typeClient == "MENAGE" &&  
                <div class="row">
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label>Prenom</label>
                      <input type="text" class="form-control" value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="entrer prenom"/>
                    </div>
                    <p style={{color:"red"}}>{errorPrenom}</p>
                  </div> 
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label>Sexe</label>
                      <select class="form-control" value={sexe} onChange={(e) => setSexe(e.target.value)}>
                                <option value="">Choisir</option>
                                <option value="M">M</option>
                                <option value="F">F</option>
                       </select>
                    </div>
                    <p style={{color:"red"}}>{errorSexe}</p>
                  </div>
                </div>	
				}
                <div class="row">
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label>Commune</label>
                      <select class="form-control" value={idCommune} onChange={(e) => setIdCommune(e.target.value)}>
                                <option value="">Choisir</option>
                                <option value="1">Test 1</option>
                       </select>
                    </div>
                    <p style={{color:"red"}}>{errorIdCommune}</p>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label>Quartier</label>
                      <select class="form-control" value={idQuartier} onChange={(e) => setIdQuartier(e.target.value)}>
                                <option value="">Choisir</option>
                                <option value="1">Quaritier 1</option>
                                <option value="2">Quaritier 2</option>
                                <option value="3">Quaritier 2</option>
                       </select>
                    </div>
                    <p style={{color:"red"}}>{errorIdQuartier}</p>
                  </div>
                </div>	
                <div class="row">
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label>Avenue</label>
                      <input type="text" class="form-control" value={avenue} onChange={(e) => SetAvenue(e.target.value)} placeholder="entrer avenue"/>
                    </div>
                    <p style={{color:"red"}}>{errorAvenue}</p>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label>N° parcelle</label>
                      <input type="text" class="form-control" value={numParcelle} onChange={(e) => SetNumParcelle(e.target.value)} placeholder="entrer n° parcelle"/>
                    </div>
                    <p style={{color:"red"}}>{errorNumParcelle}</p>
                  </div>
                </div>	
                <div class="row">
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label>Latitude</label>
                      <input type="text" class="form-control" value={latitude} onChange={(e) => SetLatitude(e.target.value)} placeholder="entrer latitude"/>
                    </div>
                    <p style={{color:"red"}}>{errorLatitude}</p>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label>Longitude</label>
                      <input type="text" class="form-control" value={longitude} onChange={(e) => SetLongitude(e.target.value)} placeholder="entrer longitude"/>
                    </div>
                    <p style={{color:"red"}}>{errorLongitude}</p>
                  </div>
                </div>
                <div class="row">
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label>Zone</label>
                      <select class="form-control" value={idZone} onChange={(e) => SetIdZone(e.target.value)}>
                            <option value="">Choisir</option>
                            {zones.map((zone) => 
                                <option value={zone.id}>{formatAccountid(zone.id)}-{zone.nom}</option>
                            )} 
                       </select>
                    </div>
                    <p style={{color:"red"}}>{errorIdZone}</p>
                  </div>
                </div>        
                
              </form>
              <div class="clearfix">
              
                <div class="pull-left">
                <button class="btn btn-primary" onClick={onSubForm}>{btnText}</button>
                </div>
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

  export default CreateClient;