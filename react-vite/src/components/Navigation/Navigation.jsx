import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import StockSearch from "./StockSearch";
import "./Navigation.css";

export default function Navigation() {
  return (
    <ul className="nav">
      <li >
        <NavLink to="/" id='logoContainer'>
        <img src="/images/HoneyStock.png" alt="Honey Stock" id='logoName'/>
        <img src="/favicon.ico" alt="Logo" id='logo'/>
        
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
