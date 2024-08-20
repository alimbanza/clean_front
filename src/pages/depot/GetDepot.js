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

function GetDepot() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [depots, setDepots] = useState([]);
    const [closeModal, setCloseModal] = useState(true);
    const [isLoadedMember, setIsLoadedMember] = useState(true);
    const [member, setMember] = useState("");
    const [idDepot, setIdDepot] = useState("");
    const [month, setMonth] = useState("01");
    const [year, setYear] = useState("2024");
    const [manuelFilter, setManuelFilter] = useState(false);
    const [manuelFilterDepots, setManuelFilterDepots] = useState([]);
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
    
    const filterDepots = (event) =>{
      event.preventDefault();

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
        url:'https://agent-terrain.loanmeapp.com/api/v1/depot/byperiode',
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
                setManuelFilter(true);
                setManuelFilterDepots(data.data);
                setDepots([]);
            }else{
              setErrorMessage(data.message);
              setError(true);
            }
        })
        .catch(function (error) {
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

    const openMemberModal =  (event) =>{
      event.preventDefault();
      
      const idDepot = event.target.getAttribute('data-iddepot');

      if(!idDepot){
        return;
      }

      setCloseModal(false);
      setIsLoadedMember(true);
      
      const token = "Bearer "+localStorage.getItem('token');

      const data = {
          depot_id:idDepot
      };
      
      axios({
        method:"post",
        url:'https://agent-terrain.loanmeapp.com/api/v1/depot/member',
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
                setIdDepot(idDepot);
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
        method:"post",
        url:'https://agent-terrain.loanmeapp.com/api/v1/depot/byperiode',
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
                setDepots(data.data);
            }else{
              setErrorMessage(data.message);
              setError(true);
            }
        })
        .catch(function (error) {
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
    });

    function formatAccountid(agenceId,accountId){
      let idAgenc = agenceId.toString().padStart(4,"0");
      let cmptId = accountId.toString().padStart(4,"0");
      
      return idAgenc+'-'+cmptId;
    }
  
    return (
     <>
      <h3 className="h3 mb-2 text-gray-800">Depôts éffectués</h3>
          <div className="card shadow mb-4">
            <div className="card-header py-3" style={{"border-top":"2px solid #ff6600"}}>
                  <h6 className="m-0 font-weight-bold text-primary"></h6>
                  <div className="row">       
                      <div className="col-md-4"> 
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
                            <button className="btn btn-default" onClick={filterDepots} style={{background:" #ff6600",color:"#fff"}}>
                                <span>Filtrer &nbsp;<i class="fa fa-filter"></i></span>   
                            </button>        
                      </div>
                      <div className="col-md-2"> 
                            <button className="btn btn-default" onClick={filterDepots} style={{background:" #8d8b8c",color:"#fff"}}>
                                <span>Imprimer &nbsp;<i class="fa fa-print"></i></span>   
                            </button>        
                      </div>  
                  </div>
            </div>
              <div className="card-body"> 
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
              <br/> 
              <div className="table-responsive">
              <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Date création</th>
                            <th>Réf.opération</th>
                            <th>Id compte</th>
                            <th>Type compte</th>
                            <th>Devise</th>
                            <th>Montant deposé</th>
                            <th>Frais</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {manuelFilter == false &&
                      <>
                        {isLoaded == false   &&
                          <tbody>
                                {depots.map((depot) => 
                                    <tr>
                                      <td>{formatedDate(depot.createdAt)}</td>
                                      <td>{depot.ref_operation}</td>
                                      <td>{formatAccountid(depot.compte_money.id_agence,depot.compte_money.id)}</td>
                                      <td>{depot.compte_money.type_compte}</td>
                                      <td>{depot.devise}</td>
                                      <td>{formatedAmount(depot.montant_depose)}</td>
                                      <td>{formatedAmount(depot.pourc_preleve)}</td>
                                      <td><a className="btn btn-danger" data-iddepot={depot.id} onClick={openMemberModal} style={{background:"#ff6600", color:"#fff"}}>Voir Depositeur &nbsp;<i class="fa fa-eye"></i></a></td>
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
                                {manuelFilterDepots.map((depot) => 
                                    <tr>
                                      <td>{formatedDate(depot.createdAt)}</td>
                                      <td>{depot.ref_operation}</td>
                                      <td>{formatAccountid(depot.compte_money.id_agence,depot.compte_money.id)}</td>
                                      <td>{depot.compte_money.type_compte}</td>
                                      <td>{depot.devise}</td>
                                      <td>{formatedAmount(depot.montant_depose)}</td>
                                      <td>{formatedAmount(depot.pourc_preleve)}</td>
                                      <td><a className="btn btn-default" data-iddepot={depot.id} onClick={openMemberModal} style={{background:"#ff6600", color:"#fff"}}>Voir Depositeur &nbsp;<i class="fa fa-eye"></i></a></td>
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
                    <h5 className="modal-title">Depositeur&nbsp;&nbsp;</h5>
                      <span aria-hidden="true" style={{color:"red",cursor:"pointer"}} onClick={closeMemberModal}>X</span>
                  </div>
                  <div className="modal-body" style={{"boxShadow":"box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);", width:"500px !important", height:"500px !important"}}>
                 
                    {isLoadedMember == false &&
                       <>
                      <p>ID. Compte:<strong>{idDepot}</strong></p> 
                      <p>ID. depôt:<strong>{idDepot}</strong></p> 
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
  
export default GetDepot;