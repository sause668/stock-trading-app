import { useSelector } from "react-redux";
import LandingPage from "./LandingPage";
import ProfilePage from "./ProfilePage";
import "./HomePage.css";

/** ### Home Page Component
 * Abstraction layer determining what gets displayed on the homepage whilst retaining modularity. On its own, this page has no content.
 * @returns A ternary operator which utilizes `sessionUser` to determine whether to display the `ProfilePage` or the `LandingPage`.
 */
export default function HomePage() {
    const sessionUser = useSelector((state) => state.session.user);

    return (<> { sessionUser ? <ProfilePage user={sessionUser} /> : <LandingPage /> } </>)
}