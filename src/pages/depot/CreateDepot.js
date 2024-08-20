import { useEffect,useState } from "react";
import axios from 'axios';
import '../../Preloader.css';

function CreateDepot() {

  const desabledFieldStyle = {
    background:"red !important"
  }

  const [id, setId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [montantDepose,setMontantDepose] = useState("");
  const [codePine,setCodePine] = useState("");
  const [devise, setDevise] = useState("");
  const [typeCompte, setTypeCompte] = useState("");
  const [nom, setNom] = useState("");
  const [postnom, setPostnom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [compteMembres, setCompteMembres] = useState([]);
  const [membres, setMembres] = useState([]);
  const [idCompte, setIdCompte] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [selectdMemberAccount, setSelectdMemberAccount] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showCompletion,SetShowCompletion] = useState(false);

  const closeAlert = async (event) =>{
    event.preventDefault();
    setSuccess(false);
    setError(false);
  }
  
  const getMemberAccount = async (event) =>{
      event.preventDefault();

      if(!memberId){
        return;
      }
      
      setIsSelected(false);
      SetShowCompletion(true);

      const token = "Bearer "+localStorage.getItem('token');
      
      setIsLoaded(true);
      
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
            setIsLoaded(false);
            const data = response.data;

            if(data.success == true){
              SetShowCompletion(true);
              setMembres(data.member);
              setCompteMembres(data.comptes);
            }else{
              setErrorMessage(data.message);
              setError(true);
              SetShowCompletion(false);
            }
        })
        .catch(function (error) {
          setIsLoaded(false);
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

    setIdCompte(id);
    setDevise(devise);
    setTypeCompte(type_compte);

    setNom(membres.nom)
    setPostnom(membres.post_nom)
    setPrenom(membres.prenom)
    SetShowCompletion(false);
    setIsSelected(true);
  }

  const addDepot = async (event) =>{
    event.preventDefault();
   
    if(!idCompte || (devise != "USD" && devise != "CDF" )
      || (typeCompte != "Courant" && typeCompte != "Epargne"
      || !montantDepose || !codePine
      ) 
    ){
      return;
    }

    const data = {
      devise:devise,
      type_compte:typeCompte,
      montant_depose:montantDepose,
      code_pin:codePine,
      id_compte:idCompte
    }

    const token = "Bearer "+localStorage.getItem('token');
    setErrorMessage("");
    setError(false);
    
    setIsLoaded(true);

    axios({
      method:"POST",
      url:'https://agent-terrain.loanmeapp.com/api/v1/depot/',
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
            setSuccess(true);
            setIdCompte("");
            setDevise("");
            setTypeCompte("");
            setNom("");
            setPostnom("");
            setPrenom("");
            setCodePine("");
            setMontantDepose("");
            setMemberId("");
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
       <h3 className="h3 mb-2 text-gray-800">Faire un depôt</h3>
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
                   <strong>Depôt éffectué</strong> 
                  <span className="close" style={{cursor:"pointer"}} onClick={closeAlert}>
                    <span aria-hidden="true">&times;</span>
                  </span>
                </div>
              }
              <div className="row">
                <div className="form-group col-md-6">
                  <label for="exampleInputEmail1">Id. membre </label>
                  <div class="input-group mb-3">
                  <input type="text" className="form-control" placeholder="Entrer id membre" value={memberId} onChange={(e) => setMemberId(e.target.value)} aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                  <div className="input-group-append">
                    <button className="btn btn-default" type="button" onClick={getMemberAccount} style={{background:"#ff6600", color:"#fff"}}>Vérifier &nbsp;<i class="fa fa-check"></i></button>
                  </div>
                </div><hr/><br/>
                 {showCompletion == true &&
                  <>
                    {isSelected == false &&
                      <>
                        {isLoaded == false &&
                          <ul className="completionField">
                            {compteMembres.map((compteMembre) => 
                                <li onClick={selectMemberAccount} data-id={compteMembre.id} data-devise={compteMembre.devise} data-typecompte={compteMembre.type_compte}>{compteMembre.devise}-{compteMembre.type_compte}</li>
                            )}
                          </ul>
                        } 
                      </>
                      }
                      </>
                    }
                  
                  {isLoaded == true &&
                      <p className="custom-loader" style={{"marginLeft":"40%","marginRight":"45%"}}></p>
                  }
                </div>
       
                <div className="form-group col-md-6">
                  <label for="exampleInputEmail1">Nom </label>
                  <input type="text" className="form-control desabledfield" readOnly value={nom} />
                </div>
              </div><hr/>
               <div className="row">
                 <div className="form-group col-md-6">
                  <label for="exampleInputEmail1">Post-nom</label>
                  <input type="text" className="form-control desabledfield" value={postnom} disabled/>
                </div>
                <div className="form-group col-md-6">
                  <label for="exampleInputEmail1">Prenom </label>
                  <input type="text" className="form-control desabledfield" value={prenom} disabled/>
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
                  <label for="exampleInputEmail1">Montant</label>
                  <input type="text" className="form-control" placeholder="Entrer montant" value={montantDepose} onChange={(e) => setMontantDepose(e.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                  <label for="exampleInputEmail1">Code pine</label>
                  <input type="text" className="form-control" placeholder="Entrer code pine" value={codePine} onChange={(e) => setCodePine(e.target.value)}/>
                </div>
              </div>      
              <div className="row">
                <div className="form-group col-md-6">
                  <label for="exampleInputEmail1"></label>
                  <input type="hidden" className="form-control" value={idCompte} onChange={(e) => setIdCompte(e.target.value)}/>
                </div>
              </div>    
              <div className="row">
                 <div className="form-group col-md-2 pull-right">
                 <button className="btn btn-default md-12 pull-right" onClick={addDepot} style={{background:"#ff6600", color:"#fff"}}>
                            <span>Effectuer &nbsp; <i class="fa fa-check"></i></span>   
                  </button>        
                </div>
              </div>
          </div>
      </div>
      </>
    );
  }

  export default CreateDepot;