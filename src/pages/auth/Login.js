import '../../App.css';
import '../../Preloader.css';
import { useEffect, useState } from 'react';
import { redirect,Navigate} from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const btnStyle = {
        background: "#FA5F55 !important"
    };
    
    const alertSectionStyle = {
        color: "#fff",
        position:"absolute",
        top:"83%"
    }
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [inputInvalide, setInputInvalide] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    const isValidEmail = (email) =>{
        const isValide = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        return isValide;
    }

    const onSubForm = async (event) =>{
        event.preventDefault();

        if(!isValidEmail(email)){   
            setInputInvalide('email invalide');
            return;
        }

        if(!password){
            setInputInvalide('Mot de passe invalide');
            return;
        }
        
        setInputInvalide('');
        setIsLoaded(true);
        axios({
        method:"post",
        url:'http://localhost:8500/user/login',
        responseType: 'json',
        data:{
            email:email,
            password:password
        },
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(function (response) {
            setIsLoaded(false);
            
            const data = response.data;

            if(data.success === true){
                localStorage.setItem("token",data.token);
                localStorage.setItem("role",data.role);
                
                setIsLoaded(false);

                if(data.role == "ADMIN"){
                    navigate("/carte/interactive");
                }else{
                    navigate("/collecte/collecter-dechet/");
                }
            }else{
                setIsLoaded(false);
                setInputInvalide("Identifiant incorrect");
            }
        })
        .catch(function (error) {
            setIsLoaded(false);
            console.log(error);
            setInputInvalide("Erreur survenue");
        });
    }
        
    return (
        <div>
            <form onSubmit={onSubForm} id="login-form">
            <img src="" style={{width:"auto",height:"80px",marginLeft:"25%",marginTop:"-25px"}}/>   
            <br/>
            <h1 style={{color:"black",textAlign:"center"}}>Bienvenue !</h1>      
            <br/>                 
            <br/>                 
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="pseudo" placeholder="Entrer email"/>
                <br/>
                
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Entrer mot de passe"/><br></br>
                <div className="ui_oublier" style={{"textAlign":"center"}}>
                </div>
                <div className="ui_oublier" style={{"textAlign":"center"}}>
                     <p style={{color:"red"}}>{inputInvalide}</p>
                    <a href="/changer_mdp" className="active" style={{color:"#52459d","textDecorationLine":"none"}}>Mot de passe oublié ?</a>
                </div>
                {isLoaded == true &&
                    <div>
                          <br/>
                        <p className="custom-loader" style={{"marginLeft":"45%","marginRight":"45%"}}></p>
                    </div>
                }
                
                {isLoaded == false &&
                    <button id="signIn" style={btnStyle}>
                        Connexion
                    </button>
                }                    
                <p id="alert-section" style={alertSectionStyle}></p>
            </form>
        </div>
    );
  }
  
  export default Login;