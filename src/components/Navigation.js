import { Outlet, Link } from "react-router-dom";

const navStyle = {
    "background":"#fff"
}

function Navigation() {
  const role = window.localStorage.getItem('role');

  return (
        <ul id="accordion-menu">
            {role == "ADMIN" &&   
                <>
                    <li className="dropdown" style={{display:"none"}}>
                        <Link to="/home" className="dropdown-toggle no-arrow">
                        <span className="micon bi bi-house"></span><span className="mtext">Tableau de bord</span>
                        </Link>
                    </li>   
                    <li className="dropdown">
                        <Link to="/carte/interactive" className="dropdown-toggle no-arrow">
                        <span class="micon bi bi-map"></span><span className="mtext">Carte interactive</span>
                        </Link>
                    </li>
                    <li className="dropdown">
                        <Link to="/home" className="dropdown-toggle no-arrow" style={{display:"none"}}>
                        <span class="micon bi bi-calendar"></span><span className="mtext">Horraire de collecte</span>
                        </Link>
                    </li>
                    <li className="dropdown">
                        <a href="javascript:;" className="dropdown-toggle">
                            <span className="micon bi bi-person"></span><span className="mtext">Utilisateur</span>
                        </a>
                        <ul className="submenu">
                            <li>
                                <Link to="/user/create" className="dropdown-toggle no-arrow">
                                    Nouvel
                                </Link>
                            </li>
                            <li>
                                <Link to="/user/" className="dropdown-toggle no-arrow">
                                    Liste
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a href="javascript:;" className="dropdown-toggle">
                            <span className="micon bi bi-person-badge-fill"></span><span className="mtext">Personnel</span>
                        </a>
                        <ul className="submenu">
                            <li>
                                <Link to="/personnel/create" className="dropdown-toggle no-arrow">
                                    Nouveau
                                </Link>
                            </li>
                            <li>
                                <Link to="/personnel/" className="dropdown-toggle no-arrow">
                                    Liste
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a href="javascript:;" className="dropdown-toggle">
                            <span className="micon bi-people"></span><span className="mtext">Client</span>
                        </a>
                        <ul className="submenu">
                            <li>
                                <Link to="/client/create" className="dropdown-toggle no-arrow">
                                    Nouveau
                                </Link>
                            </li>
                            <li>
                                <Link to="/client/" className="dropdown-toggle no-arrow">
                                    Liste
                                </Link>
                            </li>
                        </ul>
                    </li>
                </>
            }
        <li className="dropdown">
            <a href="javascript:;" className="dropdown-toggle">
                <span className="micon bi bi-truck"></span><span className="mtext">Collecte</span>
            </a>
            <ul className="submenu">
                <li>
                    <Link to="/collecte/cloture" className="dropdown-toggle no-arrow">
                        Cloture
                    </Link>
                </li>
                <li>
                    <Link to="/collecte/collecter-dechet/" className="dropdown-toggle no-arrow">
                        Collecter les déchets
                    </Link>
                </li>
                <li>
                    <Link to="/collecte/historique" className="dropdown-toggle no-arrow">
                        Historique
                    </Link>
                </li>
                {role == "ADMIN" &&   
                    <>
                        <li>
                            <Link to="/collecte/historique-general" className="dropdown-toggle no-arrow">
                                Historique gén.
                            </Link>
                        </li>              
                        <li>
                            <Link to="/collecte/client" className="dropdown-toggle no-arrow">
                                Collecte du client
                            </Link>
                        </li>
                        </>
                } 
            </ul>
        </li>
        <li className="dropdown">
            <a href="javascript:;" className="dropdown-toggle">
                <span className="micon bi-currency-dollar"></span><span className="mtext">Paiement</span>
            </a>
            <ul className="submenu">
                <li>
                    <Link to="/paiement/create" className="dropdown-toggle no-arrow">
                        Nouveau
                    </Link>
                </li>
                {role == "ADMIN" &&   
                    <>
                        <li>
                            <Link to="/paiement" className="dropdown-toggle no-arrow">
                                Historique
                            </Link>
                        </li>
                        <li>
                            <Link to="/paiement/client" className="dropdown-toggle no-arrow">
                                Paiement d'un client
                            </Link>
                        </li>
                    </>
                } 
            </ul>
        </li>
        {role == "ADMIN" &&   
            <>
                <li className="dropdown">
                    <a href="javascript:;" className="dropdown-toggle">
                        <span className="micon bi bi-pin-map-fill"></span><span className="mtext">Zone</span>
                    </a>
                    <ul className="submenu">
                        <li>
                            <Link to="/zone/create" className="dropdown-toggle no-arrow">
                                Nouvelle
                            </Link>
                        </li>
                        <li>
                            <Link to="/zone" className="dropdown-toggle no-arrow">
                                Liste
                            </Link>
                        </li>
                    </ul>
                </li>
            </>
        } 
</ul>
  );
}

export default Navigation;