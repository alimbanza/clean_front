import { useEffect,useState } from "react";
import axios from 'axios';
import '../../Preloader.css';
import Modal from 'react-modal';
import { Helmet } from 'react-helmet';

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


function TransfertConfirmation() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [manuelFilter, setManuelFilter] = useState(false);
  const [manuelFilterTransferts, setManuelFilterTransferts] = useState([]);
  const [transferts, setTransferts] = useState([]);
  const [closeModal, setCloseModal] = useState(true);
  const [isLoadedMember, setIsLoadedMember] = useState(true);
  const [member, setMember] = useState("");
  const [idTransfert, setIdTransfert] = useState("");
  const [month, setMonth] = useState("01");
  const [year, setYear] = useState("2024"); 
  const [compte, setCompte] = useState([]); 
  const [typeTransfert, SetypeTransfert] = useState(""); 
  const [otp, setOtp] = useState(""); 
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
  
  const openMemberModal =  (event) =>{
    event.preventDefault();

    const idTransfert = event.target.getAttribute('data-idtransfert');

    if(!idTransfert){
      return;
    }

    setIdTransfert(idTransfert);

    setCloseModal(false);

  };

  
  const sendOtp = (event) =>{
    event.preventDefault();

    if(!otp || (otp).toString().length < 4 || (otp).toString().length > 4){
        return;
    }

    const data = {
        otp:parseInt(otp),
        transfert_id:idTransfert
    };
    
    const token = "Bearer "+localStorage.getItem('token');

    setIsLoaded(true);

    axios({
      method:"post",
      url:'https://agent-terrain.loanmeapp.com/api/v1/transfert/otp',
      responseType: 'json',
      data:data,
      headers: {
          'Authorization': token,
          'Content-type': "application/json"
      }
      })
      .then(function (response) {         
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
      method:"POST",
      url:'https://agent-terrain.loanmeapp.com/api/v1/transfert/confirmation',
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
              setTransferts(data.data);
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
  
  const getEmoneyTypeCompte = (transfert)=>{
    if(transfert.compte_money){
      return transfert.compte_money.type_compte
    }
  }

  const getEmoneyCompteId = (transfert)=>{
    if(transfert.compte_money){
      return transfert.compte_money.id
    }
  }

  return (
   <>
    <h3 className="h3 mb-2 text-gray-800">transfert en attente de confirmation </h3>
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
            <div className="table-responsive">
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                  <thead>
                      <tr>
                          <th>Date création</th>
                          <th>Id opération</th>
                          <th>Id compte exp.</th>
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
                              {transferts.map((transfert) => 
                                  <tr>
                                    <td>{formatedDate(transfert.createdAt)}</td>
                                    <td>{transfert.id}</td>
                                    <td>{getEmoneyCompteId(transfert)}</td>
                                    <td>{getEmoneyTypeCompte(transfert)}</td>
                                    <td>{transfert.devise}</td>
                                    <td>{formatedAmount(transfert.montant_envoye)}</td>
                                    <td>{formatedAmount(transfert.pourc_preleve)}</td>
                                    <td><a className="btn btn-default" data-idtransfert={transfert.id} onClick={openMemberModal} style={{background:"#ff6600", color:"#fff"}}>Confirmer &nbsp;<i class="fa fa-check"></i></a></td>
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
  
export default TransfertConfirmation;
