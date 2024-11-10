import { OrderModule, PortfolioModule, TransactionModule, WatchlistModule } from "./Modules";
import "./StockList.css"; // for the stock listing on the right side of the page

/** 
 * ### Profile Page Component
 * Displays a page containing *user information* whilst in the **logged in** state.
 * 
 * Also largely an abstraction layer; consists mostly of four modules and orders them appropriately on the page itself.
 * The page is split into two halves. The left half manages the user's Orders and Transactions. The right half manages
 * the user's Portfolio (owned stock list) and existing Watchlists.
 * @param user Carries session user data. Ultimately passed to all submodules for later use.
 */
export default function ProfilePage({ user }) {
    return (<main id="profile-main">

        {/* Page Title */}
        <h1>Investing</h1>

        {/* The left side of the profile page holds the user's orders and previous transactions. */}
        <section id="profile-left">
            {/* This h2 can be removed once visible content exists inside the below modules. */}
            <h2>Left Side Placeholder</h2>
            <OrderModule user={user} />
            <TransactionModule user={user} />
        </section>

        {/* The right side of the profile page holds the user's portfolio at the top, and watchlists at the bottom. */}
        <section id="profile-right">
            <PortfolioModule user={user} />
            <WatchlistModule user={user} />
        </section>

    </main>)
}