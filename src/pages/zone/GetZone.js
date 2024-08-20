import { useEffect,useState } from "react";
import axios from 'axios';
import '../../Preloader.css';

function GetZone() {
    const [zones,setZones] = useState([]);
    const [btnText,setBtnText] = useState("Cloturer");

    useEffect(()=>{

        const token = "Bearer "+localStorage.getItem('token');
        
        axios({
          method:"get",
          url:'http://localhost:8500/zone/',
          responseType: 'json',
          headers: {
              'Authorization': token,
              'Content-type': "application/json"
          }
          })
          .then(function (response) {
              const data = response.data;

              if(data.success == true){
                  setZones(data.data);
              }
          })
          .catch(function (error){});
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
							<h4 className="h4">Zones enregistrées</h4>
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
										<th>Nom</th>
										<th>Status</th>
										<th>Date enreg.</th>
									</tr>
								</thead>
								<tbody>
                                    {zones.map((zone) => 
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
                                            <td>{formatAccountid(zone.id)}</td>
                                            <td>{zone.nom}</td>
                                            <td><span class="badge badge-success" style={{borderRadius:"20px"}}>{zone.etat}</span></td>
                                            <td>{formatedDate(zone.createdAt)}</td>
                                            
                                        </tr>	
                                    )} 	
								</tbody>
							</table>
						</div>
					</div>
        </>
    );
  }

  export default GetZone;