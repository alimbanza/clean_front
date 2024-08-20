import { useEffect,useState } from "react";
import axios from 'axios';
import '../../Preloader.css';

function GetClient() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(false);
    const [clients,setClients] = useState([]);

    const closeAlert = async (event) =>{
      event.preventDefault();
      setSuccess(false);
      setError(false);
    }
    
    useEffect(()=>{
      
      const token = "Bearer "+localStorage.getItem('token');
      
      axios({
        method:"get",
        url:'http://localhost:8500/client/',
        responseType: 'json',
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
                setClients(data.data);
                setIsLoaded(false);
            }else{
              setErrorMessage(data.message);
              setError(true);
              setIsLoaded(false);
            }
        })
        .catch(function (error) {
            setIsLoaded(false);
            setErrorMessage("Erreur survenue");
            setError(true);
        });
    });

    function formatAccountid(id){
      if(id == null) return 0;

      return id.toString().padStart(4,"0");
    }

    const formatedDate = (date) =>{
      return (new Date(date)).toLocaleDateString()
    }; 
	
	const determineTypePoubelle = (poubelle) =>{
      if(poubelle == "LIEU_PUBLIC"){
		  return 'Poubelle publique';
	  }else if(poubelle == "MENAGE"){
		  return 'Poubelle domestique';
	  }else{
		  return 'Non spécifié'
	  }
    }; 
	
    return (
        <>
          <div className="card-box mb-30">
						<div className="pd-20">
							<h4 className="h4">Clients (Lieu public ou ménage)  enregistrés</h4>
						</div>
						<div className="pb-20">
							<table className="checkbox-datatable table nowrap">
								<thead>
                                <tr>
										<th>
											<div className="dt-checkbox">
												<input
													type="checkbox"
													name="select_all"
													value="1"
													id="example-select-all"
												/>
												<span className="dt-checkbox-label"></span>
											</div>
										</th>
										<th>Id Client</th>
										<th>Id Ménage/<br/>poubelle</th>
										<th>Type client</th>
										<th>Noms</th>
										<th>Sexe</th>
										<th>Adresse</th>
										<th>Zone</th>
										<th>
										Interval
										<br/>
										de collecte
										</th>
										<th>Date enreg.</th>
									</tr>
								</thead>
								<tbody>
                                {clients.map((client) => 
                                    <tr>
                                        <td>
                                            <div className="dt-checkbox">
                                                <input
                                                type="checkbox"
                                                name="select_all"
                                                value="1"
                                                id="example-select-all"
                                                />
                                                <span className="dt-checkbox-label"></span>
                                            </div>
                                        </td>
                                        <td>{formatAccountid(client.id)}</td>
                                        <td>{formatAccountid(client.t_id_menage)}</td>
										<td><strong>{determineTypePoubelle(client.type_client)}</strong></td>  
                                        <td>{client.nom}<br/> {client.postnom}<br/>{client.prenom} {!client.nom ? '-':''}</td>
                                        <td>{client.sexe}</td>
                                        <td>
                                            C/{client.nom_commune}<br/>
                                            Q/{client.nom_quartier}<br/>
                                            AV/{client.avenue}<br/>
                                            N° {client.num_parcelle}
                                        </td>
                                        <td><span class="badge badge-success" style={{borderRadius:"20px"}}>{client.nom_zone}</span></td>                               
                                        <td>{client.intervale_de_collecte ?'Après '+client.intervale_de_collecte +' Jours':''}</td>                                  
                                        <td>{formatedDate(client.createdAt)}</td>                                  
                                    </tr>
                                )}
								</tbody>
							</table>
						</div>
					</div>
        </>
    );
  }

  export default GetClient;