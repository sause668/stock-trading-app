import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import { clearStocks } from "../../redux/stock";
import { removeWatchlistState } from "../../redux/watchlist";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormPage/LoginFormModal";
import SignupFormModal from "../SignupFormPage/SignupFormModal";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    dispatch(clearStocks());
    dispatch(removeWatchlistState());
    closeMenu();
  };

  return (
    <>
      <button onClick={toggleMenu} id='profileMenuButton' className='curser'>
        {/* <IoMenu id='menuIcon'/> */}
        <FaUserCircle id='profileIcon'/>
      </button>
      {showMenu &&(
        <div className='conProfileMenu' ref={ulRef}>
          {user ? (
            <>
              <div className='profileList'>
                  <p className='profileListItem'>Hello, {user.username}</p>
                  <p className='profileListItem'>{user.email}</p>
              </div>
              <p id='profileListBorder'/>
              {/* <div className='profileList'>
                  <p className='profileListItem'>
                  <NavLink className='profileLink' to={'/spots/current'} onClick={closeMenu}>Manage Spots</NavLink>
                  </p>
                  <p className='profileListItem'>
                      <NavLink className='profileLink' to={'/reviews/current'} onClick={closeMenu}>Manage Reviews</NavLink>
                  </p>
              </div> */}
              <div>
                <button id='logoutButton' onClick={logout}>Log Out</button>
              </div>
            </>
          ) : (
            <>
            {/* <li className='profileListItem'>bah</li> */}
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal/>}
              />
            </>
          )}
        </div>
      )}
     
    </>
    // <>
    //   <button onClick={toggleMenu} className="nav-btn">
    //     <FaUserCircle />
    //   </button>
    //   {showMenu && (
    //     <ul className={"profile-dropdown"} ref={ulRef}>
    //       {user ? (
    //         <>
    //           <li>{user.username}</li>
    //           <li>{user.email}</li>
    //           <li>
    //             <button onClick={logout} className="nav-btn">Log Out</button>
    //           </li>
    //         </>
    //       ) : (
    //         <>
    //           <OpenModalMenuItem
    //             itemText="Log In"
    //             onItemClick={closeMenu}
    //             modalComponent={<LoginFormModal />}
    //           />
    //           <OpenModalMenuItem
    //             itemText="Sign Up"
    //             onItemClick={closeMenu}
    //             modalComponent={<SignupFormModal />}
    //           />
    //         </>
    //       )}
    //     </ul>
    //   )}
    // </>
  );
}

export default ProfileButton;
