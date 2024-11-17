 import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { deleteWatchlist, editWatchlist, removeWatchlistStock } from "../../../redux/watchlist"
import { useModal } from "../../../context/Modal"
import './Modules.css'


const WatchlistStockDelete = ({stock}) => {
    const dispatch = useDispatch()
    // const user_id = useSelector(state => state.session.user.id)

    const { watchlist_id, name } = stock
    // const [name, setListName] = useState(watchlistName)
    const [errors, setErrors] = useState({})
    const {closeModal} = useModal();
    


    // const handleClick = async (e) => {
    //     e.preventDefault()

    //     const watchListname = {
    //         watchlistId,
    //         name
    //     }

    //     if (!name) {
    //         return setErrors({
    //             error: "Please enter a list name"
    //         })
    //     }

    //     dispatch(editWatchlist(watchListname));
    //     closeModal();
    // }

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