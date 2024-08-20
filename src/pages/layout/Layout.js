import { useEffect,useState } from "react";
import { redirect,Navigate} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { Outlet, Link } from "react-router-dom";
import Navigation from '../../components/Navigation';

function Layout() {
  const [noms, setNoms] = useState(""); 
  const navigate = useNavigate();

  	const role = window.localStorage.getItem('role');

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
	     <Helmet>
			
			<link  href="/static/css/core.css" rel="stylesheet" type="text/css"/>
			<link  href="/static/css/icon-font.min.css" rel="stylesheet" type="text/css"/>
			<link  href="/static/css/style.css" rel="stylesheet" type="text/css"/>
			<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css"/>
        </Helmet>
		<div className="header">
			<div className="header-left">
				<div className="menu-icon bi bi-list"></div>
				<div
					className="search-toggle-icon bi bi-search"
					data-toggle="header_search"
				></div>
				
			</div>
			<div className="header-right">

				<div className="user-info-dropdown">
					<div className="dropdown">
						<a
							className="dropdown-toggle"
							href="#"
							role="button"
							data-toggle="dropdown"
						>
							<span className="user-icon">
								<img src="" alt="" />
							</span>
							<span className="user-name">{role}</span>
						</a>
						<div
							className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list"
						>
						
							<a className="dropdown-item" onClick={logout}><i className="dw dw-logout"></i> Se déconnecter</a>
						</div>
					</div>
				</div>
				<div className="github-link">
					<a href="https://github.com/dropways/deskapp" target="_blank"
						><img src="" alt=""
					/></a>
				</div>
			</div>
		</div>
		<div className="right-sidebar">
			<div className="sidebar-title">
				<h3 className="weight-600 font-16 text-blue">
					Layout Settings
					<span className="btn-block font-weight-400 font-12"
						>User Interface Settings</span>
				</h3>
				<div className="close-sidebar" data-toggle="right-sidebar-close">
					<i className="icon-copy ion-close-round"></i>
				</div>
			</div>
			<div className="right-sidebar-body customscroll">
				<div className="right-sidebar-body-content">
					<h4 className="weight-600 font-18 pb-10">Header Background</h4>
					<div className="sidebar-btn-group pb-30 mb-10">
						<a
							href="javascript:void(0);"
							className="btn btn-outline-primary header-white active"
							>White</a>
						<a
							href="javascript:void(0);"
							className="btn btn-outline-primary header-dark"
							>Dark</a>
					</div>

					<h4 className="weight-600 font-18 pb-10">Sidebar Background</h4>
					<div className="sidebar-btn-group pb-30 mb-10">
						<a
							href="javascript:void(0);"
							className="btn btn-outline-primary sidebar-light"
							>White</a>
						<a
							href="javascript:void(0);"
							className="btn btn-outline-primary sidebar-dark active"
							>Dark</a>
					</div>

					<h4 className="weight-600 font-18 pb-10">Menu Dropdown Icon</h4>
					<div className="sidebar-radio-group pb-10 mb-10">
						<div className="custom-control custom-radio custom-control-inline">
							<input
								type="radio"
								id="sidebaricon-1"
								name="menu-dropdown-icon"
								className="custom-control-input"
								value="icon-style-1"
								checked=""
							/>
							<label className="custom-control-label" for="sidebaricon-1"
								><i className="fa fa-angle-down"></i></label>
						</div>
						<div className="custom-control custom-radio custom-control-inline">
							<input type="radio" id="sidebaricon-2" name="menu-dropdown-icon" className="custom-control-input" value="icon-style-2" />
							<label className="custom-control-label" for="sidebaricon-2"><i className="ion-plus-round"></i></label>
						</div>
						<div className="custom-control custom-radio custom-control-inline">
							<input type="radio" id="sidebaricon-3" name="menu-dropdown-icon" className="custom-control-input" value="icon-style-3"/>
							<label className="custom-control-label" for="sidebaricon-3"><i className="fa fa-angle-double-right"></i></label>
						</div>
					</div>

					<h4 className="weight-600 font-18 pb-10">Menu List Icon</h4>
					<div className="sidebar-radio-group pb-30 mb-10">
						<div className="custom-control custom-radio custom-control-inline">
							<input type="radio" id="sidebariconlist-1" name="menu-list-icon" className="custom-control-input" value="icon-list-style-1" checked=""/>
							<label className="custom-control-label" for="sidebariconlist-1"><i className="ion-minus-round"></i></label>
						</div>
						<div className="custom-control custom-radio custom-control-inline">
							<input type="radio" id="sidebariconlist-2" name="menu-list-icon" className="custom-control-input" value="icon-list-style-2"/>
							<label className="custom-control-label" for="sidebariconlist-2">
								<i className="fa fa-circle-o" aria-hidden="true"></i></label>
						</div>
						<div className="custom-control custom-radio custom-control-inline">
							<input type="radio" id="sidebariconlist-3" name="menu-list-icon" className="custom-control-input" value="icon-list-style-3"/>
							<label className="custom-control-label" for="sidebariconlist-3"><i className="dw dw-check"></i></label>
						</div>
						<div className="custom-control custom-radio custom-control-inline">
							<input type="radio" id="sidebariconlist-4" name="menu-list-icon" className="custom-control-input" value="icon-list-style-4" checked=""/>
							<label className="custom-control-label" for="sidebariconlist-4"><i className="icon-copy dw dw-next-2"></i></label>
						</div>
						<div className="custom-control custom-radio custom-control-inline">
							<input
								type="radio"
								id="sidebariconlist-5"
								name="menu-list-icon"
								className="custom-control-input"
								value="icon-list-style-5"
							/>
							<label className="custom-control-label" for="sidebariconlist-5"
								><i className="dw dw-fast-forward-1"></i></label>
						</div>
						<div className="custom-control custom-radio custom-control-inline">
							<input type="radio" id="sidebariconlist-6" name="menu-list-icon" className="custom-control-input" value="icon-list-style-6"/>
							<label className="custom-control-label" for="sidebariconlist-6"><i className="dw dw-next"></i>
							</label>
						</div>
					</div>

					<div className="reset-options pt-30 text-center">
						<button className="btn btn-danger" id="reset-settings">
							Reset Settings
						</button>
					</div>
				</div>
			</div>
		</div>
		<div className="left-side-bar" style={{background:"#142127","overflow-y":"scroll","overflow-x":"hidden"}}>
			<div className="brand-logo">
				<a href="index.html">
					<img src="" alt="" className="dark-logo" />
					<img
						src=""
						alt=""
						className="light-logo"
					/>
				</a>
				<div className="close-sidebar" data-toggle="left-sidebar-close">
					<i className="ion-close-round"></i>
				</div>
			</div>
			<div className="menu-block customscroll">
				<div className="sidebar-menu">
					<Navigation/> 
				</div>
			</div>
		</div>
		<div className="mobile-menu-overlay"></div>
		<div className="main-container">
			<Outlet/>
		</div>
		<Helmet>
			<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>
			<script src="/static/scripts/core.js"></script>
			<script src="/static/scripts/script.min.js"></script>
			<script src="/static/scripts/process.js"></script>
			<script src="/static/scripts/layout-settings.js"></script>
			
        </Helmet>
      </>
    );
  }
  
export default Layout;