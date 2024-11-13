import { getTransactionsThunk } from "../../redux/transactionThunks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const UserChart = () => {
  const transactions = useState(state => state.transactions.transactions)
  const dispatch = useDispatch()  

  useEffect(() => {
    dispatch(getTransactionsThunk())
  },[dispatch])
    console.log(transactions)
    return (
    <div>
      transactions
    </div>
  )
};

export default UserChart;
