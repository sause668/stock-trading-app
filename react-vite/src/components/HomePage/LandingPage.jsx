/** 
 * ### Landing Page Component
 * Displays a page containing *site information* whilst in the **logged out** state.
 * 
 * A majority of this information is *hardcoded*, as it is language that has been pulled directly from the real homepage.
 */
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (<main id="landing-main">
        <section id="landing-main__1">
            <h1>A new dawn<br /> for active traders</h1>
            <img src="https://images.ctfassets.net/ilblxxee70tt/75VBoZGYLdSxDAK1KYcg4F/0ac875eca491b3975abdbae63de36b08/Monitors_transparent_1038x412.png" alt="img1" />
        </section>
        <section id="landing-main__2">
            <img src="https://images.ctfassets.net/ilblxxee70tt/4NWHCzFa7ee5AiQevYB7OF/a3dd4cde901eca2a870f0baa6613a2dd/Products_478x157_2x.png" alt="img2" />
            <div>
                <p>
                    Introducing three powerful, new products built for 
                    the next generation of active traders: Robinhood 
                    Legend, Futures, and Index Options. Learn how they 
                    can take your portfolio to the next level.
                </p>
                <button>Learn More</button>
            </div>
        </section>
        <section id="landing-main__3">
            <img src="https://images.ctfassets.net/ilblxxee70tt/O4pyANOxixg2fpvPhmAVB/6ab74fe5e523beee31f14a933f490888/web_home_invest_hero.png" alt="img3" />
            <div>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", height: "726px"}}>
                    <h2 style={{fontSize: "40px"}}>
                        <span style={{opacity: 0.4}}>Investing</span><br />
                        Build your portfolio<br />
                        starting with just $1
                    </h2>
                    <p>
                        Invest in stocks, ETFs, and their options, at your<br />
                        pace and commission-free.
                    </p>
                    <button style={{width: "max-content"}}>Investing Disclosures</button>
                    <button style={{width: "max-content"}}>Learn more</button>
                </div>
                <p className="landing-disclaimer">
                    Stocks & funds offered through Robinhood Financial. Other fees<br />
                    may apply. See our <Link to={"https://cdn.robinhood.com/assets/robinhood/legal/RHF%20Fee%20Schedule.pdf"}>Fee Schedule</Link> for more details.
                </p>
            </div>
        </section>
        <section id="landing-main__4">
            <svg id="landing-crypto" aria-label="Robinhood Crypto Logo" height="7%" viewBox="0 0 1199.7 149.5" >
                <g>
                    <path d="M866.8,33.1c17.9,0,26.6,11.7,28.4,25.4h9c-1.9-20-15.2-33.4-37.3-33.4c-25,0-42,19-42,50.1 c0,31.1,17,50.1,42,50.1c22.1,0,35.3-13.4,37.3-33.4h-9c-1.8,13.7-10.5,25.4-28.4,25.4c-19.5,0-32.7-15.2-32.7-42.1 C834.1,48.4,847.2,33.1,866.8,33.1z" />
                    <path d="M931.5,63.6c-0.7,1.1-1,1.2-1.7,1.2s-1.1-0.6-1.1-1.4v-9.7H921v69.9h8.3V83c0-12.8,8.1-21.8,19.3-21.8 c1.5,0,5,0.3,6.8,0.6l0.1-8.7c-1.9-0.4-3.6-0.6-5.4-0.6C942.3,52.5,935.4,57.3,931.5,63.6z" />
                    <path d="M994,110.5c-0.3,0.7-0.7,1-1.2,1c-0.6,0-1-0.3-1.2-1L971,53.8h-8.8l26.4,70.5l-2.9,7.7 c-2.2,6.1-5.4,8.8-10.5,8.8c-2.6,0-4.7-0.6-6.8-1.4l-2.5,7.2c2.2,1,5.8,1.8,9,1.8c9.8,0,14.6-5,18.2-14.6l30-80h-8.4L994,110.5z" />
                    <path d="M1061.1,52.5c-7,0-14.1,2.5-19.6,8.8c-0.6,0.6-0.8,1-1.5,1s-1.1-0.6-1.1-1.4v-7.2h-7.7V147h8.3v-30 c0-0.8,0.4-1.4,1.1-1.4s1,0.4,1.5,1c4.6,5.1,10.6,8.3,19,8.3c16,0,28.3-12.4,28.3-36.2C1089.4,64.9,1077.1,52.5,1061.1,52.5z M1059.6,117.2c-15.2,0-21-12.1-21-28.6c0-16.6,5.8-28.6,21-28.6s21,12.1,21,28.6S1074.8,117.2,1059.6,117.2z"></path>
                    <path d="M1124.5,117.2c-7.5,0-10.2-4.7-10.2-12.8v-43h20.2v-7.6h-20.2V35.3h-7.2V46c0,6.8-2.5,8.6-9,8.6h-0.8v6.8h8.7 v44.3c0,10.9,4.6,19.2,17.4,19.2c5.2,0,9.2-1.2,11.9-2.6l-2.1-6.9C1131.1,116.4,1127.5,117.2,1124.5,117.2z"></path>
                    <path d="M1169.9,52.5c-18.6,0-29.8,13-29.8,36.2c0,23.3,11.2,36.2,29.8,36.2s29.8-12.8,29.8-36.2 C1199.7,65.5,1188.5,52.5,1169.9,52.5z M1169.9,117.2c-15.2,0-21-12-21-28.6c0-16.4,5.8-28.6,21-28.6s21,12.1,21,28.6 C1190.8,105.2,1185,117.2,1169.9,117.2z"></path>
                    <path d="M275.4,52.2c-20.4,0-32.9,13.2-32.9,36.4c0,23.1,12.5,36.3,32.9,36.3c20.6,0,32.8-13.2,32.8-36.3 C308.2,65.4,296,52.2,275.4,52.2z M275.4,114.3c-12.9,0-18.1-10.6-18.1-25.6c0.1-15.2,5.2-25.7,18.1-25.7 c12.9,0,18.1,10.5,18.1,25.6C293.5,103.6,288.3,114.3,275.4,114.3z"></path>
                    <path d="M462.3,52.2c-10.1,0-16,4.6-20.4,10.5c-0.6,0.7-1.1,1.4-2.1,1.4S438,63.4,438,62v-8.4h-13.2v70h14V85 c0-12.5,6.7-21.4,17.2-21.4c9.9,0,14.8,5.7,14.8,18.1v41.9h14V78C484.8,61.9,477.5,52.2,462.3,52.2z"></path>
                    <path d="M537.1,52.2c-9.4,0-15.5,4.2-19.6,9.5c-0.6,0.7-1.1,1.4-2.1,1.4s-1.8-0.7-1.8-2.1V23.4h-14v100.2h14V85 c0-12.5,6.7-21.4,17.2-21.4c9.9,0,14.8,5.7,14.8,18.1v41.9h14V78C559.6,61.9,552.3,52.2,537.1,52.2z"></path>
                    <path d="M603.3,52.2c-20.4,0-32.9,13.2-32.9,36.4c0,23.1,12.5,36.3,32.9,36.3c20.6,0,32.8-13.2,32.8-36.3 C636,65.4,623.9,52.2,603.3,52.2z M603.3,114.3c-12.9,0-18.1-10.6-18.1-25.6c0-15.1,5.2-25.6,18.1-25.6c12.9,0,18.1,10.5,18.1,25.6 C621.3,103.6,616.2,114.3,603.3,114.3z"></path>
                    <path d="M676.7,52.2c-20.4,0-32.9,13.2-32.9,36.4c0,23.1,12.5,36.3,32.9,36.3c20.6,0,32.8-13.2,32.8-36.3 C709.5,65.4,697.3,52.2,676.7,52.2z M676.7,114.3c-12.9,0-18.1-10.6-18.1-25.6c0-15.1,5.2-25.6,18.1-25.6 c12.9,0,18.1,10.5,18.1,25.6C694.8,103.6,689.6,114.3,676.7,114.3z"></path>
                    <rect height="70" width="14" x="395.6" y="53.6"></rect><rect height="16" width="15" x="395" y="23.4"></rect>
                    <path d="M74,33.7H43.6c-1.1,0-2.1,0.4-2.8,1.4L19,62.1c-3.2,4-4,7.7-4,13v27.6c-7.1,19.9-11.6,33.4-14.9,45.6 c-0.3,0.8,0.1,1.2,0.8,1.2h3.3c0.6,0,1.1-0.3,1.4-0.8c24.9-63.4,52-94.8,69-113.6C75.3,34.3,75,33.7,74,33.7z"></path>
                    <path d="M74.9,2.6C73,3.5,72,3.7,70,5.5c-9,7.7-15,13.8-20.7,19.8c-0.7,0.7-0.4,1.4,0.6,1.4h33.7 c3.1,0,4.9,1.8,4.9,4.9v38c0,1,0.8,1.3,1.4,0.4l20.3-26.5c3.3-4.3,4.3-5.6,5.2-11.6c1.2-8.8,0.5-22.3-4.8-27.9 C105.9-1,84.7-1.2,74.9,2.6z"></path>
                    <path d="M80,41.3c-20.9,23.3-37.2,47.8-52.3,77.3c-0.4,0.8,0.1,1.4,1,1.1l31.2-9.6c3.5-0.9,5.5-2.5,7.2-5.3L81,81.9 c0.3-0.6,0.4-1.3,0.4-1.8V41.9C81.4,40.9,80.7,40.5,80,41.3z"></path>
                    <path d="M767.7,59.2c0,1.4-0.8,2.1-1.8,2.1c-0.7,0-1.7-0.7-2.1-1.1c-5-5.3-10.4-8-18.9-8c-15.1,0-27.4,11.6-27.4,36.4 c0,24.8,12.3,36.3,27.4,36.3c8.8,0,14.3-3.4,19.6-8.7c0.8-0.8,1.4-1.3,2.1-1.3c1,0,1.8,0.7,1.8,2.1v6.6h13.3V23.4h-14V59.2z M750.2,114.2c-12.9,0.1-18.1-10.6-18.1-25.6c0-15.1,5.2-25.6,18.1-25.6c13,0,18.1,10.5,18.1,25.6 C768.3,103.6,763.3,114.2,750.2,114.2z"></path>
                    <path d="M356.6,52.2c-8.5,0-13.9,2.7-18.9,8c-0.4,0.4-1.4,1.1-2.1,1.1c-1,0-1.8-0.7-1.8-2.1V23.4h-14v100.2H333V117 c0-1.4,0.8-2.1,1.8-2.1c0.7,0,1.3,0.4,2.1,1.3c5.3,5.3,10.8,8.7,19.6,8.7c15.1,0,27.5-11.5,27.5-36.3 C384,63.8,371.7,52.2,356.6,52.2z M351.2,114.3c-13,0-18.1-10.6-18.1-25.6c0-15.1,5-25.6,18.1-25.6c12.9,0,18.1,10.5,18.1,25.6 C369.3,103.6,364.1,114.3,351.2,114.3z"></path>
                    <path d="M220.5,79c-1.1-0.4-1.5-1.1-1.5-2c0-1,0.4-1.4,1.7-2.1c7.6-3.6,12.2-10.8,12.2-20.6 c0-17.2-10.8-27.6-32.5-27.6H163v96.9h14.8v-40h23.9c11.3,0,15.1,4.8,15.4,12.6l1.4,27.4h14.6l-1.5-28.4 C231,85.8,227.3,81.5,220.5,79z M199.4,72.1h-21.6V38.5h21.6c11.2,0,18.1,5.5,18.1,16.8S210.6,72.1,199.4,72.1z"></path>
                </g>
            </svg>
            <div>
                <div>
                    <h2 style={{fontSize: "40px"}}>
                        Dive right in without<br />
                        the commission fees
                    </h2>
                    <p>
                        Get more crypto for your cash—and start with as<br />
                        little as $1. Buy, sell, and transfer BTC, DOGE, ETH,<br />
                        SHIB, and more.
                    </p>
                    <button>Crypto Risk Disclosures</button><br />
                    <button>Learn more</button>
                </div>
                <p className="landing-disclaimer">Crypto offered through Robinhood Crypto.</p>
            </div>
        </section>
        <section id="landing-main__5">
            <div style={{height: "284px"}}>
                <h2 style={{fontSize: "52px"}}>
                    Robinhood Protection<br />
                    Guarantee
                </h2>
                <button>Learn more about our commitments</button>
            </div>
            <div id="landing-5-grid">
                <div>
                    <img src="https://images.ctfassets.net/ilblxxee70tt/4eSlnvgaWAu2jaCVAyRcrY/602aa63fb17d4448ef651bd2944e963a/illo_secure.svg" alt="grid1" />
                    <h3>We work hard to keep your data safe and secure.</h3>
                </div>
                <div>
                    <img src="https://images.ctfassets.net/ilblxxee70tt/DwoUYJLid0EWhDOJPjFYN/673186170fb52deebdfaeb3691a28cac/illo_protect.svg" alt="grid2" />
                    <h3>We protect your account from unauthorized activity.</h3>
                </div>
                <div>
                    <img src="https://images.ctfassets.net/ilblxxee70tt/2KMkk3plAKjRG2fPBI69a1/18a5f48bbf278bc91008f6904096b559/illo_multi-factor.svg" alt="grid3" />
                    <h3>We provide multi-factor authentication on all accounts.</h3>
                </div>
                <div>
                    <img src="https://images.ctfassets.net/ilblxxee70tt/4u2J3HEANe8rXfdytWGpAC/72bd780bca181f59b40dcf8c51f0e996/illo_247.svg" alt="grid4" />
                    <h3>We&apos;ve got your back. We&apos;re available to you 24/7.</h3>
                </div>
            </div>
        </section>
        <section id="landing-main__6">
            <div>
                <h2 style={{fontSize: "52px", margin: "60px 16px 12px 16px"}}>
                    Become a better investor<br />
                    on the go, right in the app
                </h2>
                <p style={{margin: "12px 16px 12px 16px"}}>Here&apos;s a preview of the things you can learn when you sign up.</p>
                <button style={{margin: "24px 16px 12px 16px"}}>Sign up to access Robinhood Learn</button>
                <img
                    style={{maxWidth: "608px"}}
                    src="https://images.ctfassets.net/ilblxxee70tt/PKdx5QPF2hxl9vcbxm55W/b1942354f732fbb69a019c53c73bf46b/homepage_learn_phone_2x.png" 
                    alt="img4" 
                />
            </div>
        </section>
        <section id="landing-main__7">
            <video
                src="https://videos.ctfassets.net/ilblxxee70tt/7H333U0Uq4p2gqka4ZSJ7k/914c77c35c549dc180f144e7bf70fea1/Dotcom_NewGeneration_Animation_WEB.mp4"
                type="video/mp4"
                autoPlay="true"
                loop="true"
                muted=""
                playsInline=""
                preload="auto"
            />
            <div>
                <h2 style={{fontSize: "72px"}}>
                    Join a new generation<br />
                    of investors
                </h2>
                <button style={{width: "max-content"}}>Sign up</button>
            </div>
        </section>
    </main>)
}