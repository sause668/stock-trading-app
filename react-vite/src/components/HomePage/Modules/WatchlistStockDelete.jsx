import { useDispatch, } from "react-redux"

import { removeWatchlistStock } from "../../../redux/watchlist"
import { useModal } from "../../../context/Modal"
import './Modules.css'


const WatchlistStockDelete = ({stock}) => {
    const dispatch = useDispatch()

    const { watchlist_id, name } = stock
    const {closeModal} = useModal();

    const handleDelete = async () => {
        dispatch(removeWatchlistStock(watchlist_id, name));
        closeModal();
    }
    



    return (
        <>
            <h3>{`Are you sure you want to delete ${stock.name}?`}</h3>
            <div >
                <button onClick={handleDelete} className="WatchlistSubmitButton">Yes</button>
                <button onClick={closeModal} className="WatchlistSubmitButton">No</button>
            </div>
            <br/>
            
        </>
    )
}

export default WatchlistStockDelete