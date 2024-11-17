import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import StockSearch from "./StockSearch";
import "./Navigation.css";

export default function Navigation() {
  return (
    <ul className="nav">
      <li id='logo'>
        <NavLink to="/">
        <img src="/favicon.ico" alt="Logo" />
        
        </NavLink>
      </li>
      <li>
        <StockSearch />
      </li>
      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}
