import { useEffect,useState } from "react";
import axios from 'axios';
import '../../Preloader.css';

function GetSolde() {
    const [compteSolde,setCompteSolde] = useState("");
    const [compte,setCompte] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [id, setId] = useState("");
    const [devise, setDevise] = useState("");
    const [typeCompte, setTypeCompte] = useState("");
    const [error, setError] = useState(false);
    const [resultRow, setResultRow] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const closeAlert = async (event) =>{
      event.preventDefault();
      setError(false);
    }
    
    const requestUserSolde = async (event) =>{
      event.preventDefault();
 
      if(!id || (devise != "USD" && devise != "CDF" )
        || (typeCompte != "Courant" && typeCompte != "Epargne") 
      ){
        return;
      }
      
      const token = "Bearer "+localStorage.getItem('token');
      
      setIsLoaded(true);

      axios({
        method:"POST",
        url:'https://agent-terrain.loanmeapp.com/api/v1/compte/solde',
        responseType: 'json',
        data: {
          compte_id:parseInt(id),
          devise:devise,
          type_compte:typeCompte
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
              setResultRow(true);
              setCompteSolde(data.solde);
              setCompte(data.compte);
            }else{
              setResultRow(false);
              setCompte([]);
              setCompteSolde("");
            }
        })
        .catch(function (error) {
            setIsLoaded(false);
            setResultRow(false);
            setCompte([]);
            setCompteSolde("");
            console.log(error);
        });
    }
    
    return (
      <>
      <h3 className="h3 mb-2 text-gray-800">Solde du compte membre</h3>
      <div className="card shadow mb-4">
        <div className="card-header py-3" style={{"border-top":"2px solid #ff6600"}}>
              <h6 className="m-0 font-weight-bold text-primary"></h6>
              <div className="row">
                  <div className="col-md-3"> 
                        <input className="form-control" placeholder="id compte" value={id} onChange={(e) => setId(e.target.value)} />          
                  </div>     
                  <div className="col-md-3"> 
                      <select className="form-control" value={devise} onChange={(e) => setDevise(e.target.value)}>          
                          <option>Choisir devise</option>          
                          <option value="USD">USD</option>          
                          <option value="CDF">CDF</option>                    
                      </select>          
                  </div>   
                  <div className="col-md-3"> 
                      <select className="form-control" value={typeCompte} onChange={(e) => setTypeCompte(e.target.value)}>          
                          <option>Choisir Type compte</option>          
                          <option value="Courant">Courant</option>          
                          <option value="Epargne">Epargne</option>                    
                      </select>          
                  </div>     
                  <div className="col-md-2"> 
                        <button className="btn btn-default" onClick={requestUserSolde} style={{background:"#ff6600", color:"#fff"}}>
                            <span>Rechercher &nbsp; <i className="fa fa-search"></i></span>   
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
                        <th style={{color:"red !important"}}>Devise</th>
                        <th style={{color:"#000 !important"}}>Type compte</th>
                        <th style={{color:"#000 !important"}}>Solde</th>
                    </tr>
                </thead>
                <tbody>
                {isLoaded == false && resultRow == true &&
                  <tr>
                      <td>{compte.devise}</td>
                      <td>{compte.type_compte}</td>
                      <td>Membre notifié</td>
                  </tr>
                }
                </tbody>
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
  
  export default GetSolde;