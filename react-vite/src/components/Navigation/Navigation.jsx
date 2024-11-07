import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import StockSearch from "../StockSearch";
import "./Navigation.css";

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
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

export default Navigation;
