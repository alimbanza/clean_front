import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import '../../Preloader.css';

function Invoice() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(false);
    const [paiement,setPaiement] = useState([]);
	const [month,setMonth] = useState(null);
  	const [year,setYear] = useState(null);
	const [idUser,setIdUser] = useState(null);

    const {id} = useParams(); 

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
        url:`http://localhost:8500/paiement/detail/?id_paiement=${id}`,
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
                setPaiement(data.data[0]);
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

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    return (
        <>
        <div className="pd-ltr-20 xs-pd-20-10">
        <div class="pd-20 card-box mb-30" >
              <br/>
              <br/>
              <div class="clearfix">
                <div class="text-center">
                  <h4 ClassName="text-center mb-30 weight-600">FACTURE N°{formatAccountid(id)}</h4>
                </div>
              </div>
              <hr/>
              <br/>
              <br/>
              <br/>
              <div class="clearfix">
                <div class="pull-left">
                  <p ClassName="text-center mb-30 weight-600"><strong>Date</strong>: {formatedDate(paiement.date_paiement)}</p>
                  <p ClassName="text-center mb-30 weight-600"><strong>Noms du client</strong>: {(paiement.nom).toUpperCase()} {(paiement.postnom).toUpperCase()} {(paiement.prenom).toUpperCase()}</p>
                  <p ClassName="text-center mb-30 weight-600"><strong>Adresse</strong>:<br/>
                    {paiement.nom_commune},<br/>{paiement.nom_quartier}, <br/> {paiement.avenue}, <br/>{paiement.num_parcelle}
                  </p>
                </div>
              </div>
                                
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Designation</th>
                            <th>Quantité</th>
                            <th>Prix</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Abonnement collecte des déchets
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                                {formateAmount(paiement.montant)} {paiement.devise}
                            </td>
                            <td>
                                {formateAmount(paiement.montant)} {paiement.devise}
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                
                            </td>
                            <td>
                                
                            </td>
                            <td>
                                {formateAmount(paiement.montant)} {paiement.devise}
                            </td>
                            <td>
                                {formateAmount(paiement.montant)} {paiement.devise}
                            </td>
                        </tr>
                    </tfoot>
                </table>
                <br/>
                <br/>
                <br/>
                <div class="clearfix">
                <div class="pull-right">
                  <h6>Total: {formateAmount(paiement.montant)} {paiement.devise}</h6>
                </div>
              </div>
              </div>
        </div>
        </>
    );
  }

  export default Invoice;