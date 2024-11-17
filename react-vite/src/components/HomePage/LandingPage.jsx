import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormPage/SignupFormModal";

/** 
 * ### Landing Page Component
 * Displays a page containing *site information* whilst in the **logged out** state.
 * 
 * A majority of this information is *hardcoded*, as it is language that has been pulled directly from the real homepage.
 * The buttons all don't do much of anything, but at least they look pretty.
 * Please try to avoid modifying any of this unless it is absolutely needed.
 */
export default function LandingPage() {

    return (<main id="landing-main">
        {/* Container 1 */}
        <section id="landing-main__1">
            <h1>A new dawn<br /> for active traders</h1>
            <img src="https://images.ctfassets.net/ilblxxee70tt/75VBoZGYLdSxDAK1KYcg4F/0ac875eca491b3975abdbae63de36b08/Monitors_transparent_1038x412.png" alt="img1" />
        </section>

        {/* R.I.P Containers 2-6 */}

        {/* Container 7 */}
        <section id="landing-main__7">
            {/* This video is just the background animation for this container. 
            Loops indefinitely, has no controls, and is loaded for autoplay immediately when the page is loaded. */}
            <video
                src="https://videos.ctfassets.net/ilblxxee70tt/7H333U0Uq4p2gqka4ZSJ7k/914c77c35c549dc180f144e7bf70fea1/Dotcom_NewGeneration_Animation_WEB.mp4"
                type="video/mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
            />
            <div>
                <h2 style={{fontSize: "72px"}}>
                    Join a new generation<br />
                    of investors
                </h2>
                <OpenModalButton
                    buttonText="Sign up"
                    modalComponent={<SignupFormModal />}
                />
            </div>
        </section>
    </main>)
}