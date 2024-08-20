import { useEffect,useState } from "react";
import axios from 'axios';
import '../../Preloader.css';

function CreateZone() {
    const [zone, setZone] = useState("");
    const [zoneError, setZoneError] = useState("");
    const [isLoaded,setIsLoaded] = useState(false);
    const [isSuccess,setIsSuccess] = useState(false);
    const [isError,setIsError] = useState(false);
    const [responseMessage,setResponseMessage] = useState("");
    const [btnText,setBtnText] = useState("Enregistrer");

    const closeAlert = async (event) =>{
      event.preventDefault();
      setIsSuccess(false);
      setIsError(false);
    }
    
    const isValidEmail = (email) =>{
      const isValide = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      return isValide;
    }

    const onSubForm = async (event) =>{
      event.preventDefault();

      if(!zone){
        setZoneError("Zone invalide");
        return;
      }else{
        setZoneError("");
     }
    
      setIsLoaded(true);
      setIsError(false);
      setIsSuccess(false);
      setResponseMessage("");
      setBtnText("Chargement...");

      const token = "Bearer "+localStorage.getItem('token');

      axios({
      method:"post",
      url:'http://localhost:8500/zone/store',
      responseType: 'json',
      data:{
          nom:zone,
          etat:"COUVERTE",
          coordonnees:"{long:'',lat:''}"
      },
      headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {

          const data = response.data;

          if(data.success === true){
            setZone("");
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
        <div class="pd-20 card-box mb-30" >
              <div class="clearfix">
                <div class="pull-left">
                  <h4 class="h4">Nouvelle Zone</h4>
                </div>
              </div>
              <form>
              <div class="row">
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <input type="text" class="form-control" value={zone} onChange={(e) => setZone(e.target.value)} placeholder="entrer nom"/>
                    </div>
                    <p style={{color:"red"}}>{zoneError}</p>
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

  export default CreateZone;