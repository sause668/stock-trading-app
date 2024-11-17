 import { useState } from "react"
import { useDispatch } from "react-redux"

import { deleteWatchlist, editWatchlist } from "../../../redux/watchlist"
import { useModal } from "../../../context/Modal"
import './Modules.css'


const EditWatchListForm = ({watchlistId, watchlistName}) => {
    const dispatch = useDispatch()


    const [name, setListName] = useState(watchlistName)
    const [errors, setErrors] = useState({})
    const {closeModal} = useModal();


    const handleClick = async (e) => {
        e.preventDefault()

        const watchListname = {
            watchlistId,
            name
        }

        if (!name) {
            return setErrors({
                error: "Please enter a list name"
            })
        }

        dispatch(editWatchlist(watchListname));
        closeModal();
    }

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete ${watchlistName}?`)) {
            dispatch(deleteWatchlist(watchlistId));
            closeModal();
        }
    }



    return (
        <>
            <h2>Edit List </h2>
            <form onSubmit={handleClick}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setListName(e.target.value)}
                    placeholder="Enter watchlist name"
                />
                {errors.error && <p>{errors.error}</p>}
                <button type="submit" className="WatchlistSubmitButton">Edit List</button>
            </form>
            <br/>
            <button onClick={handleDelete} className="WatchlistSubmitButton">Delete List</button>
        </>
    )
}

export default EditWatchListForm