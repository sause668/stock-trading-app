import { useState } from "react";
import { getStock, getUserStocks } from "../../redux/stock";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const StockSearchPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [stock, setStock] = useState('');
    const updateStock = (e) => setStock(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(getStock(stock))
        navigate(`${stock}`)
    }
    const doStuff = async (e) => {
        e.preventDefault();
        dispatch(getUserStocks())
    }
  
 return (
    <>
        <h1>Search for a Stock</h1>
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
        <button type="submit" className='btn' onClick={doStuff}>user</button>
    </>

  )
};

export default StockSearchPage;
