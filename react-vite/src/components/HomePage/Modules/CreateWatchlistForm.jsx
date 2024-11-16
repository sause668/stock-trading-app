import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { createWatchlist } from "../../../redux/watchlist"


const CreateWatchListForm = () => {
    const dispatch = useDispatch()
    const user_id = useSelector(state => state.session.user.id)


    const [name, setListName] = useState('')
    const [errors, setErrors] = useState({})


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

        dispatch(createWatchlist(watchListname))
    }

    return (
        <>
            <h2>Create List </h2>
            <form onSubmit={handleClick}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setListName(e.target.value)}
                />
                {errors.error && <p>{errors.error}</p>}
                <button type="submit">Create List</button>
            </form>
        </>
    )
}

export default CreateWatchListForm