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

function GetTransfert() {
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
  
  const filterTransferts = (event) =>{
    event.preventDefault();

    setCloseModal(true);
    setManuelFilter(true);
    setTransferts([]);
    setManuelFilterTransferts([]);
    if(!month || !year){
      return;
    }

    const data = {
      year:parseInt(year),
      month:parseInt(month)
    };

    const token = "Bearer "+localStorage.getItem('token');

    axios({
      method:"post",
      url:'http://localhost:1234/api/v1/transfert/byperiode',
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
           console.log(data,'-----------------');
          if(data.success == true){
              //setTransferts(data.data);
              setManuelFilterTransferts(data.data);
          }else{
            setErrorMessage(data.message);
            setError(true);
          }
      })
      .catch(function (error) {
          //setManuelFilterTransferts([]);
          //setTransferts([]);
          //setManuelFilter(true);
          setIsLoaded(false);
          console.log(error);
          if(error.code == "ERR_NETWORK"){
              setErrorMessage("Veuillez vérifier votre connexion à internet");
              setError(true);
          }else{
           
            setErrorMessage("Veuillez vérifier votre connexion à internet");
            setError(true);
          }
      });
  };

  const openExpediteurModal =  (event) =>{
    event.preventDefault();
    
    const idTransfert = event.target.getAttribute('data-idtransfert');

    if(!idTransfert){
      return;
    }

    setCloseModal(false);
    setIsLoadedMember(true);
    
    const token = "Bearer "+localStorage.getItem('token');

    const data = {
        transfert_id:parseInt(idTransfert)
    };
    console.log(data)
    axios({
      method:"post",
      url:'http://localhost:1234/api/v1/transfert/expediteur',
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
              setMember(data.data.membre);
              setCompte(data.data.compte);
              setIsLoadedMember(false);
              setIdTransfert(idTransfert);
              SetypeTransfert('Expéditeur')
          }else{
            setErrorMessage(data.message);
            setError(true);
          }
      })
      .catch(function (error) {
          //setManuelFilterTransferts([]);
          //setTransferts([]);
          setIsLoaded(false);
          console.log(error);
          if(error.code == "ERR_NETWORK"){
              setErrorMessage("Veuillez vérifier votre connexion à internet");
              setError(true);
          }else{
           
            setErrorMessage("Veuillez vérifier votre connexion à internet");
            setError(true);
          }
      });

  };
  
  const openRecipiendaireModal =  (event) =>{
    event.preventDefault();
    
    const idTransfert = event.target.getAttribute('data-idtransfert');

    if(!idTransfert){
      return;
    }

    setCloseModal(false);
    setIsLoadedMember(true);
    
    const token = "Bearer "+localStorage.getItem('token');

    const data = {
        transfert_id:parseInt(idTransfert)
    };
    console.log(data)
    axios({
      method:"post",
      url:'http://localhost:1234/api/v1/transfert/expediteur',
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
              setMember(data.data.membre);
              setCompte(data.data.compte);
              setIsLoadedMember(false);
              setIdTransfert(idTransfert);
              SetypeTransfert('Récipiendaire')
          }else{
            setErrorMessage(data.message);
            setError(true);
          }
      })
      .catch(function (error) {
         // setIsLoaded(true);
          //setManuelFilterTransferts([]);
          //setTransferts([]);
          setIsLoaded(false);
          console.log(error);
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
      url:'http://localhost:1234/api/v1/transfert/byperiode',
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

  function formatAccountid(agenceId,accountId){
    let idAgenc = agenceId.toString().padStart(4,"0");
    let cmptId = accountId.toString().padStart(4,"0");
    
    return idAgenc+'-'+cmptId;
  }

  return (
   <>
    <h3 className="h3 mb-2 text-gray-800">Transferts éffectués</h3>
        <div className="card shadow mb-4">
          <div className="card-header py-3" style={{"border-top":"2px solid #ff6600"}}>
                <h6 className="m-0 font-weight-bold text-primary"></h6>
            </div>
            <div className="card-body">
            <div className="row">       
                    <div className="col-md-3"> 
                         <select className="form-control" onChange={(e) => setMonth(e.target.value)}>
                            <option value="01" selected>Janvier</option>
                            <option value="02">Février</option>
                            <option value="03">Mars</option>
                            <option value="04">Avril</option>
                            <option value="05">Mais</option>
                            <option value="06">Juin</option>
                            <option value="07">Juillet</option>
                            <option value="08">Août</option>
                            <option value="09">Septembre</option>
                            <option value="10">Octobre</option>
                            <option value="11">Novembre</option>
                            <option value="12">Decembre</option>
                         </select>      
                    </div>     
                    <div className="col-md-3"> 
                    <select className="form-control" onChange={(e) => setYear(e.target.value)}>
                            <option value="2024" selected>2024</option>
                            <option value="2025">2025</option>
                            <option value="2026" >2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                            <option value="2031">2031</option>
                            <option value="2032">2032</option>
                            <option value="2033">2033</option>
                            <option value="2034">2034</option>
                            <option value="2035">2035</option>
                         </select>           
                    </div>   
                    <div className="col-md-2"> 
                          <button className="btn btn-default" onClick={filterTransferts} style={{background:"#ff6600", color:"#fff"}}>
                              <span>Filtrer &nbsp;<i class="fa fa-filter"></i></span>   
                          </button>        
                    </div>    
                </div> 
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
                          <th>Réf.opération</th>
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
                                    <td>{transfert.ref_operation}</td>
                                    <td>{formatAccountid(transfert.compte_money.id_agence,getEmoneyCompteId(transfert))}</td>
                                    <td>{getEmoneyTypeCompte(transfert)}</td>
                                    <td>{transfert.devise}</td>
                                    <td>{formatedAmount(transfert.montant_envoye)}</td>
                                    <td>{formatedAmount(transfert.pourc_preleve)}</td>
                                    <td>
                                      <a className="btn btn-default" data-idtransfert={transfert.id} onClick={openExpediteurModal} style={{background:"#ff6600", color:"#fff"}}>Voir Exp. <i class="fa fa-eye"></i></a>
                                        &nbsp;&nbsp;&nbsp;
                                        <br/>
                                        <br/>
                                      <a className="btn btn-default" data-idtransfert={transfert.id} onClick={openRecipiendaireModal} style={{background:"#8d8b8c", color:"#fff"}}>Voir Récip.<i class="fa fa-eye"></i></a>
                                      </td>
                                  </tr>
                              )} 
                        </tbody>
                      }
                    </>
                  }

                  {manuelFilter == true &&
                    <>
                      {isLoaded == false   &&
                        <tbody>
                              {manuelFilterTransferts.map((transfert) => 
                                  <tr>
                                    <td>{formatedDate(transfert.createdAt)}</td>
                                    <td>{transfert.ref_operation}</td>
                                    <td>{formatAccountid(transfert.compte_money.id_agence,getEmoneyCompteId(transfert))}</td>
                                    <td>{getEmoneyTypeCompte(transfert)}</td>
                                    <td>{transfert.devise}</td>
                                    <td>{formatedAmount(transfert.montant_envoye)}</td>
                                    <td>{formatedAmount(transfert.pourc_preleve)}</td>
                                    <td>
                                      <a className="btn btn-primary" data-idtransfert={transfert.id} onClick={openExpediteurModal} style={{background:"#ff6600", color:"#fff"}}>Voir Exp.</a>
                                        &nbsp;&nbsp;&nbsp;
                                        <br/>
                                      <a className="btn btn-success" data-idtransfert={transfert.id} onClick={openRecipiendaireModal} style={{background:"#8d8b8c", color:"#fff"}}>Voir Récip.</a>
                                      </td>
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
                  <h5 className="modal-title">{typeTransfert}&nbsp;&nbsp;</h5>
                    <span aria-hidden="true" style={{color:"red",cursor:"pointer"}} onClick={closeMemberModal}>X</span>
                </div>
                <div className="modal-body">
               
                  {isLoadedMember == false &&
                     <>
                    <p>ID. Transfert:<strong>{idTransfert}</strong></p> 
                    <p>Nom: <strong>{member.nom}</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <p>Post-nom: <strong>{member.post_nom}</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <p>Prenom: <strong>{member.prenom}</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <p>Sexe: <strong>{member.sexe}</strong></p>
                    </>
                  }

                  {isLoadedMember == true &&
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
  
export default GetTransfert;