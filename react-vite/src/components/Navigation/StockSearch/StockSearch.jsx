import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const StockSearch = () => {
    const navigate = useNavigate();

    const [stock, setStock] = useState('');
    const updateStock = e => setStock(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();
        // if (!stock){
        //     return window.alert('Please enter a stock symbol')
        // }
        navigate(`stocks/${stock}`)
        setStock('')
    }
  
 return (
    <form onSubmit={handleSubmit} >
        <input
            id="stock-search"
            name='stock'
            type="text"
            placeholder="Enter Stock Symbol"
            value={stock}
            onChange={updateStock} />
        <button type="submit" className="nav-btn"><FaSearch/></button>
    </form>
  )
};

export default StockSearch;
