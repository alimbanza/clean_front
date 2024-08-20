import { useEffect,useState } from "react";
import { redirect,Navigate} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../../Preloader.css';

function PasswordReset() {
    
  const desabledFieldStyle = {
    background:"red !important"
  }
  
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [oldPasswordInvalide, setOldPasswordInvalide] = useState("");
  const [passwordInvalide, setPasswordInvalide] = useState("");
  const [cPasswordInvalide, setCPasswordInvalide] = useState("");

  const navigate = useNavigate();

  const updatePassword = (event)=>{
    event.preventDefault();

    if(!oldPassword){
        setOldPasswordInvalide("Ancien mot de passe invalide");
        return;
    }else{
        setOldPasswordInvalide("");
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

    const token = "Bearer "+localStorage.getItem('token');

    const data = {
        old_password:oldPassword,
        password:password,
        cpassword:cPassword
    }

    axios({
        method:"post",
        url:'https://agent-terrain.loanmeapp.com/api/v1/agent/password_reset',
        responseType: 'json',
        data:data,
        headers: {
            'Authorization': token,
            'Content-type': "application/json"
        }
        })
        .then(function (response) {
            localStorage.removeItem('token'); 
            navigate("/");
        })
        .catch(function (error) {
            console.log(error);
        });
  }

  useEffect(()=>{
    
    const email = localStorage.getItem('email'); 
    setEmail(email);
  });
  
    return (
      <>
        <div className="row">
        <div className="col-md-3">
        </div>
        <div className="col-md-6">
  
      <div className="card shadow mb-4" style={{"border-top":"2px solid #ff6600"}}>
          <div className="card-body">
          <h3 className="h3 mb-2 text-gray-800">Changer mot de passe</h3>
                <div className="form-group col-md-12">
                  <label for="exampleInputEmail1">Email</label>
                  <input type="text" className="form-control desabledfield" value={email} disabled/>
                </div>
                <div className="form-group col-md-12">
                  <label for="exampleInputEmail1">Ancien mot de passe</label>
                  <input type="password" className="form-control" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
                  <p style={{color:"red"}}>
                    {oldPasswordInvalide}
                  </p>
                </div>
                <div className="form-group col-md-12">
                  <label for="exampleInputEmail1">Nouveau mot de passe</label>
                  <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <p style={{color:"red"}}>
                    {passwordInvalide}
                  </p>
                </div>
                <div className="form-group col-md-12">
                  <label for="exampleInputEmail1">Confirmer mot de passe</label>
                  <input type="password" className="form-control " value={cPassword} onChange={(e) => setCPassword(e.target.value)} />
                  <p style={{color:"red"}}>
                    {cPasswordInvalide}
                  </p>
                </div>
                <div className="form-group col-md-12">
                <input type="button" className="btn" value="Modifier" onClick={updatePassword} style={{background:"#ff6600", color:"#fff"}}/> 
                </div>
          </div>
      </div>
      </div>
      <div className="col-md-3">
        </div>
      </div>
      </>
    );
  }
  
export default PasswordReset;