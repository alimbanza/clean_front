import { useEffect,useState } from "react";
import axios from 'axios';
import '../../Preloader.css';

function CreateUser() {
    const [email, setEmail] = useState("");
    const [emailInvalide, setEmailInvalide] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [passwordInvalide, setPasswordInvalide] = useState("");
    const [cPasswordInvalide, setCPasswordInvalide] = useState("");
    const [isLoaded,setIsLoaded] = useState(false);
    const [isSuccess,setIsSuccess] = useState(false);
    const [isError,setIsError] = useState(false);
    const [responseMessage,setResponseMessage] = useState("");
    const [btnText,setBtnText] = useState("Enregistrer");

    const closeAlert = async (event) =>{
      event.preventDefault();
      setIsSuccess(false);
      setIsError(false);
    }
    
    const isValidEmail = (email) =>{
      const isValide = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      return isValide;
    }

    const onSubForm = async (event) =>{
      event.preventDefault();
    
      if(!isValidEmail(email)){   
        setEmailInvalide('email invalide');
        return;
      }else{
        setEmailInvalide('');
      }

      if(!password){
        setPasswordInvalide("Nouveau mot de passe invalide");
        return;
    }else{
        setPasswordInvalide("");
    }

    if(!cPassword){
        setCPasswordInvalide("Mot de passe confirmation invalide");
        return;
    }else{
        setCPasswordInvalide("");
    }

    if(password != cPassword){
        setCPasswordInvalide("Mot de passe confirmation invalide");
        return;
    }else{
        setCPasswordInvalide("");
    }

      setIsLoaded(true);
      setIsError(false);
      setIsSuccess(false);
      setResponseMessage("");
      setBtnText("Chargement...");

      const token = "Bearer "+localStorage.getItem('token');

      axios({
      method:"post",
      url:'http://localhost:8500/user/store',
      responseType: 'json',
      data:{
          email:email,
          password:password
      },
      headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {

          const data = response.data;

          if(data.success === true){
            setEmail("");
            setPassword("");
            setCPassword("");

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
                  <h4 class="h4">Nouvel utilisateur</h4>
                </div>
              </div>
              <form>
                
                <div class="row">
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label>Email</label>
                      <input type="text" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="entrer email"/>
                    </div>
                    <p style={{color:"red"}}>{emailInvalide}</p>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label>Mot de passe</label>
                      <input type="password" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="entrer mot de passe"/>
                    </div>
                    <p style={{color:"red"}}>{passwordInvalide}</p>
                  </div>
                </div>	
                <div class="row">
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label>Confirmer mot de passe</label>
                      <input type="password" class="form-control" value={cPassword} onChange={(e) => setCPassword(e.target.value)} placeholder="confirmer mot de passe"/>
                    </div>
                    <p style={{color:"red"}}>{cPasswordInvalide}</p>
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

  export default CreateUser;