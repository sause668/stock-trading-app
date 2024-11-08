import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionsThunk, deleteTransactionThunk } from '../../redux/transactionThunks';
import './TransactionsComponent.css';

const Transactions = () => {
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transactions.transactions);

    useEffect(() => {
        dispatch(getTransactionsThunk());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteTransactionThunk(id));
    };

    return (
        <div className="transactions-container">
            <h1>Transaction History</h1>
            <ul className="transactions-list">
                {transactions.map((transaction) => (
                    <li key={transaction.id} className="transaction-item">
                        <span>{transaction.stock}: {transaction.amount} shares @ ${transaction.price}</span>
                        <button onClick={() => handleDelete(transaction.id)} className="delete-button">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Transactions;
