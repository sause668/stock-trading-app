import { useState } from "react";
import { getStock } from "../../redux/stock";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const StockPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [stock, setStock] = useState('');
    const updateStock = (e) => setStock(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(getStock(stock))
        navigate(`${stock}`)
    }
  
 return (
    <>
        <h1>Stock Page</h1>
        <form onSubmit={handleSubmit}>
           <label htmlFor="stock"></label>
           <input
              name='stock'
              type="text"
              placeholder="Enter Stock Symbol"
              value={stock}
              onChange={updateStock} />
              <button type="submit" className='btn'>Search Stock</button>
        </form>
    </>

  )
};

export default StockPage;
