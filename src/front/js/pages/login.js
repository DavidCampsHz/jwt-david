import React, { useState } from "react";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const changeHandler = (e) => {
    setUser(e.target.value);
  };

  const changeHandlerPassword = (e) => {
    setPassword(e.target.value);
  };

  const patricio = () => {
    console.log(user, password);
  };

  return (
    <>
      <h1>Login</h1>
      <input type="text" placeholder="user" onChange={changeHandler}></input>
      <input
        type="text"
        placeholder="password"
        onChange={changeHandlerPassword}
      ></input>
      <button onClick={patricio}>Submit</button>
    </>
  );
};

export default Login;
