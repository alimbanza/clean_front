import { useEffect,useState } from "react";
import axios from 'axios';
import '../../Preloader.css';

function Cloture() {
    const [collecte,setCollecte] = useState([]);
    const [clotureError, setClotureError] = useState("");
    const [clotureId, setClotureId] = useState(null);
    const [isLoaded,setIsLoaded] = useState(false);
    const [isSuccess,setIsSuccess] = useState(false);
    const [isError,setIsError] = useState(false);
    const [responseMessage,setResponseMessage] = useState("");
    const [btnText,setBtnText] = useState("Cloturer");

    const closeAlert = async (event) =>{
        event.preventDefault();
        setIsSuccess(false);
        setIsError(false);
    }

    const onClotureCollecte = async (event) =>{
        event.preventDefault();

        const cltId = event.target.getAttribute('data-id');
        
        if(!cltId){
            setIsError(true);
            setResponseMessage("Collecte invalide");
          return;
        }else{
            setIsError(false);
            setResponseMessage("");
        }

        setClotureId(cltId);

      
        setIsLoaded(true);
        setIsError(false);
        setIsSuccess(false);
        setResponseMessage("");
        setBtnText("Chargement...");
  
        const token = "Bearer "+localStorage.getItem('token');
  
        axios({
        method:"post",
        url:'http://localhost:8500/collecte/cloture',
        responseType: 'json',
        data:{
            id_collecte:clotureId
        },
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        })
        .then(function (response) {
  
            const data = response.data;
  
            if(data.success === true){
              setClotureId("");
              setIsError(false);
              setIsSuccess(true);
              setResponseMessage(data.message);
              setBtnText('Cloturer');
            }else{
              setIsSuccess(false);
              setIsError(true);
              setResponseMessage(data.message);
              setIsLoaded(false);
              setBtnText("Cloturer");
            }
        })
        .catch(function (error) {
            setIsError(true);
            setResponseMessage("Erreur survenue lors de l'opération");
            setIsLoaded(false);
            setBtnText("Cloturer");
        });
    }

    useEffect(()=>{

        const token = "Bearer "+localStorage.getItem('token');
        
        axios({
          method:"get",
          url:'http://localhost:8500/collecte/ouverte',
          responseType: 'json',
          headers: {
              'Authorization': token,
              'Content-type': "application/json"
          }
          })
          .then(function (response) {
              const data = response.data;

              if(data.success == true){
                setCollecte(data.data);
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
          {isError == true &&   
                  <div className="alert alert-danger" >
                    <p>{responseMessage}</p>
                    <span className="close" style={{cursor:"pointer","margin-top":"-35px"}} onClick={closeAlert}>
                      <span aria-hidden="true">&times;</span>
                    </span>
                  </div>
              }
              {isSuccess == true &&   
                  <div className="alert alert-success" >
                    <p>{responseMessage}</p>
                    <span className="close" style={{cursor:"pointer","margin-top":"-35px"}} onClick={closeAlert}>
                      <span aria-hidden="true">&times;</span>
                    </span>
                  </div>
              }
						<div className="pd-20">
							<h4 className="h4">Cloture journalière de la collecte de déchets</h4>
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
										<th>Date ouverture</th>
										<th>Status</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
                                {collecte.map((col) => 
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
                                            <td>{formatAccountid(col.id)}</td>
                                            <td>{formatedDate(col.createdAt)}</td>
                                            <td><span class="badge badge-danger" style={{borderRadius:"20px"}}>En cours</span></td>
                                            <td><a class="btn btn-sm btn-success" style={{borderRadius:"20px",width:"20px !important",background:"#52459d",color:"#fff"}} data-id={col.id} onClick={onClotureCollecte}>{btnText}</a></td>
                                        </tr>	
                                    )} 	
									
								</tbody>
							</table>
						</div>
					</div>
        </>
    );
  }

  export default Cloture;