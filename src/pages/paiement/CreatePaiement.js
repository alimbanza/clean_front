import { useEffect,useState } from "react";
import QrReader from 'react-qr-scanner'
import axios from 'axios';
import '../../Preloader.css';

function CreatePaiement() {
    const [cursor, setCursor] = useState("not-allowed");
    const [isLoaded,setIsLoaded] = useState(false);
    const [isSuccess,setIsSuccess] = useState(false);
    const [isError,setIsError] = useState(false);
    const [responseMessage,setResponseMessage] = useState("");
    const [btnText,setBtnText] = useState("Confirmer paiement");
    const [data, setData] = useState(null);
    const [idClient, setIdClient] = useState("");
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [isCollected, setIsCollected] = useState(false);

    const closeAlert = async (event) =>{
        event.preventDefault();
        setIsSuccess(false);
        setIsError(false);
        setIsCollected(false);
    }

    const previewStyle = {
      height: 340,
      width: 200,
    }

    const scannZoneStyle = {
        width:"400px",
        height:"400px",
        "border":"10px solid red !important"
    }

    const onSubForm = async (event) =>{
      event.preventDefault();

      const date_  = (new Date()).toLocaleDateString().split('/');
      const year_  = (new Date()).getFullYear();
      const month_ = date_[1];

      let sendMonth = null;
      let sendYear = null;

      if(month == null){
         sendMonth = month_;
      }else{
        sendMonth = month;
      }
      
      if(year == null){
        sendYear = year_;
      }else{
        sendYear = year;
      }
  
      if(!idClient){
        setIsError(true);
        setIsSuccess(false);
        setResponseMessage("Aun client sélectionné 2");
        return;
      }else{
        setIsError(false);
        setIsSuccess(false);
        setResponseMessage("");
      }

      if(!idClient){
        setIsError(true);
        setIsSuccess(false);
        setResponseMessage("Aun client sélectionné 2");
        return;
      }else{
        setIsError(false);
        setIsSuccess(false);
        setResponseMessage("");
    }

      setIsError(false);
      setIsSuccess(false);
      setResponseMessage("");
      setBtnText("Chargement...");

      const token = "Bearer "+localStorage.getItem('token');
    
      axios({
      method:"post",
      url:'http://localhost:8500/paiement/store',
      responseType: 'json',
      data:{
          id_menage:parseInt(idClient),
          month:sendMonth,
          year:sendYear
      },
      headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      })
      .then(function (response){

          const dataResponse = response.data;
          console.log(data);

          if(dataResponse.success === true){
            setIdClient("");
            setYear(null);
            setMonth(null);
            setIsError(false);
            setIsSuccess(true);
            setResponseMessage(dataResponse.message);
            setBtnText('Confirmer paiement');
            setCursor("not-allowed");
            setIsCollected(true);
          }else{
            setIsSuccess(false);
            setIsError(true);
            setResponseMessage(dataResponse.message);
            setIsLoaded(false);
            setCursor("pointer");
            setIsCollected(true);
            setBtnText("Confirmer paiement");
          }
      })
      .catch(function (error) {
          setIsCollected(false);
          setIsError(true);
          setIsSuccess(false);
          setResponseMessage("Erreur survenue lors de l'opération");
          setIsLoaded(false);
          setBtnText("Confirmer paiement");
      });
    }

    useEffect(function(){
      if(data != null && isCollected == false){
        setIsError(false);
        setIsSuccess(true);
        setResponseMessage("Client sélectionné");
        setIdClient(data.text)
        setCursor("pointer")
      }else{
        if(idClient !=""){
          setCursor("pointer")
        }else{
          if(isCollected == false){
            setIsError(true);
            setIsSuccess(false);
            setResponseMessage("Aucun client sélectionné");
            setCursor("not-allowed");
          }
        }
      }
    });

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
                  <h4 class="h4" style={{display:'none'}}>Nouveau Paiement</h4>
                </div>
              </div>
              <form>
                <div class="row">
                  <div class="col-md-4 col-sm-12">
                  </div>
                  <div class="col-md-3 col-sm-12">
                    <div class="form-group text-center">
                      <h4 className="h4">
                        Veuillez scanner le code QR  de paiement<br/>
                         
                      </h4>
                      <br/>
                      <input type="text" class="form-control" placeholder="identifiant du client" value={idClient} onChange={(e) => setIdClient(e.target.value)} readOnly style={{background:"white",cursor:"not-allowed"}}/>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12">
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4 col-sm-12">
                  </div>
                  <div class="col-md-3 col-sm-12">
                  <span style={{border:"1px solid white",position:"absolute",left:'40px',width:"180px",height:"150px",top:"17px",borderRadius:"10px"}}></span>
                    <div class="form-group text-center">
                      <QrReader
                        delay={100}
                        style={previewStyle}
                        onError={(error) => console.log(error)}
                        onScan={(data) => setData(data)} 
                        />
                        <select class="form-control" style={{borderRadius:"50px"}} value={month} onChange={(e) => setMonth(e.target.value)}>
                                <option value="">Choisir le mois</option>
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                            <br/>
                            <select class="form-control" style={{borderRadius:"50px"}} value={year} onChange={(e) => setYear(e.target.value)}>
                                <option value="">Choisir l'année</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                            </select>
                            <br/>
                            <button class="btn btn-primary" style={{cursor:cursor,"z-index":"1000"}} onClick={onSubForm}>{btnText}</button>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12">
                  </div>
                </div>	
              </form>
              <div class="clearfix">
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

  export default CreatePaiement;