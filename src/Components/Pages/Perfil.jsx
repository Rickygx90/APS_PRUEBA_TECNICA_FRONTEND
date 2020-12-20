import React from "react";
import { useUsuario } from "../../Context/UsuarioContext";

const Perfil = () => {
  const { user } = useUsuario();
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card">
          <div className="card-body">
            {user?.data?.validateToken?.username ? (
              <div>
                <h1>{`Bienvenido ${user.data.validateToken.username}`}</h1>
                <img
                  className="rrounded mx-auto d-block"
                  width={300}
                  height={300}
                  alt={user.data.validateToken.username}
                  src={user.data.validateToken.image}
                />
              </div>
            ) : (
              <div>
                <h2>NO EXISTE USUARIO LOGUEADO...</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
