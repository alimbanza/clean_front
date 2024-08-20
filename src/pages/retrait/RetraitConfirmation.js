import { useEffect,useState } from "react";
import axios from 'axios';
import '../../Preloader.css';
import Modal from 'react-modal';

const customStyles = {
    position:"fixed",
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:"600px !imprtant"
};

function RetraitConfirmation() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [manuelFilter, setManuelFilter] = useState(false);
  const [manuelFilterRetraits, setManuelFilterRetraits] = useState([]);
  const [retraits, setRetraits] = useState([]);
  const [closeModal, setCloseModal] = useState(true);
  const [isLoadedMember, setIsLoadedMember] = useState(true);
  const [member, setMember] = useState("");
  const [idRetrait, setIdRetrait] = useState("");
  const [month, setMonth] = useState("01");
  const [year, setYear] = useState("2024"); 
  const [otp, setOtp] = useState(""); 
  const [retraitId, setRetraitId] = useState(""); 
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 

  const closeAlert = async (event) =>{
    event.preventDefault();
    setError(false);
  }

  const formatedDate = (date) =>{
      return (new Date(date)).toLocaleDateString()
  }; 
  
  const formatedAmount = (montant) =>{
      return parseFloat(montant).toFixed(2)
  };

  const closeMemberModal = (event) =>{
    event.preventDefault();

    setCloseModal(true);
  }; 

  const sendOtp = (event) =>{
    event.preventDefault();

    if(!otp || (otp).toString().length < 4 || (otp).toString().length > 4){
        return;
    }

    const data = {
        otp:parseInt(otp),
        retrait_id:retraitId
    };
    console.log(data);
    const token = "Bearer "+localStorage.getItem('token');

    setIsLoaded(true);

    axios({
      method:"post",
      url:'https://agent-terrain.loanmeapp.com/api/v1/retrait/otp',
      responseType: 'json',
      data:data,
      headers: {
          'Authorization': token,
          'Content-type': "application/json"
      }
      })
      .then(function (response) {
          setIsLoaded(false);
          const data = response.data;

          if(data.success == true){
            setIsLoaded(false);
            setIsConfirmed(true);
            setCloseModal(true);
            console.log(response.data);
          }else{
            setErrorMessage(data.message);
            setError(true);
          }
      })
      .catch(function (error) {
          setIsLoaded(false);
         
          if(error.code == "ERR_NETWORK"){
              setErrorMessage("Veuillez vérifier votre connexion à internet");
              setError(true);
          }else{
           
            setErrorMessage("Veuillez vérifier votre connexion à internet");
            setError(true);
          }
      });
  }; 
  
  const filterRetraits = (event) =>{
    event.preventDefault();

    setRetraits([]);
    setManuelFilterRetraits([]);
    setManuelFilter(true);

    setCloseModal(true);

    if(!month || !year){
      return;
    }

    const data = {
      year:year,
      month:month
    };

    const token = "Bearer "+localStorage.getItem('token');

    axios({
      method:"post",
      url:'https://agent-terrain.loanmeapp.com/api/v1/retrait/byperiode',
      responseType: 'json',
      data:data,
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
              setManuelFilterRetraits(data.data);
              setRetraits([]);
          }else{
            setErrorMessage(data.message);
            setError(true);
          }
      })
      .catch(function (error) {
        setIsLoaded(false);
        
        if(error.code == "ERR_NETWORK"){
            setErrorMessage("Veuillez vérifier votre connexion à internet");
            setError(true);
        }else{
         
          setErrorMessage("Veuillez vérifier votre connexion à internet");
          setError(true);
        }
      });
  };

  const openMemberModal =  (event) =>{
    event.preventDefault();
    
    const idRetrait = event.target.getAttribute('data-idretrait');

    if(!idRetrait){
      return;
    }

    setCloseModal(false);
    setIsLoadedMember(true);
    
    const token = "Bearer "+localStorage.getItem('token');

    const data = {
        retrait_id:parseInt(idRetrait)
    };
    console.log(data)
    axios({
      method:"post",
      url:'https://agent-terrain.loanmeapp.com/api/v1/retrait/membre',
      responseType: 'json',
      data:data,
      headers: {
          'Authorization': token,
          'Content-type': "application/json"
      }
      })
      .then(function (response) {
          setIsLoaded(false);
          const data = response.data;
        
          if(data.success == true){
              setMember(data.data);
              setIsLoadedMember(false);
              setIdRetrait(idRetrait);
          }else{
            setErrorMessage(data.message);
            setError(true);
          }
      })
      .catch(function (error) {
          setIsLoaded(false);
          //setManuelFilterRetraits([]);
          //setRetraits([]);
          
          if(error.code == "ERR_NETWORK"){
              setErrorMessage("Veuillez vérifier votre connexion à internet");
              setError(true);
          }else{
           
            setErrorMessage("Veuillez vérifier votre connexion à internet");
            setError(true);
          }
      });

  };

  useEffect(()=>{
    
    const date = (new Date()).toLocaleDateString().split('/');
    const year = (new Date()).getFullYear();
    const month = date[1];
    
    const data = {
      year:year,
      month:month
    };

    const token = "Bearer "+localStorage.getItem('token');

    axios({
      method:"post",
      url:'https://agent-terrain.loanmeapp.com/api/v1/retrait/confirmation',
      responseType: 'json',
      data:data,
      headers: {
          'Authorization': token,
          'Content-type': "application/json"
      }
      })
      .then(function (response) {
          setIsLoaded(false);
          const data = response.data;
  
          if(data.success == true){
              const id = data.data[0].id;
              setRetraitId(id);
              setRetraits(data.data);
          }else{
            setErrorMessage(data.message);
            setError(true);
          }
      })
      .catch(function (error) {
          setIsLoaded(false);

          if(error.code == "ERR_NETWORK"){
              setErrorMessage("Veuillez vérifier votre connexion à internet");
              setError(true);
          }else{
           
            setErrorMessage("Veuillez vérifier votre connexion à internet");
            setError(true);
          }
      });
  });

  return (
   <>
    <h3 className="h3 mb-2 text-gray-800">Retrait en attente de confirmation</h3>
        <div className="card shadow mb-4">
            <div className="card-body" style={{"border-top":"2px solid #ff6600"}}>
                <br/> 
                <br/> 
                {error == true &&   
                  <div class="alert alert-danger" role="alert">
                    <strong>{errorMessage}</strong> 
                    <span className="close" data-dismiss="alert" aria-label="Close" style={{cursor:"pointer"}} onClick={closeAlert}>
                      <span aria-hidden="true">&times;</span>
                    </span>
                  </div>
                }
            {isConfirmed == true   &&
                <div className="alert alert-success">
                    Retrait confirmé
                </div>
            }
            <div className="table-responsive">
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                  <thead>
                      <tr>
                          <th>Date création</th>
                          <th>Id opération</th>
                          <th>Id compte</th>
                          <th>Type compte</th>
                          <th>Devise</th>
                          <th>Montant rétiré</th>
                          <th>Frais</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  {manuelFilter == false &&
                    <>
                      {isLoaded == false   &&
                        <tbody>
                              {retraits.map((retrait) => 
                                  <tr>
                                    <td>{formatedDate(retrait.createdAt)}</td>
                                    <td>{retrait.id}</td>
                                    <td>{retrait.compte_money.id}</td>
                                    <td>{retrait.compte_money.type_compte}</td>
                                    <td>{retrait.devise}</td>
                                    <td>{formatedAmount(retrait.montant_retire)}</td>
                                    <td>{formatedAmount(retrait.pourc_preleve)}</td>
                                    <td><a className="btn btn-default" data-idretrait={retrait.id} onClick={openMemberModal} style={{background:"#ff6600", color:"#fff"}}>Confirmer &nbsp;<i class="fa fa-check"></i></a></td>
                                  </tr>
                              )} 
                        </tbody>
                      }
                    </>
                  }
              </table>
            </div>
            </div>
        </div>
        {closeModal == false &&
          <div className="modal-bloc" tabindex="-1" role="dialog" style={customStyles}>
            <div className="modal-dialog" role="document"  >
              <div className="modal-content" >
                <div className="modal-header">
                  <h5 className="modal-title">Confirmation&nbsp;&nbsp;</h5>
                    <span aria-hidden="true" style={{color:"red",cursor:"pointer"}} onClick={closeMemberModal}>X</span>
                </div>
                <div className="modal-body">
                  {isLoaded == false &&
                     <>
                      <div className="form-group">
                        <input type="text" className="form-control" value={otp} onChange={(e) => setOtp(e.target.value)}  placeholder=""/> 
                      </div>
                      <div className="form-group">
                        <input type="button" className="btn" value="Confirmer retrait" onClick={sendOtp} style={{background:"#ff6600", color:"#fff"}}/> 
                      </div>
                    </>
                  }

                  {isLoaded == true &&
                    <p className="custom-loader" style={{"marginLeft":"40%","marginRight":"45%"}}></p>
                  }
                </div>
              </div>
            </div>
          </div>  
        }   
        </>
  );
  }
  
export default RetraitConfirmation;