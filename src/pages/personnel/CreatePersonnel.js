import { useEffect,useState } from "react";
import axios from 'axios';
import '../../Preloader.css';

function CreatePersonnel() {

    const [users,setUsers] = useState([]);
    const [nom,setNom] = useState("");
    const [postnom,setPostnom] = useState("");
    const [prenom,setPrenom] = useState("");
    const [lieuNaissance,setLieuNaissance] = useState("");
    const [dateNaissance,setDateNaissance] = useState("");
    const [sexe,setSexe] = useState("");
    const [adresse,setAdresse] = useState("");
    const [idUtilisateur,setIdUtilisateur] = useState("");
    const [isLoaded,setIsLoaded] = useState(false);

    const [errorNom,setErrorNom] = useState("");
    const [errorPostnom,setErrorPostnom] = useState("");
    const [errorPrenom,setErrorPrenom] = useState("");
    const [errorLieuNaissance,setErrorLieuNaissance] = useState("");
    const [errorDateNaissance,setErrorDateNaissance] = useState("");
    const [errorSexe,setErrorSexe] = useState("");
    const [errorAdresse,setErrorAdresse] = useState("");
    const [errorIdUtilisateur,setErrorIdUtilisateur] = useState("");

    const [isSuccess,setIsSuccess] = useState(false);
    const [isError,setIsError] = useState(false);
    const [responseMessage,setResponseMessage] = useState("");
    const [btnText,setBtnText] = useState("Enregistrer");

    const closeAlert = async (event) =>{
        event.preventDefault();
        setIsSuccess(false);
        setIsError(false);
    }

    const onSubForm = async (event) =>{
        event.preventDefault();
        
        if(!nom){
            setErrorNom("Nom invalide");
          return;
        }else{
            setErrorNom("");
        }
        
        if(!postnom){
            setErrorPostnom("Postnom invalide");
          return;
        }else{
            setErrorPostnom("");
        }
        
        if(!prenom){
            setErrorPrenom("Prenom invalide");
          return;
        }else{
            setErrorPrenom("");
        }

        if(!sexe){
            setErrorSexe("Sexe invalide");
          return;
        }else{
            setErrorSexe("");
        }
        
        if(!lieuNaissance){
            setErrorLieuNaissance("Lieu de naissance invalide");
          return;
        }else{
            setErrorLieuNaissance("");
        }
        
        if(!dateNaissance){
            setErrorDateNaissance("Date de naissance invalide");
          return;
        }else{
            setErrorDateNaissance("");
        }
        
        if(!adresse){
            setErrorAdresse("Adresse invalide");
          return;
        }else{
            setErrorAdresse("");
        }
        
        if(!idUtilisateur){
            setErrorIdUtilisateur("Utilisateur invalide");
          return;
        }else{
            setErrorIdUtilisateur("");
        }
  
        setIsLoaded(true);
        setIsError(false);
        setIsSuccess(false);
        setResponseMessage("");
        setBtnText("Chargement...");
  
        const token = "Bearer "+localStorage.getItem('token');
  
        axios({
        method:"post",
        url:'http://localhost:8500/personnel/store',
        responseType: 'json',
        data:{
            nom,
            postnom,
            prenom,
            sexe,
            lieu_de_naissance:lieuNaissance ,
            date_de_naissance:dateNaissance,
            adresse,
            id_user:idUtilisateur
        },
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        })
        .then(function (response) {
  
            const data = response.data;
  
            if(data.success === true){
                setNom("");
                setPostnom("");
                setPrenom("");
                setLieuNaissance("");
                setDateNaissance("");
                setSexe("");
                setAdresse("");
                setIdUtilisateur("");
              
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

    useEffect(()=>{
      
        const token = "Bearer "+localStorage.getItem('token');
        
        axios({
          method:"get",
          url:'http://localhost:8500/user/',
          responseType: 'json',
          headers: {
              'Authorization': token,
              'Content-type': "application/json"
          }
          })
          .then(function (response) {
              const data = response.data;

              if(data.success == true){
                  setUsers(data.data);
              }
          })
          .catch(function (error){});
      });
  
      function formatAccountid(id){
        return id.toString().padStart(4,"0");
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
        <div class="pd-20 card-box mb-30">
              <div class="clearfix">
                <div class="pull-left">
                  <h4 class="h4">Nouveau Personnel</h4>
                </div>
              </div>
              <form>
                <div class="row">
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label>Nom</label>
                      <input type="text" class="form-control" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="entrer nom"/>
                    </div>
                    <p style={{color:"red"}}>{errorNom}</p>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label>Post-nom</label>
                      <input type="text" class="form-control" value={postnom} onChange={(e) => setPostnom(e.target.value)} placeholder="entrer post-nom"/>
                    </div>
                    <p style={{color:"red"}}>{errorPostnom}</p>
                  </div>
                </div>	
                <div class="row">
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label>Prenom</label>
                      <input type="text" class="form-control" value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="entrer prenom"/>
                    </div>
                    <p style={{color:"red"}}>{errorPrenom}</p>
                  </div> 
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label>Sexe</label>
                      <select class="form-control" value={sexe} onChange={(e) => setSexe(e.target.value)}>
                                <option value="">Choisir</option>
                                <option value="M">M</option>
                                <option value="F">F</option>
                       </select>
                    </div>
                    <p style={{color:"red"}}>{errorSexe}</p>
                  </div>
                </div>	
                <div class="row">
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label>Lieu de naissance </label>
                      <input type="text" class="form-control" value={lieuNaissance} onChange={(e) => setLieuNaissance(e.target.value)} placeholder="entrer lieu de naissance"/>
                    </div>
                    <p style={{color:"red"}}>{errorLieuNaissance}</p>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label>Date de naissance</label>
                      <input type="date" class="form-control" value={dateNaissance} onChange={(e) => setDateNaissance(e.target.value)} placeholder="entrer date de naissance"/>
                    </div>
                    <p style={{color:"red"}}>{errorDateNaissance}</p>
                  </div>
                </div>	
                <div class="row">
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label>Adresse</label>
                      <input type="text" class="form-control" value={adresse} onChange={(e) => setAdresse(e.target.value)} placeholder="entrer adresse"/>
                    </div>
                    <p style={{color:"red"}}>{errorAdresse}</p>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label>Utilisateur</label>
                      <select class="form-control" value={idUtilisateur} onChange={(e) => setIdUtilisateur(e.target.value)}>
                          <option value="">Choisir</option>
                            {users.map((user) => 
                                <option value={user.id}>{formatAccountid(user.id)}-{user.email}</option>
                            )} 

                       </select>
                    </div>
                    <p style={{color:"red"}}>{errorIdUtilisateur}</p>
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

  export default CreatePersonnel;