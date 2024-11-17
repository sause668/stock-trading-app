import { useEffect, useState } from "react";
import { BiSolidPencil } from "react-icons/bi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import SingleStock from "./SingleStock";

import CreateWatchListForm from "./CreateWatchlistForm";
import OpenModalButton from "../../OpenModalButton";
import { fetchWatchlist } from "../../../redux/watchlist";
import WatchlistModalButton from "./WatchlistModalButton";
import EditWatchListForm from "./EditWatchlistForm";

/**
 * ### Watchlist Module
 * Intended only for use within the `ProfilePage` component.
 * 
 * Displays the current user's created watchlists as dropdown menus that can show the stocks within.
 * @param user The user data passed in from the parent.
 */
export default function WatchlistModule() {
    const dispatch = useDispatch();
    // const [watchlists, setWatchlists] = useState([]);
    // Grab the current user's watchlist state.
    const watchlists = useSelector((state) => state.watchlist.watchlists);
    
    // This slice of state usually takes a few seconds to load. This useEffect prevents the page
    // from crashing in the meantime, and grabs the watchlist state once it's ready to go.
    useEffect(() => {
        dispatch(fetchWatchlist());
        // setWatchlists(watchlistState);
    }, [dispatch]);

    return (<div id="profile-right__watchlist" className="profile-module">
        <div id="profile-watchlist__head" className="profile-module__title">
            <h2>Watchlists</h2>
            {/* This is the add button to create a new watchlist. */}
            <div>
                <OpenModalButton
                    buttonText={<IoIosAddCircleOutline />}
                    modalComponent={<CreateWatchListForm />}
                />
            </div>
        </div>
        <div id="profile-watchlist__body">
            {/* If the watchlists */}
            {watchlists
                ? watchlists.map((list) => <SingleWatchlist key={list.id} list={list} />)
                : (<>
                    {/* <h3>Loading...</h3>
                    <p>
                        If loading persists, you may not have a watchlist yet. Use the Create
                        Watchlist button above to make one!
                    </p> */}
                </>)
            }
        </div>
    </div>)
}

/**
 * ### Single Watchlist
 * The primary reason why a single watchlist has been abstracted into its own component is to allow for
 * each list to control itself whilst maintaining code readability.
 * 
 * @param list List data passed in from the watchlist state.
 */
function SingleWatchlist({ list }) {
    // Create a state variable which manages the watchlist's visibility.
    // If the list ID is 1, it should be visible by default. Otherwise, should be hidden.
    const [visible, setVisible] = useState(list.id === 1);

    // Create a dynamic className for the visibility of the list.
    const watchlistBtnClassName = "profile-watchlist-visibility-toggle" + (visible ? "" : " profile-watchlist-hidden");

    return (<div className="profile-watchlist__list">
        <div className="profile-single-wl-head">
            <div>
                <h4>{list.name}</h4>
                {/* This is the watchlist edit button. The "remove stock from watchlist" button is inside SingleStock. */}
                {/* <button><BiSolidPencil /></button> */}
                <WatchlistModalButton
                    buttonText={<BiSolidPencil />}
                    modalComponent={<EditWatchListForm watchlistId={list.id} watchlistName={list.name} />}
                />
            </div>
            
            <button className={watchlistBtnClassName} onClick={() => setVisible(!visible)}>
                {visible ? <FaAngleUp /> : <FaAngleDown />}
            </button>
        </div>
        <div className="profile-watchlist__stock">
            {visible ? list?.watchlist_stocks.map((stock) => <SingleStock key={stock.id} mode="watchlist" stock={stock} />) : <></>}
        </div>
    </div>)
}




// function WatchlistModalButton({
//   modalComponent, // component to render inside the modal
//   buttonText, // text of the button that opens the modal
//   onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
//   onModalClose // optional: callback function that will be called once the modal is closed
// }) {
//   const { setModalContent, setOnModalClose } = useModal();

//   const onClick = () => {
//     if (onModalClose) setOnModalClose(onModalClose);
//     setModalContent(modalComponent);
//     if (typeof onButtonClick === "function") onButtonClick();
//   };

//   return <button onClick={onClick} className='watchlistModalButton'>{buttonText}</button>;
// }

// function WatchlistStockModalButton({
//     modalComponent, // component to render inside the modal
//     buttonText, // text of the button that opens the modal
//     onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
//     onModalClose // optional: callback function that will be called once the modal is closed
//   }) {
//     const { setModalContent, setOnModalClose } = useModal();
  
//     const onClick = () => {
//       if (onModalClose) setOnModalClose(onModalClose);
//       setModalContent(modalComponent);
//       if (typeof onButtonClick === "function") onButtonClick();
//     };
  
//     return <button onClick={onClick} className='watchlistModalButton'>{buttonText}</button>;
//   }
