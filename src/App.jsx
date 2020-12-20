import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Inicio from "./Components/Pages/Inicio";
import Registro from "./Components/Registro";
import Perfil from "./Components/Pages/Perfil";
import ValidateToken from "./Components/Pages/ValidateToken";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container p-4">
        <Switch>
          <Route exact path="/" component={Inicio} />
          <Route exact path="/registro" component={Registro} />
          <Route exact path="/validarToken" component={ValidateToken} />
          <Route exact path="/perfil" component={Perfil} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
