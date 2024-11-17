/** The below "components" are helpers for code that would otherwise have been repeated a lot in the Stock List
    on the right side of the profile page. Not to be included in the re-exporter for HomePage. */
import { FaMinus } from "react-icons/fa";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { useModal } from '../../../context/Modal';
import EditWatchListForm from "./EditWatchlistForm";

/**
 * ### Single Stock Helper Component
 * This component takes stock data and creates a pre-filled stock cell that nicely fits onto the list.
 * 
 * @param {object} stock The stock data to pass in.
 * @returns 
 */
export default function SingleStock({ mode, stock }) {
    // Set the stock's class based on its mode.
    const className = mode === "portfolio" 
        ? "profile-portfolio-stock"
        : "profile-watchlist-stock";

    // Determine the stock value's text color based on whether the value has increased or decreased.
    stock.color = (() => {
        const diff = stock.newValue - stock.value;
        if(diff > 0) return "lawngreen";
        else if(diff < 0) return "red";
        else return "yellow"; // TODO probably just white instead
    })();
    // Using that color value, determine what trend symbol should be displayed next to the stock.
    stock.arrow = (() => {
        switch(stock.color) {
            case "lawngreen":
                return <TiArrowSortedUp />;
            case "yellow":
                return <sup style={{marginRight: "2px"}}>~</sup>;
            case "red":
                return <TiArrowSortedDown />;
        }
    })();
    // Calculate the value trend for the stock.
    stock.trend = (() => {
        const trend = (stock.newValue - stock.value) / stock.value;
        return trend.toFixed(2);
    })();

    return (<div className={className}>
        <p>
            {stock.name}:
            <span className="profile-stock__val" style={{color: stock.color}}>{stock.arrow}
                ${stock.value}
                {mode === "watchlist" ? ` (${stock.trend}%)` : ""}
            </span>
            {mode === "portfolio" ? <>{stock.amount}<span className="profile-stock__amt"> shares</span></> : ""}
        </p>
        {/* This is the "delete stock from watchlist" button. Obviously, only appears in watchlist mode. */}
        {mode === "watchlist" ? <WatchlistStockModalButton
                    buttonText={<FaMinus />}
                    modalComponent={<EditWatchListForm ></EditWatchListForm>}
                /> : <></>}
    </div>)
}

function WatchlistStockModalButton({
    modalComponent, // component to render inside the modal
    buttonText, // text of the button that opens the modal
    onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
    onModalClose // optional: callback function that will be called once the modal is closed
  }) {
    const { setModalContent, setOnModalClose } = useModal();
  
    const onClick = () => {
      if (onModalClose) setOnModalClose(onModalClose);
      setModalContent(modalComponent);
      if (typeof onButtonClick === "function") onButtonClick();
    };
  
    return <button onClick={onClick} className='watchlistModalButton'>{buttonText}</button>;
  }