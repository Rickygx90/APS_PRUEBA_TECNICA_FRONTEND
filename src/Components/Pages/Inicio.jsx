import React, { Fragment } from "react";
import Login from "../Login";
import { useUsuario } from "../../Context/UsuarioContext";

const Inicio = () => {
  const { user } = useUsuario();
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              {user?.data?.validateToken?.username ? (
                <img
                  src="https://lh3.googleusercontent.com/proxy/tBYhk5ShNfVWAbMrbrgrWYNieAKS62svUNDF9-dlLfGq7MyO4tqNrOtnHvRZJXev0CjXbROa9kxJa2-gD1zUfm24yeoJxo-JV6GSDOWIQ3STF9_awf4i6A"
                  alt="logo_aps"
                />
              ) : (
                <Fragment>
                  <h1>Inicio de Sesion</h1>
                  <hr />
                  <Login />
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Inicio;
