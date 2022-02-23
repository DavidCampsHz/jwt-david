import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  console.log("This is your token", store.token);
  const changeHandler = (e) => {
    setEmail(e.target.value);
  };

  const changeHandlerPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    actions.login(email, password);
  };

  if (store.token && store.token != "" && store.token != undefined)
    history.push("/");

  return (
    <div className="text-center mt-5">
      <h1>Login</h1>
      {store.token && store.token != "" && store.token != undefined ? (
        "You are logged in with this token " + store.token
      ) : (
        <div>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            placeholder="password"
            value={password}
            onChange={changeHandlerPassword}
          ></input>
          <button onClick={handleClick}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Login;
