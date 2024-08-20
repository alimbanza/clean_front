import { useEffect,useState } from "react";
import axios from 'axios';
import '../../Preloader.css';

function CreateTransfert() {
   
  const desabledFieldStyle = {
    background:"red !important"
  }

  const [id, setId] = useState("");
  const [expediteurMemberId, setExpediteurMemberId] = useState("");
  const [recipiendaireMemberId, setRecipiendaireMemberId] = useState("");
  const [montantEnvoye,setMontantEnvoye] = useState("");
  const [codePine,setCodePine] = useState("");
  const [devise, setDevise] = useState("");
  const [typeCompte, setTypeCompte] = useState("");
  const [nomsExpediteur, setNomsExpediteur] = useState("");
  const [nomsRecipiendaire, setNomsRecipiendaire] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [compteExpediteur, setCompteExpediteur] = useState([]);
  const [compteRecipiendaire, setCompteRecipiendaire] = useState([]);
  const [membreExpediteur, setMembreExpediteur] = useState([]);
  const [membreRecipiendaire, setMembreRecipiendaire] = useState([]);
  const [idCompteExpediteur, setIdCompteExpediteur] = useState("");
  const [idCompteRecipiendaire, setIdCompteRecipiendaire] = useState("");
  const [isSelectedExpediteur, setIsSelectedExpediteur] = useState(false);
  const [isSelectedRecipiendaire, setIsSelectedRecipiendaire] = useState(false);
  const [selectdMemberAccount, setSelectdMemberAccount] = useState("");
  const [showExpediteurSearch, setShowExpediteurSearch] = useState(false);
  const [showRecipiendaireSearch,setShowRecipiendaireSearch] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const closeAlert = async (event) =>{
    event.preventDefault();
    setSuccess(false);
    setError(false);
  }
  
  const getExpediteurAccount = async (event) =>{
      event.preventDefault();

      if(!expediteurMemberId){
        return;
      }
      
      setIsSelectedExpediteur(false);
      setIsSelectedRecipiendaire(false);
      setShowExpediteurSearch(true)
      setShowRecipiendaireSearch(false)

      const token = "Bearer "+localStorage.getItem('token');
      
      setIsLoaded(true);
      
      axios({
        method:"POST",
        url:'https://agent-terrain.loanmeapp.com/api/v1/compte',
        responseType: 'json',
        data:{
          member_id:expediteurMemberId
        },
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
              setMembreExpediteur(data.member);
              setCompteExpediteur(data.comptes);
            }else{
              setShowExpediteurSearch(false)
              setErrorMessage(data.message);
              setError(true);
            }
        })
        .catch(function (error) {
          setIsLoaded(false);
          setShowExpediteurSearch(false)
          console.log(error);
          if(error.code == "ERR_NETWORK"){
              setErrorMessage("Veuillez vérifier votre connexion à internet");
              setError(true);
          }else{
           
            setErrorMessage("Veuillez vérifier votre connexion à internet");
            setError(true);
          }
        }); 
  }

  const getRecipiendaireAccount = async (event) =>{
    event.preventDefault();

    if(!recipiendaireMemberId){
      return;
    }
    
    setIsSelectedExpediteur(false);
    setIsSelectedRecipiendaire(false);

    setShowExpediteurSearch(false)
    setShowRecipiendaireSearch(true)

    const token = "Bearer "+localStorage.getItem('token');
    
    setIsLoaded(true);
    
    axios({
      method:"POST",
      url:'https://agent-terrain.loanmeapp.com/api/v1/compte',
      responseType: 'json',
      data:{
        member_id:recipiendaireMemberId
      },
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
            setMembreRecipiendaire(data.member);
            setCompteRecipiendaire(data.comptes);
          }else{
            setShowRecipiendaireSearch(false)
            setErrorMessage(data.message);
            setError(true);
          }
      })
      .catch(function (error) {
        setIsLoaded(false);
        setShowRecipiendaireSearch(false)
        console.log(error);
        if(error.code == "ERR_NETWORK"){
            setErrorMessage("Veuillez vérifier votre connexion à internet");
            setError(true);
        }else{
         
          setErrorMessage("Veuillez vérifier votre connexion à internet");
          setError(true);
        }
      }); 
  }

  const selectExpediteurAccount = async (event) =>{
    const id = event.target.getAttribute('data-id');
    const devise = event.target.getAttribute('data-devise');
    const type_compte = event.target.getAttribute('data-typecompte');

    setIdCompteExpediteur(id);
    setDevise(devise);
    setTypeCompte(type_compte);
    setNomsExpediteur(membreExpediteur.nom)

    setIsSelectedExpediteur(true);
    setIsSelectedRecipiendaire(false);
    
  }
  
  const selectRecipiendaireAccount = async (event) =>{
    const idRecipiendaire = event.target.getAttribute('data-id');
    const deviseRecipiendaire = event.target.getAttribute('data-devise');
    const typeCompteRecipiendaire = event.target.getAttribute('data-typecompte');

    if((devise == deviseRecipiendaire && typeCompte == typeCompteRecipiendaire)){
      setIsSelectedExpediteur(false);
      setIsSelectedRecipiendaire(true);
      setIdCompteRecipiendaire(idRecipiendaire);
      setDevise(deviseRecipiendaire);
      setTypeCompte(typeCompteRecipiendaire);
      setNomsRecipiendaire(membreRecipiendaire.nom);
  
      return;
    }else{
      console.log('compte invalide')
    }
  }
    

  const addTransfert = async (event) =>{
    event.preventDefault();
   
    if(!idCompteExpediteur || !idCompteRecipiendaire || (devise != "USD" && devise != "CDF" )
      || (typeCompte != "Courant" && typeCompte != "Epargne"
      || !montantEnvoye || !codePine
      ) 
    ){
      return;
    }

    const data = {
      devise:devise,
      type_compte:typeCompte,
      montant_envoye:montantEnvoye,
      code_pine:codePine,
      fk_expediteur:idCompteExpediteur,
      fk_recipiendaire:idCompteRecipiendaire
    }

    const token = "Bearer "+localStorage.getItem('token');
    
    setIsLoaded(true);

    axios({
      method:"POST",
      url:'https://agent-terrain.loanmeapp.com/api/v1/transfert/',
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
            setIdCompteExpediteur("");
            setIdCompteRecipiendaire("");
            setDevise("");
            setTypeCompte("");
            setNomsExpediteur("");
            setNomsRecipiendaire("");
            setExpediteurMemberId("");
            setRecipiendaireMemberId("");
            setMontantEnvoye("");
            setCodePine("");
            setSuccess(true);
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
    }

    return (
      <>
       <h3 className="h3 mb-2 text-gray-800">Faire un transfert</h3>
      <div className="card shadow mb-4">
        <div className="card-header py-3" style={{"border-top":"2px solid #ff6600"}}>
              <h6 className="m-0 font-weight-bold text-primary"></h6>
             
          </div>
          <div className="card-body">
              {error == true &&   
                <div class="alert alert-danger" role="alert">
                   <strong>{errorMessage}</strong> 
                  <span className="close" style={{cursor:"pointer"}} onClick={closeAlert}>
                    <span aria-hidden="true">&times;</span>
                  </span>
                </div>
              }
              {success == true &&   
                <div class="alert alert-success" role="alert">
                   <strong>Transfert éffectué</strong> 
                  <span className="close" style={{cursor:"pointer"}} onClick={closeAlert}>
                    <span aria-hidden="true">&times;</span>
                  </span>
                </div>
              }
              <div className="row">
                <div className="form-group col-md-6">
                  <label for="exampleInputEmail1">Id. membre </label>
                  <div class="input-group mb-3">
                  <input type="text" className="form-control" placeholder="Entrer id membre" value={expediteurMemberId} onChange={(e) => setExpediteurMemberId(e.target.value)} aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                  <div className="input-group-append">
                    <button className="btn btn-default" type="button" onClick={getExpediteurAccount} style={{background:"#ff6600", color:"#fff"}}>Vérifier &nbsp;<i class="fa fa-check"></i></button>
                  </div>
                </div>
                {showExpediteurSearch == true &&
                  <>
                  {isSelectedExpediteur == false &&
                    <>
                      {isLoaded == false &&
                        <ul className="completionField">
                          {compteExpediteur.map((compteMembre) => 
                              <li onClick={selectExpediteurAccount} data-id={compteMembre.id} data-devise={compteMembre.devise} data-typecompte={compteMembre.type_compte}>{compteMembre.devise}-{compteMembre.type_compte}</li>
                          )}
                        </ul>
                      } 
                    </>
                    }
                  
                  {isLoaded == true &&
                      <p className="custom-loader" style={{"marginLeft":"40%","marginRight":"45%"}}></p>
                  }
                 </>
                }
                </div>
       
                <div className="form-group col-md-6">
                  <label for="exampleInputEmail1">Id. membre </label>
                  <div class="input-group mb-3">
                  <input type="text" className="form-control" placeholder="Entrer id membre" value={recipiendaireMemberId} onChange={(e) => setRecipiendaireMemberId(e.target.value)} aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                  <div className="input-group-append">
                    <button className="btn btn-default" type="button" onClick={getRecipiendaireAccount} style={{background:"#ff6600", color:"#fff"}}>Vérifier &nbsp;<i class="fa fa-check"></i></button>
                  </div>
                </div>
                  {showRecipiendaireSearch == true &&
                    <>
                      {isSelectedRecipiendaire == false &&
                        <>
                          {isLoaded == false &&
                            <ul className="completionField">
                              {compteRecipiendaire.map((compteMembre) => 
                                  <li onClick={selectRecipiendaireAccount} data-id={compteMembre.id} data-devise={compteMembre.devise} data-typecompte={compteMembre.type_compte}>{compteMembre.devise}-{compteMembre.type_compte}</li>
                              )}
                            </ul>
                          } 
                        </>
                        }
                      
                      {isLoaded == true &&
                          <p className="custom-loader" style={{"marginLeft":"40%","marginRight":"45%"}}></p>
                        }
                    </>
                  }
                </div>
              </div><hr/>
               <div className="row">
                 <div className="form-group col-md-6">
                  <label for="exampleInputEmail1">Noms expéditeur</label>
                  <input type="text" className="form-control desabledfield" value={nomsExpediteur} disabled/>
                </div>
                <div className="form-group col-md-6">
                  <label for="exampleInputEmail1">Noms béneficiaire </label>
                  <input type="text" className="form-control desabledfield" value={nomsRecipiendaire} disabled/>
                </div>
              </div><hr/>
              <div className="row">
              <div className="form-group col-md-6">
                  <label for="exampleInputEmail1">Type compte</label>
                  <input type="text" className="form-control desabledfield" value={typeCompte} disabled/>
                </div>
                <div className="form-group col-md-6">
                  <label for="exampleInputEmail1">Devise</label>
                  <input type="text" className="form-control desabledfield" value={devise} disabled/>
                </div>
              </div><hr/>
              <div className="row">
              <div className="form-group col-md-6">
                  <label for="exampleInputEmail1">Montant à transférer</label>
                  <input type="text" className="form-control" placeholder="Entrer montant" value={montantEnvoye} onChange={(e) => setMontantEnvoye(e.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                  <label for="exampleInputEmail1">Code pine</label>
                  <input type="text" className="form-control" placeholder="Entrer code pine" value={codePine} onChange={(e) => setCodePine(e.target.value)}/>
                </div>
              </div>      
              <div className="row">
                <div className="form-group col-md-6">
                  <label for="exampleInputEmail1"></label>
                  <input type="hidden" className="form-control" value={idCompteExpediteur} onChange={(e) => setIdCompteExpediteur(e.target.value)}/>
                  <input type="hidden" className="form-control" value={idCompteRecipiendaire} onChange={(e) => setIdCompteRecipiendaire(e.target.value)}/>
                </div>
              </div>    
              <div className="row">
                 <div className="form-group col-md-2">
                 <button className="btn btn-default" onClick={addTransfert} style={{background:"#ff6600",color:"#fff"}}>
                            <span>Effectuer &nbsp;<i class="fa fa-check"></i></span>   
                  </button>        
                </div>
              </div>
          </div>
      </div>
      <script src="/static/plugins/datatables/js/jquery.dataTables.min.js"></script>
			<script src="/static/plugins/datatables/js/dataTables.bootstrap4.min.js"></script>
			<script src="/static/plugins/datatables/js/dataTables.responsive.min.js"></script>
			<script src="/static/plugins/datatables/js/responsive.bootstrap4.min.js"></script>
			<script src="/static/scripts/datatable-setting.js"></script>
      </>
    );
  }
  
export default CreateTransfert;