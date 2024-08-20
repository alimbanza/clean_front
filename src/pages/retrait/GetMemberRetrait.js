import { useEffect,useState } from "react";
import axios from 'axios';
import '../../Preloader.css';
import Modal from 'react-modal';
import { Helmet } from 'react-helmet';

const customStyles = {
    position:"fixed",
    top: '35%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:"600px !imprtant"
};

function GetMemberRetrait() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadedCompte, setIsLoadedCompte] = useState(false);
  const [retraits, setRetraits] = useState([]);
  const [closeModal, setCloseModal] = useState(true);
  const [isLoadedMember, setIsLoadedMember] = useState(true);
  const [member, setMember] = useState("");
  const [idRetrait, setIdRetrait] = useState("");
  const [id, setId] = useState("");
  const [compteMembres, setCompteMembres] = useState([]);
  const [idCompte, setIdCompte] = useState("");
  const [devise, setDevise] = useState("");
  const [typeCompte, setTypeCompte] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [memberId, setMemberId] = useState("");
  const [month, setMonth] = useState("01");
  const [year, setYear] = useState("2024");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showCompletion,SetShowCompletion] = useState(false);

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
    
    const idRetrait = event.target.getAttribute('data-idretrait');

    if(!idRetrait){
      return;
    }

    setCloseModal(false);
    setIsLoadedMember(true);
    
    const token = "Bearer "+localStorage.getItem('token');

    const data = {
        retrait_id:idRetrait
    };
    
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
          console.log(data.data);
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
  
        if(error.code == "ERR_NETWORK"){
            setErrorMessage("Veuillez vérifier votre connexion à internet");
            setError(true);
        }else{
         
          setErrorMessage("Veuillez vérifier votre connexion à internet");
          setError(true);
        }
      });

  };

  const getMemberAccount = async (event) =>{
    event.preventDefault();

    if(!memberId){
      return;
    }
    
    setIsSelected(false);
    SetShowCompletion(true);
    const token = "Bearer "+localStorage.getItem('token');
    
    setIsLoadedCompte(true);
    
    axios({
      method:"POST",
      url:'https://agent-terrain.loanmeapp.com/api/v1/compte',
      responseType: 'json',
      data:{
        member_id:memberId
      },
      headers: {
          'Authorization': token,
          'Content-type': "application/json"
      }
      })
      .then(function (response) {
        setIsLoadedCompte(false);
          const data = response.data;
          console.log(data);
          if(data.success == true){
            SetShowCompletion(true);
            setCompteMembres(data.comptes);
          }else{
            SetShowCompletion(false);
            setErrorMessage(data.message);
            setError(true);
          }
      })
      .catch(function (error) {
        setIsLoadedCompte(false);
        SetShowCompletion(false);

        if(error.code == "ERR_NETWORK"){
            setErrorMessage("Veuillez vérifier votre connexion à internet");
            setError(true);
        }else{
         
          setErrorMessage("Veuillez vérifier votre connexion à internet");
          setError(true);
        }  
      }); 
  }

  const selectMemberAccount = async (event) =>{
      const id = event.target.getAttribute('data-id');
      const devise = event.target.getAttribute('data-devise');
      const type_compte = event.target.getAttribute('data-typecompte');

      if(!month || !year){
        return;
      }

      SetShowCompletion(false);
      
      setIdCompte(id);
      setDevise(devise);
      setTypeCompte(type_compte);
      setIsSelected(true);

      const data = {
        compte_id:id,
        devise:devise,
        month:month,
        year:year
      }

      const token = "Bearer "+localStorage.getItem('token');
      
      setRetraits([]);
        
        axios({
          method:"post",
          url:'https://agent-terrain.loanmeapp.com/api/v1/retrait/formember',
          responseType: 'json',
          data:data,
          headers: {
              'Authorization': token,
              'Content-type': "application/json"
          }
          })
          .then(function (response) {        
              const data = response.data;
           
              if(data.success == true){
                  setRetraits(data.data);
                  console.log(data);
              }else{
                  setErrorMessage(data.message);
                  setError(true);
              }
          })
          .catch(function (error) {
            if(error.code == "ERR_NETWORK"){
                setErrorMessage("Veuillez vérifier votre connexion à internet");
                setError(true);
            }else{
             
              setErrorMessage("Veuillez vérifier votre connexion à internet");
              setError(true);
            }
          });
    }

  return (
   <>
    <h3 className="h3 mb-2 text-gray-800">Retraits éffectués par un membre</h3>
        <div className="card shadow mb-4">
          <div className="card-header py-3" style={{"border-top":"2px solid #ff6600"}}>
                <h6 className="m-0 font-weight-bold text-primary"></h6>
                <div className="row">
            <div className="col-md-3" style={{display:"inline !important;"}}> 
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
                      <div className="col-md-3" style={{display:"inline !important;"}}> 
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
                      <div className="col-md-4" style={{display:"inline !important;"}}> 
                        <div class="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Entrer id membre" value={memberId} onChange={(e) => setMemberId(e.target.value)} aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                        <div className="input-group-append">
                          <button className="btn btn-default" type="button" onClick={getMemberAccount} style={{background:"#ff6600", color:"#fff"}}>Vérifier &nbsp;<i class="fa fa-check"></i></button>
                        </div>
                      </div>
                      
                      </div>       
                  </div> 
            </div>
            <div className="card-body">
         
            <div class="col-md-4">
            {showCompletion == true &&
                  <>
                  {isSelected == false &&
                        <>
                          {isLoadedCompte == false &&
                            <ul className="completionFieldTree">
                              {compteMembres.map((compteMembre) => 
                                  <li onClick={selectMemberAccount} data-id={compteMembre.id} data-devise={compteMembre.devise} data-typecompte={compteMembre.type_compte}>{compteMembre.devise}-{compteMembre.type_compte}</li>
                              )}
                            </ul>
                          } 
                        </>
                      }
                      </>
                  }
                      {isLoadedCompte == true &&
                        <p className="custom-loader" style={{"marginLeft":"40%","marginRight":"45%"}}></p>
                  }
            </div><br/>
            {error == true &&   
                <div class="alert alert-danger" role="alert">
                   <strong>{errorMessage}</strong> 
                  <span className="close" data-dismiss="alert" aria-label="Close" style={{cursor:"pointer"}} onClick={closeAlert}>
                    <span aria-hidden="true">&times;</span>
                  </span>
                </div>
              }
            <hr/><br/>
       
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
                                <td><a className="btn btn-default" data-idretrait={retrait.id} onClick={openMemberModal} style={{background:"#ff6600", color:"#fff"}}>Voir Depositeur &nbsp;<i class="fa fa-eye"></i></a></td>
                              </tr>
                          )} 
                    </tbody>
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
                  <h5 className="modal-title">Membre&nbsp;&nbsp;</h5>
                    <span aria-hidden="true" style={{color:"red",cursor:"pointer"}} onClick={closeMemberModal}>X</span>
                </div>
                <div className="modal-body">
               
                  {isLoadedMember == false &&
                     <>
                    <p>ID. depôt:<strong>{idRetrait}</strong></p> 
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
         <Helmet>
            <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
            <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
            <script src="/static/js/table.js"></script>
          </Helmet> 
        </>
  );
}
  
export default GetMemberRetrait;