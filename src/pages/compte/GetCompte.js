import { useEffect,useState } from "react";
import axios from 'axios';
import '../../Preloader.css';

function GetCompte() {
    const [compteMembres, setCompteMembres] = useState([]);
    const [membres, setMembres] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [id, setId] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const closeAlert = async (event) =>{
      event.preventDefault();
      setError(false);
    }
    
    const requestUserAccount = async (event) =>{
      event.preventDefault();
      
      if(!id){
        return;
      }
      
      const token = "Bearer "+localStorage.getItem('token');
      
      setIsLoaded(true);
      
      axios({
        method:"POST",
        url:'https://agent-terrain.loanmeapp.com/api/v1/compte',
        responseType: 'json',
        data:{
          member_id:id
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
              setMembres(data.member);
              setCompteMembres(data.comptes);
            }
        })
        .catch(function (error) {
            setIsLoaded(true);
            console.log(error);
        });
    }
    
    return (
        <>
          <h3 className="h3 mb-2 text-gray-800" >Compte du membre</h3>
          <div className="card shadow mb-4" style={{"border-top":"2px solid red"}}>
            <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary"></h6>
                  <div className="row">
                      <div className="col-md-3 pull-right"> 
                            <input className="form-control" placeholder="id membre" value={id} onChange={(e) => setId(e.target.value)} />          
                      </div>     
                      <div className="col-md-2"> 
                            <button className="btn btn-default" onClick={requestUserAccount} style={{background:"#ff6600", color:"#fff"}}>
                                <span>Rechercher &nbsp;<i className="fa fa-search"></i></span>   
                            </button>        
                      </div>    
                  </div>    
              </div>
              <div className="card-body">
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
                            <th>Id. compte</th>
                            <th>Devise</th>
                            <th>Type compte</th>
                            <th>Date création</th>
                        </tr>
                    </thead>
                    {isLoaded == false   &&
                      <tbody>
                          {compteMembres.map((compteMembre) => 
                            <Compte id={compteMembre.id} devise={compteMembre.devise} type_compte={compteMembre.type_compte} created={compteMembre.createdAt}/>
                          )}
                        
                        <Member nom={membres.nom} postnom={membres.post_nom} prenom={membres.prenom} loading={isLoaded}/>
                      </tbody>
                    }
                
                </table>
              </div>
              </div>
          </div>
          {isLoaded == true &&
            <p className="custom-loader" style={{"marginLeft":"40%","marginRight":"45%"}}></p>
          }
        </>
    );
  }

  function Compte(props){
    const date = new Date(props.created);
    const formatedDate = date.toLocaleDateString();

    return (
      <tr>
          <td>{props.id}</td>
          <td>{props.devise}</td>
          <td>{props.type_compte}</td>
          <td>{formatedDate}</td>
      </tr>
    )
  }

  function Member(props){
    const date = new Date(props.created);
    const formatedDate = date.toLocaleDateString();

    return (
      <>
        {props.loading == false   &&
          <tr>
             <td colSpan={3}>
                <h5>Identité du membre</h5>
                <hr/>    
                <p>Nom:<strong>{props.nom}</strong></p>    
                <p>Post-nom:<strong>{props.postnom}</strong></p>    
                <p>Prenom:<strong>{props.prenom}</strong></p>      
            </td>
          </tr>
        }
      </>
    )
  }
  
  export default GetCompte;