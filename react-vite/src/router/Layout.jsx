import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";


/** 
 * ### Layout Component
 * Authenticates the current session user before loading the rest of the app.
 */
export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <ModalProvider>
      <Navigation />
        {isLoaded && <Outlet />}
        <footer>
        <img src='../../../images/HoneyStock.png'></img>
        </footer>
      <Modal />
    </ModalProvider>
  );
}
