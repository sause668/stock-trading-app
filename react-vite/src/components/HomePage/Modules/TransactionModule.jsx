import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionsThunk } from "../../../redux/transactionThunks";

/**
 * ### Transaction Module
 * Intended only for use within the `ProfilePage` component.
 * 
 * Displays relevant user data pertaining to orders they have created.
 */
export default function TransactionModule() {
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.portfolio.transactions);

    useEffect(() => {
        dispatch(getTransactionsThunk());
    }, [dispatch]);

    return (<div id="profile-left__transactions" className="profile-module">
        {/* Code here */}
        <h2 className="profile-module__title">Transaction History</h2>
        <div id="profile-transaction-list">
            {transactions
                ? transactions.map((transaction) => <SingleTransaction key={transaction.id} transaction={transaction} />)
                : <p>No Transaction History available. Purchase a stock and it'll show up here!</p>
            }
        </div>
    </div>)
}

/**
 * ### Single Transaction Helper Module
 * This component takes transaction data and retruns a pre-filled transaction cell to be
 * displayed on the page.
 */
function SingleTransaction({ transaction }) {
    const formatter = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });
    return (<div className="profile-transaction-record">
        <p>
            {transaction.stock}:
            <span className="profile-transaction__prc">{formatter.format(transaction.price)}</span>
            <span className="profile-transaction__act">{transaction.action}</span>
            {transaction.amount}<span className="profile-transaction__amt"> shares</span>
            {new Date(transaction.date_created).toLocaleString('en-US', { timeZone: "GMT" })}
        </p>
    </div>)

}
