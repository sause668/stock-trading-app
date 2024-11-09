/** 
 * ### Profile Page Component
 * Displays a page containing *user information* whilst in the **logged in** state.
 * @param user Carries session user data. Required to display user-specific information on the page.
 */
export default function ProfilePage({ user }) {
    return (<>
        <h1>Investing</h1>
        <div id="profile-left">
            {/* The left side of the profile page holds the user's orders and previous transactions. */}
            <div id="profile-left__orders"></div>
            <div id="profile-left__transactions"></div>
        </div>
        <div id="profile-right">
            {/* The right side of the profile page holds the user's portfolio at the top, and watchlists at the bottom. */}
            <div id="profile-right__portfolio">

            </div>
            <div id="profile-right__watchlist">

            </div>
        </div>
    </>)
}