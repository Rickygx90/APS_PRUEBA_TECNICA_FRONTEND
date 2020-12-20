import React, { useState, useMemo } from "react";

const UsuarioContext = React.createContext();

export function UsuarioProvider(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const setLocalStorage = (user) => {
    try {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };

  const value = useMemo(() => {
    return {
      user,
      setUser,
      setLocalStorage,
    };
  }, [user]);
  return <UsuarioContext.Provider value={value} {...props} />;
}

export function useUsuario() {
  const context = React.useContext(UsuarioContext);
  if (!context) {
    throw new Error("useUsuario de estar dentro del proveedir UsuarioContext");
  }
  return context;
}
