import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  //const[login, setLogin] = useState({
  //	user: "",
  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      actions.getMessage();
  }, [store.token]);
  return (
    <div className="text-center mt-5">
      <h1>Welcome back dude!!!</h1>
      <p>
        <img src="https://ih1.redbubble.net/image.790350320.1950/flat,750x,075,f-pad,750x1000,f8f8f8.u5.jpg" />
      </p>
      <div className="alert alert-info">{store.message}</div>
    </div>
  );
};
