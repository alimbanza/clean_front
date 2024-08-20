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

function GetMemberTransfert() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadedCompte, setIsLoadedCompte] = useState(false);
  const [transferts, setTransferts] = useState([]);
  const [closeModal, setCloseModal] = useState(true);
  const [isLoadedMember, setIsLoadedMember] = useState(true);
  const [member, setMember] = useState("");
  const [idTransfert, setIdTransfert] = useState("");
  const [id, setId] = useState("");
  const [compteMembres, setCompteMembres] = useState([]);
  const [idCompte, setIdCompte] = useState("");
  const [devise, setDevise] = useState("");
  const [typeCompte, setTypeCompte] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [memberId, setMemberId] = useState("");
  const [month, setMonth] = useState("01");
  const [year, setYear] = useState("2024");
  const [compte, setCompte] = useState([]); 
  const [typeTransfert, SetypeTransfert] = useState(""); 
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showCompletion,SetShowCompletion] = useState(false);

  const closeAlert = async (event) =>{
    event.preventDefault();
    setError(false);
  }
  
  const getEmoneyCompteId = (transfert)=>{
    if(transfert.compte_money){
      return transfert.compte_money.id
    }
  }

  const getEmoneyTypeCompte = (transfert)=>{
    if(transfert.compte_money){
      return transfert.compte_money.type_compte
    }
  }
  
  const formatedDate = (date) =>{
      return (new Date(date)).toLocaleDateString()
  }; 
  
  const formatedAmount = (montant) =>{
      return parseFloat(montant).toFixed(2)
  };
  
  const getTypeOperation = (id) =>{
      if(parseInt(id) == parseInt(idCompte)){
        return "Entrant";
      }

      return "Sortant";
  };

  const closeMemberModal = (event) =>{
    event.preventDefault();

    setCloseModal(true);
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
      url:'https://agent-terrain.loanmeapp.com/api/v1/transfert/expediteur',
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
      url:'https://agent-terrain.loanmeapp.com/api/v1/transfert/expediteur',
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

  const getMemberAccount = async (event) =>{
    event.preventDefault();

    if(!memberId){
      return;
    }
    
    setIsSelected(false);

    const token = "Bearer "+localStorage.getItem('token');
    SetShowCompletion(true);
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
        id_compte:parseInt(id),
        devise:devise,
        month:parseInt(month),
        year:parseInt(year)
      }

      const token = "Bearer "+localStorage.getItem('token');

      setTransferts([]);
        
        axios({
          method:"post",
          url:'https://agent-terrain.loanmeapp.com/api/v1/transfert/formember',
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
                  const transfertsEntrants = data.data.transferts_entrants;
                  const transfertsSortants = data.data.transferts_sortants;
                  let mergedTransferts = [...transfertsEntrants,...transfertsSortants];
                  console.log(mergedTransferts);
                  setTransferts(mergedTransferts);
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
    <h1 className="h3 mb-2 text-gray-800">Transferts éffectués par un membre</h1>
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
                        <input type="text" className="form-control" placeholder="Entrer id memnre" value={memberId} onChange={(e) => setMemberId(e.target.value)} aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                        <div className="input-group-append">
                          <button className="btn btn-default" type="button" onClick={getMemberAccount} style={{background:"#ff6600", color:"#fff"}}>Vérifier &nbsp;<i class="fa fa-check"></i></button>
                        </div>&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="input-group-append">
                          <button className="btn btn-default" type="button" onClick={getMemberAccount} style={{background:"#8d8b8c", color:"#fff"}}>Imprimer &nbsp;<i class="fa fa-print"></i></button>
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
                            <ul className="completionFieldFour">
                              {compteMembres.map((compteMembre) => 
                                  <li onClick={selectMemberAccount} data-id={compteMembre.id} data-devise={compteMembre.devise} data-typecompte={compteMembre.type_compte}>{compteMembre.devise}-{compteMembre.type_compte}</li>
                              )}
                            </ul>
                          } 
                        </>
                      }
                </>
              }
            </div><br/><hr/><br/>
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
                          <th>Date</th>
                          <th>Type transf.</th>
                          <th>Id opération</th>
                          <th>Id compte exp.</th>
                          <th>Type compte</th>
                          <th>Devise</th>
                          <th>Montant</th>
                          <th>Frais</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  {isLoaded == false   &&
                    <tbody>
                          {transferts.map((transfert) => 
                                  <tr>
                                    <td>{formatedDate(transfert.createdAt)}</td>
                                    <td>{getTypeOperation(transfert.fk_recipiendaire)}</td>
                                    <td>{transfert.id}</td>
                                    <td>{getEmoneyCompteId(transfert)}</td>
                                    <td>{getEmoneyTypeCompte(transfert)}</td>
                                    <td>{transfert.devise}</td>
                                    <td>{formatedAmount(transfert.montant_envoye)}</td>
                                    <td>{formatedAmount(transfert.pourc_preleve)}</td>
                                    <td>
                                      <a className="btn btn-default" data-idtransfert={transfert.id} onClick={openExpediteurModal} style={{background:"#ff6600",color:"#fff"}}>Exp.<i class="fa fa-eye"></i></a>
                                        &nbsp;&nbsp;&nbsp;
                                      <a className="btn btn-default" data-idtransfert={transfert.id} onClick={openRecipiendaireModal} style={{background:"#8d8b8c",color:"#fff"}}>Récip. <i class="fa fa-eye"></i></a>
                                      </td>
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
                  <h5 className="modal-title">Depositeur&nbsp;&nbsp;</h5>
                    <span aria-hidden="true" style={{color:"red",cursor:"pointer"}} onClick={closeMemberModal}>X</span>
                </div>
                <div className="modal-body">
               
                  {isLoadedMember == false &&
                     <>
                    <p>ID. depôt:<strong>{idTransfert}</strong></p> 
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
  
export default GetMemberTransfert;