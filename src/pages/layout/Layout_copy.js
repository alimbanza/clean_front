import { useEffect,useState } from "react";
import { redirect,Navigate} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { Outlet, Link } from "react-router-dom";
import Navigation from '../../components/Navigation';

function Layout() {
  const [noms, setNoms] = useState(""); 
  const navigate = useNavigate();

    const logout = (event)=>{
      event.preventDefault();
      localStorage.removeItem('token'); 
      navigate("/");
    }
    
    useEffect(()=>{
      const isConnected = localStorage.getItem('token'); 

      if(!isConnected){
        navigate("/");
      }
      
      const noms = localStorage.getItem('noms'); 
      setNoms(noms)
    });

    return (
      <>
            <div>
                <Helmet>
                  <link href="/static/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"></link>
                  <link rel="stylesheet" href="/static/style.css" /> 
                  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
                  rel="stylesheet"/>
                  <link href="/static/css/sb-admin-2.min.css" rel="stylesheet"></link>
              </Helmet> 
            <div id="wrapper">
            <Navigation/> 
          <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
          <i className="fa fa-bars"></i>
      </button>

      <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown no-arrow d-sm-none">
              <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fas fa-search fa-fw"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                  aria-labelledby="searchDropdown">
                  <form className="form-inline mr-auto w-100 navbar-search">
                      <div className="input-group">
                          <input type="text" className="form-control bg-light border-0 small"
                              placeholder="Search for..." aria-label="Search"
                              aria-describedby="basic-addon2"/>
                          <div className="input-group-append">
                              <button className="btn btn-primary" type="button">
                                  <i className="fas fa-search fa-sm"></i>
                              </button>
                          </div>
                      </div>
                  </form>
              </div>
          </li>
          <div className="topbar-divider d-none d-sm-block"></div>
          <li className="nav-item dropdown no-arrow">
              <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">{noms}</span>
                  <img className="img-profile rounded-circle"
                      src="/static/img/undraw_profile.svg"/>
              </a>
              <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="userDropdown">
                  <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal" onClick={logout}>
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                      Se déconnecter
                  </a>
              </div>
          </li>
      </ul>
      </nav>
          <div className="container-fluid">
            <Outlet/>
          </div>
          </div>
              <footer className="sticky-footer bg-white">
                  <div className="container my-auto">
                      <div className="copyright text-center my-auto">
                          <span>All Rights Reserved By <a href="https://universreve.com">UNIR SARL</a></span> &nbsp;&nbsp;&nbsp;
                          <span><a href="https://loanmeapp.com/privacy">Privacy</a></span> &nbsp;&nbsp;&nbsp;
                          <span><a href="https://loanmeapp.com/terms-agent">Terms</a></span> &nbsp;&nbsp;&nbsp;
                          <span><a href="https://loanmeapp.com/fag-agent">FAQ</a></span> &nbsp;&nbsp;&nbsp;
                      </div>
                      
                  </div>
              </footer>
          </div>
          </div>

          </div>
          <Helmet>
            <script src="/static/vendor/jquery/jquery.min.js"></script>
            <script src="/static/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="/static/vendor/jquery-easing/jquery.easing.min.js"></script>
            <script src="/static/js/sb-admin-2.min.js"></script>
            <script src="/static/vendor/chart.js/Chart.min.js"></script>
          
          </Helmet>
      </>
    );
  }
  
export default Layout;