import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Hello = () => {
  const { store, actions } = useContext(Context);
  //const[login, setLogin] = useState({
  //	user: "",
  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      actions.getMessage();
  }, [store.token]);
  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!</h1>
      <p>
        <img src={rigoImageUrl} />
      </p>
      <div className="alert alert-info">{store.message}</div>
      <div>
        <input type="text" />
        <input type="password" />
        <button>Login</button>
      </div>
    </div>
  );
};
