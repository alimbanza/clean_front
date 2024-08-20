import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import '../../Preloader.css';

function GetClientPaiement() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(false);
    const [paiements,setPaiements] = useState([]);
	const [month,setMonth] = useState(null);
  	const [year,setYear] = useState(null);
	const [idUser,setIdUser] = useState(null);

    const closeAlert = async (event) =>{
      event.preventDefault();
      setSuccess(false);
      setError(false);
    }
    
    useEffect(()=>{
		const date_  = (new Date()).toLocaleDateString().split('/');
		const year_  = (new Date()).getFullYear();
		const month_ = date_[1];

		let sendMonth = null;
		let sendYear = null;

		if(month == null){
			sendMonth = month_;
		}else{
			sendMonth = month;
		}
		
		if(year == null){
			sendYear = year_;
		}else{
			sendYear = year;
		}
      
      const token = "Bearer "+localStorage.getItem('token');
      
      axios({
        method:"get",
        url:`http://localhost:8500/paiement/forclient/?month=${sendMonth}&year=${sendYear}&id_menage=${idUser}`,
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
                setPaiements(data.data);
				console.log(data.data);
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
	
	function formateAmount(montant){
      if(montant == null) return "0.00";

      return parseFloat(montant).toFixed(2);
    }

    const formatedDate = (date) =>{
      return (new Date(date)).toLocaleDateString();
    }; 
	
	const formatedTime = (date) =>{
      return "à "+ (new Date(date)).toLocaleTimeString()
    }; 
    return (
        <>
		<div className="pd-ltr-20 xs-pd-20-10">
                <div class="pd-20 card-box mb-30" style={{borderRadius:"50px"}}>
                    <div class="clearfix">
                    <div class="pull-left" style={{marginRight:"40px"}} >
                            <select class="form-control" style={{borderRadius:"50px"}} value={month} onChange={(e) => setMonth(e.target.value)}>
                                <option value="">Choisir le mois</option>
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                    </div>
                    <div class="pull-left" style={{marginRight:"40px"}}>
                    <select class="form-control" style={{borderRadius:"50px"}} value={year} onChange={(e) => setYear(e.target.value)}>
                                <option value="">Choisir l'année</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                            </select>
                    </div>
					<div class="pull-left" style={{marginRight:"40px"}}>
                        <input type="text" class="form-control" style={{borderRadius:"50px"}} value={idUser} onChange={(e) => setIdUser(e.target.value)} placeholder="entrer id client"/>
                    </div>
                    </div>
                </div>
        </div>
          <div className="card-box mb-30">
						<div className="pd-20">
							<h4 className="h4">Paiement du client</h4>
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
										<th>Id paiement</th>
										<th>Id client</th>
										<th>Noms</th>
										<th>Sexe</th>
										<th>Adresse</th>
										<th>Zone</th>
										<th>Montant</th>
										<th>Devise</th>
										<th>Date paiement</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
                {paiements.map((paiement) => 
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
                          <td>{formatAccountid(paiement.t_paiement_id)}</td>
                          <td>{formatAccountid(paiement.id)}</td>
                          <td>{paiement.nom}<br/> {paiement.postnom}<br/>{paiement.prenom}</td>
                          <td>{paiement.sexe}</td>
                          <td>
                              C/{paiement.nom_commune}<br/>
                              Q/{paiement.nom_quartier}<br/>
                              AV/{paiement.avenue}<br/>
                              N° {paiement.num_parcelle}
                          </td>
                          <td><span class="badge badge-success" style={{borderRadius:"20px"}}>{paiement.nom_zone}</span></td>
						  <td>{formateAmount(paiement.montant)}</td> 
						  <td>{paiement.devise}</td> 
                          <td>
							{formatedDate(paiement.date_paiement)}<br/>
							{formatedTime(paiement.date_paiement)}
						  </td> 
						  <td>
						  <Link to={`/paiement/invoice/${paiement.t_paiement_id}`} style={{borderRadius:"10px",padding:"10px",textAlign:"center",background:"#52459d",color:"white"}}>
							Facture
						  </Link>
						  </td> 
                      </tr>	
                  )} 	
								</tbody>
							</table>
						</div>
					</div>
        </>
    );
  }

  export default GetClientPaiement;