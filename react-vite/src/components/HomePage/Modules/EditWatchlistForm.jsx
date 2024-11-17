 import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { editWatchlist } from "../../../redux/watchlist"
import { useModal } from "../../../context/Modal"
import './Modules.css'


const EditWatchListForm = (watchlist) => {
    const dispatch = useDispatch()
    const user_id = useSelector(state => state.session.user.id)


    const [name, setListName] = useState('')
    const [errors, setErrors] = useState({})
    const {closeModal} = useModal();



    const handleClick = async (e) => {
        e.preventDefault()

        const watchListname = {
            user_id,
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

    return (
        <>
            <h2>Create List </h2>
            <form onSubmit={handleClick}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setListName(e.target.value)}
                    placeholder="Enter watchlist name"
                />
                {errors.error && <p>{errors.error}</p>}
                <button type="submit" className="WatchlistSubmitButton">Create List</button>
            </form>
        </>
    )
}

export default EditWatchListForm