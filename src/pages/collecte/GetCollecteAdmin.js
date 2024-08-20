import { useEffect,useState } from "react";
import axios from 'axios';
import '../../Preloader.css';

function GetCollecteAdmin() {
  const [collecteDechets,setCollecteDechets] = useState([]);
  const [btnText,setBtnText] = useState("Cloturer");
  const [month,setMonth] = useState(null);
  const [year,setYear] = useState(null);

  useEffect(()=>{
      const date_  = (new Date()).toLocaleDateString().split('/');
      const year_  = (new Date()).getFullYear();
      const month_ = date_[1];

      if(month == null || month ==""){
        setMonth(month_);
      }
      
      if(year == null || year ==""){
        setYear(year_);
      }

      const token = "Bearer "+localStorage.getItem('token');
      
      axios({
        method:"get",
        url:`http://localhost:8500/collecte/foradmin?month=${month}&year=${year}`,
        responseType: 'json',
        headers: {
            'Authorization': token,
            'Content-type': "application/json"
        }
        })
        .then(function (response) {
            const data = response.data;

            if(data.success == true){
              setCollecteDechets(data.data);
            }
        })
        .catch(function (error){});
    });

    function formatAccountid(id){
      if(id == null)
        return;

      return id.toString().padStart(4,"0");
    }

    const formatedDate = (date) =>{
      return (new Date(date)).toLocaleDateString() +'à'+ (new Date(date)).toLocaleTimeString();
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
                    </div>
                </div>
        </div>
          <div className="card-box mb-30">
						<div className="pd-20">
							<h4 className="h4">Historique générale des collectes de déchets</h4>
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
										<th>Id collecte</th>
										<th>Id client</th>
										<th>Type client</th>
										<th>Noms</th>
										<th>Sexe</th>
										<th>Adresse</th>
										<th>Zone</th>
										<th>Date collecte</th>
									</tr>
								</thead>
								<tbody>
                {collecteDechets.map((collecte) => 
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
                          <td>{formatAccountid(collecte.collecte_id)}</td>
                          <td>{formatAccountid(collecte.id)}</td>
						  <td><strong>{determineTypePoubelle(collecte.type_client)}</strong></td>  
                          <td>{collecte.nom}<br/> {collecte.postnom}<br/>{collecte.prenom} {!collecte.nom ? '-':''}</td>
                          <td>{collecte.sexe}</td>
                          <td>
                              C/{collecte.nom_commune}<br/>
                              Q/{collecte.nom_quartier}<br/>
                              AV/{collecte.avenue}<br/>
                              N° {collecte.num_parcelle}
                          </td>
                          <td><span class="badge badge-success" style={{borderRadius:"20px"}}>{collecte.nom_zone}</span></td>
                          <td>{formatedDate(collecte.collecte_dechet_date)}</td> 
                      </tr>	
                  )} 	
								</tbody>
							</table>
						</div>
					</div>
        </>
    );
  }

  export default GetCollecteAdmin;