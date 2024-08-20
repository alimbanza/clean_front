import { useEffect,useState } from "react";
import { redirect,Navigate} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../../Preloader.css';

function PasswordReset() {
    
  const desabledFieldStyle = {
    background:"red !important"
  }

  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [postnom, setPostnom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [lieunaissance, setLieunaissance] = useState("");
  const [datenaissance, setDatenaissance] = useState("");
  const [adresse, setAdresse] = useState("");

  const navigate = useNavigate();


  useEffect(()=>{
    const email = localStorage.getItem('email'); 
    setEmail(email);

    const token = "Bearer "+localStorage.getItem('token');

    axios({
        method:"post",
        url:'https://agent-terrain.loanmeapp.com/api/v1/agent/profile',
        responseType: 'json',
        headers: {
            'Authorization': token,
            'Content-type': "application/json"
        }
        })
        .then(function (response) {
            const data = response.data;

            if(data.success === true){
                const user = data.data;
                setNom(user.nom);
                setPostnom(user.post_nom);
                setPrenom(user.prenom);
                setTelephone(user.telephone);
                setLieunaissance(user.lieu_naissance);
                setDatenaissance(user.date_naissance);
                setAdresse(user.adresse_physique);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
  });
  
    return (
      <>
        <div className="row">
        <div className="col-md-3">
        </div>
        <div className="col-md-6">
  
      <div className="card shadow mb-4" style={{"border-top":"2px solid #ff6600"}}>
          <div className="card-body">
          <h3 className="h3 mb-2 text-gray-800">Profile agent</h3>
                <div className="form-group col-md-12">
                  <label for="exampleInputEmail1">Email</label>
                  <input type="text" className="form-control desabledfield" value={email} disabled/>
                </div>
                <div className="form-group col-md-12">
                  <label for="exampleInputEmail1">Nom</label>
                  <input type="text" className="form-control desabledfield" value={nom} disabled/>
                </div>
                <div className="form-group col-md-12">
                  <label for="exampleInputEmail1">Post-nom</label>
                  <input type="text" className="form-control desabledfield" value={postnom} disabled/>
                </div>
                <div className="form-group col-md-12">
                  <label for="exampleInputEmail1">Prenom</label>
                  <input type="text" className="form-control desabledfield" value={prenom} disabled/>
                </div>
                <div className="form-group col-md-12">
                  <label for="exampleInputEmail1">Telephone</label>
                  <input type="text" className="form-control desabledfield" value={telephone} disabled/>
                </div>
                <div className="form-group col-md-12">
                  <label for="exampleInputEmail1">Lieu de naissance</label>
                  <input type="text" className="form-control desabledfield" value={lieunaissance} disabled/>
                </div>
                <div className="form-group col-md-12">
                  <label for="exampleInputEmail1">Date de naissance</label>
                  <input type="text" className="form-control desabledfield" value={datenaissance} disabled/>
                </div>
                <div className="form-group col-md-12">
                  <label for="exampleInputEmail1">Adresse physique</label>
                  <input type="text" className="form-control desabledfield" value={adresse} disabled/>
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