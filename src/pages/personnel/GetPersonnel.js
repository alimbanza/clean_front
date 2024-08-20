import { useEffect,useState } from "react";
import axios from 'axios';
import '../../Preloader.css';

function GetPersonnel() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(false);
    const [personnels,setPersonnels] = useState([]);

    const closeAlert = async (event) =>{
      event.preventDefault();
      setSuccess(false);
      setError(false);
    }
    
    useEffect(()=>{
      
      const token = "Bearer "+localStorage.getItem('token');
      
      axios({
        method:"get",
        url:'http://localhost:8500/personnel/',
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
                setPersonnels(data.data);
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
      return id.toString().padStart(4,"0");
    }

    const formatedDate = (date) =>{
      return (new Date(date)).toLocaleDateString()
    }; 
    
    return (
        <>
          <div className="card-box mb-30">
						<div className="pd-20">
							<h4 className="h4">Personnels enregistrés</h4>
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
										<th>Id</th>
										<th>Noms</th>
										<th>Sexe</th>
										<th>Date de naissance</th>
										<th>Lieu de naissance</th>
										<th>Adresse</th>
										<th>Date enreg.</th>
									</tr>
								</thead>
								<tbody>
                                {personnels.map((personnel) => 
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
                                        <td>{formatAccountid(personnel.id)}</td>
                                        <td>{personnel.nom}<br/> {personnel.postnom}<br/>{personnel.prenom}</td>
                                        <td>{personnel.sexe}</td>
                                        <td>{formatedDate(personnel.date_de_naissance)}</td>                  
                                        <td>{personnel.lieu_de_naissance}</td>                  
                                        <td>{personnel.adresse}</td>                  
                                        <td>{formatedDate(personnel.createdAt)}</td>                  
                                    </tr>
                                )}
								</tbody>
							</table>
						</div>
					</div>
        </>
    );
  }

  export default GetPersonnel;