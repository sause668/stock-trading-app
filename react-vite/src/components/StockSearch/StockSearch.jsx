import { useState } from "react";
import { getStock } from "../../redux/stock";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const StockSearch = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [stock, setStock] = useState('');
    const updateStock = e => setStock(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(getStock(stock))
        setStock('')
        navigate(`stocks/${stock}`)
    }
  
 return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="stock"></label>
        <input
            name='stock'
            type="text"
            placeholder="Enter Stock Symbol"
            value={stock}
            onChange={updateStock} />
        <button type="submit">Search Stock</button>
    </form>
  )
};

export default StockSearch;
