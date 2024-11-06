
// 
// 
// 
// CREATED TO TEST THUNKS AND REDUCER

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getWatchlist, addItem, deleteFromWatchlist } from "../../redux/watchlist";


const Watchlist = () => {
    const dispacth = useDispatch()
    const [stock, setStock] = useState('')

    useEffect(()=>{
        dispacth(getWatchlist())
    }, [dispacth]
    )

    const handleAddClick = async (e) => {
        e.preventDefault()
        const watchlistData = {
            stock
        }
        dispacth(addItem(watchlistData))
    }

    const handleRemoveClick = async (e) => {
        e.preventDefault()
        const watchlistData = {
            stock
        }
        dispacth(deleteFromWatchlist(watchlistData))
    }

    return (
        <>
        <h1> Watchlist</h1>
        <form onSubmit={handleRemoveClick}>
            <input
            type="text"
            value={stock}
            onChange={e => setStock(e.target.value.toUpperCase())}
            />
            <button type="submit">add to watchlist</button>
            <button type="submit">remove from watchlist</button>
        </form>
        </>
    )
}


export default Watchlist;