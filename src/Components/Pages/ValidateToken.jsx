import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useUsuario } from "../../Context/UsuarioContext";

const GET_USER_DATA = gql`
  mutation ValidateToken($token: String!) {
    validateToken(token: $token) {
      username
      email
      password
      edad
      image
    }
  }
`;

const ValidateToken = () => {
  const { setLocalStorage } = useUsuario();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [validateToken] = useMutation(GET_USER_DATA);

  const onSubmit = async (data) => {
    const { token } = data;

    const userData = await validateToken({ variables: { token } });
    if (userData?.data?.validateToken?.username) {
      setLocalStorage(userData);
      history.push("/perfil");
    } else {
      history.push("/");
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card">
          <div className="card-body">
            <h1>Validar Token</h1>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Ingrese su token"
                  name="token"
                  ref={register({ required: true })}
                />
                {errors.token && <span>Este campo es requerido</span>}
              </div>

              <input
                className="btn btn-success btn-block"
                type="submit"
                value="Validar Token"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidateToken;
