import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet, Link } from "react-router-dom";
import axios from 'axios';
import '../Preloader.css';

function Dashboard() {
  const [depotUsd,setDepotUsd] = useState(0);
  const [depotCdf,setDepotCdf] = useState(0);
  const [retraitUsd,setRetraitUsd] = useState(0);
  const [retraitCdf,setRetraitCdf] = useState(0);
  const [transfertUsd,setTransfertUsd] = useState(0);
  const [transfertCdf,setTransfertCdf] = useState(0);
  const [unconfirmedWithdrawl,setUnconfirmedWithdrawl] = useState(0);
  const [unconfirmedTransfer,setUnconfirmedTransfer] = useState(0);
  
  const [depotPUsd,setDepotPUsd] = useState("");
  const [depotPCdf,setDepotPCdf] = useState("");
  const [retraitPUsd,setRetraitPUsd] = useState("");
  const [retraitPCdf,setRetraitPCdf] = useState("");
  const [transfertPUsd,setTransfertPUsd] = useState("");
  const [transfertPCdf,setTransfertPCdf] = useState("");

  useEffect(()=>{

    const token = "Bearer "+localStorage.getItem('token');
    //usd
    const annual_depot_period_usd = {
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
        7:0,
        8:0,
        9:0,
        10:0,
        11:0,
        12:0
    };

    const annual_retrait_period_usd = {
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
        7:0,
        8:0,
        9:0,
        10:0,
        11:0,
        12:0
    };
    
    const annual_transfert_period_usd = {
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
        7:0,
        8:0,
        9:0,
        10:0,
        11:0,
        12:0
    };
    
    //cdf
    const annual_depot_period_cdf = {
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
        7:0,
        8:0,
        9:0,
        10:0,
        11:0,
        12:0
    };
    
    const annual_retrait_period_cdf = {
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
        7:0,
        8:0,
        9:0,
        10:0,
        11:0,
        12:0
    };

    const annual_transfert_period_cdf = {
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
        7:0,
        8:0,
        9:0,
        10:0,
        11:0,
        12:0
    };

    axios({
        method:"post",
        url:'https://agent-terrain.loanmeapp.com/api/v1/home',
        responseType: 'json',
        headers: {
            'Authorization': token,
            'Content-type': "application/json"
        }
        })
        .then(function (response) {        
            const result = response.data;
            console.log("----------------resultat----------------");
            console.log(result);
            console.log("----------------resultat----------------");
            
            if(result.success == true){
                const {data} = result;
                setDepotUsd(data.depot.usd);
                setDepotCdf(data.depot.cdf); 
                setRetraitUsd(data.retrait.usd);
                setRetraitCdf(data.retrait.cdf);
                setTransfertUsd(data.transfert.usd);
                setTransfertCdf(data.transfert.cdf);
                setUnconfirmedWithdrawl(data.unconfirmedWithdrawl);
                setUnconfirmedTransfer(data.unconfirmedTransfer);
                console.log(data);
                const depot_period_usd = data.period.depot.usd;
                const depot_period_cdf = data.period.depot.cdf;
                const retrait_period_usd = data.period.retrait.usd;
                const retrait_period_cdf = data.period.retrait.cdf;
                const transfert_period_usd = data.period.transfert.usd;
                const transfert_period_cdf = data.period.transfert.cdf;
                
                if(depot_period_usd.length > 0){
                    depot_period_usd.forEach((value,index)=>{
                        const month = value.Month; 
                        annual_depot_period_usd[month]= value.total;
                    });
                }

                setDepotPUsd(JSON.stringify(annual_depot_period_usd));
                
                if(depot_period_cdf.length > 0){                    
                    depot_period_cdf.forEach((value,index)=>{
                        const month = value.Month; 
                        annual_depot_period_cdf[month]= value.total;
                    });
                }

                setDepotPCdf(JSON.stringify(annual_depot_period_cdf));
                
                if(retrait_period_usd.length > 0){
                    retrait_period_usd.forEach((value,index)=>{
                        const month = value.Month; 
                        annual_retrait_period_usd[month]= value.total;
                    });
                }
                
                setRetraitPUsd(JSON.stringify(annual_retrait_period_usd));

                if(retrait_period_usd.length > 0){
                    retrait_period_cdf.forEach((value,index)=>{
                        const month = value.Month; 
                        annual_retrait_period_cdf[month]= value.total;
                    });
                }

                setRetraitPCdf(JSON.stringify(annual_retrait_period_cdf));
                
                if(transfert_period_usd.length > 0){
                    transfert_period_usd.forEach((value,index)=>{
                        const month = value.Month; 
                        annual_transfert_period_usd[month]= value.total;
                    });
                }

                setTransfertPUsd(JSON.stringify(annual_transfert_period_usd));
                
                if(transfert_period_usd.length > 0){
                    transfert_period_cdf.forEach((value,index)=>{
                        const month = value.Month; 
                        annual_transfert_period_cdf[month]= value.total;
                    });
                }

                setTransfertPCdf(JSON.stringify(annual_transfert_period_cdf));
            }
        })
        .catch(function (error) {
            console.log(error);
        });
   
  });
  
  return (
    <>
      <h1>Accueil</h1>
      <div className="row">
          <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                  <div className="card-body">
                      <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                  Total depôt (Journalier)</div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">USD {depotUsd.toFixed(2)}</div>
                              <br/>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">CDF {depotCdf.toFixed(2)}</div>
                          </div>
                          <div className="col-auto">
                              <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                  <div className="card-body">
                      <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                  Total retrait (Journalier)</div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">USD {retraitUsd.toFixed(2)}</div>
                              <br/>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">CDF {retraitCdf.toFixed(2)}</div>
                          </div>
                          <div className="col-auto">
                              <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                  <div className="card-body">
                      <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                  Total transfert (Journalier)</div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">USD {transfertUsd.toFixed(2)}</div>
                              <br/>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">CDF {transfertCdf.toFixed(2)}</div>
                          </div>
                          <div className="col-auto">
                              <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
                  <div className="card-body">
                      <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                  Transact. non confirméé</div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">Retrait: {unconfirmedWithdrawl}</div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">Transfert: {unconfirmedTransfer}</div>
                          </div>
                          <div className="col-auto">

                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div className="row">
                        <div className="col-xl-12 col-lg-12 usdcourbe" data-depotusd={depotPUsd} data-retraitusd={retraitPUsd} data-transfertusd={transfertPCdf}>
                            <div className="card shadow mb-4">
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">Evolution des transactions en USD</h6>
                                </div>
                                <div className="card-body">
                                    <div className="chart-area"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
                                        <canvas id="myAreaChart" width="554" height="160" style={{"display": "block",width: "554px", height: "160px"}} className="chartjs-render-monitor"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 cdfcourbe" data-depotcdf={depotPCdf} data-retraitcdf={retraitPCdf} data-transfertcdf={transfertPCdf}>
                            <div className="card shadow mb-4">
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">Evolution des transactions en CDF</h6>
                                </div>
                                <div className="card-body">
                                    <div className="chart-area"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
                                        <canvas id="myAreaChart-two" width="554" height="160" style={{"display": "block",width: "554px", height: "160px"}} className="chartjs-render-monitor"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

    </>
  );
}

export default Dashboard;