import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_USER_TOKEN = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      mensaje
      login
      token
    }
  }
`;

const Login = () => {
  const [stateLogin, setstateLogin] = useState({ status: false, user: {} });
  const [loginUser] = useMutation(GET_USER_TOKEN);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (dataForm) => {
    const { username, password } = dataForm;
    const dataUser = await loginUser({
      variables: {
        username,
        password,
      },
    });
    setstateLogin({
      status: true,
      user: dataUser.data.loginUser,
    });
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Ingrese su usuario"
            name="username"
            autoComplete="true"
            ref={register}
          />
        </div>
        {errors.username && <span>Este campo es requerido</span>}

        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Ingrese su contraseña"
            type="password"
            name="password"
            autoComplete="current-password"
            ref={register({ required: true })}
          />
          {errors.password && <span>Este campo es requerido</span>}
        </div>

        <input
          type="submit"
          className="btn btn-primary btn-block"
          value="Iniciar Sesion"
        />
      </form>
      {stateLogin.status && stateLogin.user.login ? (
        <div>
          <br />
          <p>Copie su token para validar el inicio de sesion</p>
          <p>{stateLogin.user.token}</p>
          <Link className="btn btn-success" to="/validarToken">
            Continuar
          </Link>
        </div>
      ) : (
        <div>
          <br />
          <p>{stateLogin.user.mensaje}</p>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
