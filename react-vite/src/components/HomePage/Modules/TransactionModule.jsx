import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionsThunk, deleteTransactionThunk } from "../../../redux/transactionThunks";

/**
 * ### Transaction Module
 * Intended only for use within the `ProfilePage` component.
 * 
 * Displays relevant user data pertaining to orders they have created.
 */
export default function TransactionModule() {
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transactions.transactions);

    useEffect(() => {
        dispatch(getTransactionsThunk());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteTransactionThunk(id));
    };

    return (<div id="profile-left__transactions" className="profile-module">
        {/* Code here */}
        <h2 className="profile-module__title">Transaction History</h2>
        <ul className="transactions-list">
            {transactions ?
                transactions.map((transaction) => (
                    <li key={transaction.id} className="transaction-item">
                        <span>{transaction.stock}: {transaction.amount} shares @ ${transaction.price}</span>
                        <button onClick={() => handleDelete(transaction.id)} className="delete-button">
                            Delete
                        </button>
                    </li>
                )) : <p>No Transaction History available. Purchase a stock and it'll show up here!</p>
            }
        </ul>
    </div>)
}