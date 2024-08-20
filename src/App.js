//import logo from './logo.svg';

import { BrowserRouter, Routes, Route } from "react-router-dom";

//Auth
import Login from "./pages/auth/Login";
import Layout from "./pages/layout/Layout";

import CreateUser from "./pages/user/CreateUser";
import GetUser from "./pages/user/GetUser";

import CreatePersonnel from "./pages/personnel/CreatePersonnel";
import GetPersonnel from "./pages/personnel/GetPersonnel";

import CreateClient from "./pages/client/CreateClient";
import GetClient from "./pages/client/GetClient";

import Cloture from "./pages/collecte/Cloture";
import CreateCollecteDechet from "./pages/collecte/CreateCollecteDechet";
import GetHistorique from "./pages/collecte/GetHistorique";
import GetCollecteAdmin from "./pages/collecte/GetCollecteAdmin";
import GetCollecteClient from "./pages/collecte/GetCollecteClient";

import CreatePaiement from "./pages/paiement/CreatePaiement";
import GetClientPaiement from "./pages/paiement/GetClientPaiement";
import GetHistoriquePaiement from "./pages/paiement/GetHistoriquePaiement";

import CreateZone from "./pages/zone/CreateZone";
import GetZone from "./pages/zone/GetZone";

import CarteInteractive from "./pages/map/CarteInteractive";
import Invoice from "./pages/paiement/Invoice";

import PasswordReset from "./pages/auth/PasswordReset";
import User from "./pages/auth/User";

//Dashboard

import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login />} l/>
          <Route element={<Layout />}>
            <Route path='/home' element={<Dashboard />} />
            <Route path='/user/create' element={<CreateUser />} />
            <Route path='/user/' element={<GetUser />} />
            <Route path='/personnel/create' element={<CreatePersonnel/>} />
            <Route path='/personnel/' element={<GetPersonnel/>} />
            <Route path='/client/create' element={<CreateClient/>} />
            <Route path='/client/' element={<GetClient/>} />
            <Route path='/collecte/cloture/' element={<Cloture/>} />
            <Route path='/collecte/collecter-dechet/' element={<CreateCollecteDechet/>} />
            <Route path='/collecte/historique/' element={<GetHistorique/>} />
            <Route path='/collecte/historique-general/' element={<GetCollecteAdmin/>} />
            <Route path='/collecte/client' element={<GetCollecteClient/>} />
            <Route path='/paiement/create' element={<CreatePaiement/>} />
            <Route path='/paiement/client' element={<GetClientPaiement/>} />
            <Route path='/paiement/' element={<GetHistoriquePaiement/>} />
            <Route path='/zone/create' element={<CreateZone/>} />
            <Route path='/zone' element={<GetZone/>} />
            <Route path='/carte/interactive' element={<CarteInteractive/>} />
            <Route path='/paiement/invoice/:id' element={<Invoice/>} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
