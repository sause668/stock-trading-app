import { addWatchlistStock } from "../../../redux/watchlist";
import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { RiPlayListAddLine } from "react-icons/ri";


const AddtoWatchlistModal = (props) => {
  
  const {stock, watchlists} = props
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()
    const watchlistId = document.getElementById('watchlist-add').value
    //if stock not already on the selected list add to list
    if (!watchlists.find(wlist => wlist.id == watchlistId).watchlist_stocks.find((wStock => wStock.name == stock.symbol))){
      dispatch(addWatchlistStock(watchlistId, stock.symbol))
    }    
    closeModal()
  }

  return (
    <div id='watchlist-modal'>
      <form onSubmit={handleSubmit}>
      <label>Select a watchlist </label>
      <select id='watchlist-add'>
        {watchlists.map((watchlist)=>{
          return (
          <option key={watchlist.id} value={watchlist.id}>{watchlist.name}</option>
        )
        })}
      </select>    
            <button type="submit" className="btn"><RiPlayListAddLine /></button>
      </form>
    </div>
  )
};

export default AddtoWatchlistModal;
