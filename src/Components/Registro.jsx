import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const CREATE_USER = gql`
  mutation CreateUser(
    $username: String!
    $email: String!
    $password: String!
    $edad: Int
    $image: String
  ) {
    createUser(
      input: {
        username: $username
        email: $email
        password: $password
        edad: $edad
        image: $image
      }
    ) {
      _id
    }
  }
`;

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

function Registro() {
  const history = useHistory();
  const [createUser] = useMutation(CREATE_USER);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const { username, email, password, edad, image } = data;

    if (image[0] && image.length > 0) {
      const base64 = await convertBase64(image[0]);
      console.log(base64);
      const aux = await createUser({
        variables: {
          username,
          email,
          password,
          edad: parseInt(edad),
          image: base64,
        },
      });
      console.log(aux);
    } else {
      const base64 = "";
      console.log(base64);
      await createUser({
        variables: {
          username,
          email,
          password,
          edad: parseInt(edad),
          image: base64,
        },
      });
    }

    history.push("/");
  };

  return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h1>Nuevo Registro</h1>
              <hr />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <input
                    className="form-control"
                    placeholder="Ingrese su usuario"
                    name="username"
                    ref={register({ required: true })}
                  />
                  {errors.username && <span>Este campo es requerido</span>}
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    placeholder="Ingrese su email"
                    type="email"
                    name="email"
                    autoComplete="true"
                    ref={register({ required: true })}
                  />
                  {errors.email && <span>Este campo es requerido</span>}
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    placeholder="Ingrese su edad"
                    type="number"
                    name="edad"
                    ref={register}
                  />
                </div>
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
                <div className="mb-3">
                  <input
                    className="form-control"
                    placeholder="Subir imagen"
                    type="file"
                    name="image"
                    ref={register}
                  />
                </div>

                <input
                  className="btn btn-success btn-block"
                  type="submit"
                  value="Registrar Usuario"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Registro;
