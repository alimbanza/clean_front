import { useEffect,useState } from "react";
import axios from 'axios';
import '../../Preloader.css';

function GetUser() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(false);
    const [users,setUsers] = useState([]);

    const closeAlert = async (event) =>{
      event.preventDefault();
      setSuccess(false);
      setError(false);
    }
    
    useEffect(()=>{
      
      const token = "Bearer "+localStorage.getItem('token');
      
      axios({
        method:"get",
        url:'http://localhost:8500/user/',
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
                setUsers(data.data);
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
							<h4 className="h4">Utilisateurs enregistrés</h4>
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
										<th>Email</th>
										<th>Mot de passe</th>
										<th>Role</th>
										<th>Date enreg.</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
                        {users.map((user) => 
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
                              <td>{formatAccountid(user.id)}</td>
                              <td>{user.email}</td>
                              <td>********</td>
                              <td><span class="badge badge-primary" style={{borderRadius:"20px",background:"#52459d"}}>{user.role}</span></td>
                              <td>{formatedDate(user.createdAt)}</td>
                              <td><span class="badge badge-success" style={{borderRadius:"20px"}}>{user.status}</span></td>                  
                            </tr>
                        )} 
								</tbody>
							</table>
						</div>
					</div>
        </>
    );
  }

  export default GetUser;