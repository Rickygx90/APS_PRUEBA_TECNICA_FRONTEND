import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import { UsuarioProvider } from "./Context/UsuarioContext";

import "bootswatch/dist/lux/bootstrap.min.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <UsuarioProvider>
        <App />
      </UsuarioProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
