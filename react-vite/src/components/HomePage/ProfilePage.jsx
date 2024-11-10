/** 
 * ### Profile Page Component
 * Displays a page containing *user information* whilst in the **logged in** state.
 * @param user Carries session user data. Required to display user-specific information on the page.
 */
export default function ProfilePage({ user }) {
    return (<main id="profile-main">
        <h1>Investing</h1>
        <section id="profile-left">
            {/* The left side of the profile page holds the user's orders and previous transactions. */}
            <h2>Left Side Placeholder</h2>
            <p>
                I apologise for my incomplete understanding of the syntax and grammatical rules, and spelling of words, of the English 
                language, as I speak a language that is, in fact, not English, which is most likely evidenced to you, the reader, who 
                is most likely a homo sapiens sapiens, as am I, by the fact that the English I wrote this sentence to you in was 
                syntactically and grammatically incorrect and contained spelling errors, and probably assumed to be Russian as the 
                structure of my sentence corresponds to the stereotypical faux bad Russian attempt at English known to those of our 
                species who speak English.
            </p><p>
                What was your immediate and precise location when Club Penguin, an internet game designed for children but frequently 
                played by teenagers, young adults and adults of our species for the purpose of taking images of the game in which the 
                penguins these individuals of our species controlled were shown saying things that juxtaposed the context of the game, 
                such as using expletives and/or (but not limited to) making sexist, homophobic and/or racist statements (whether or not 
                those statements actually corresponded to the views of the individuals producing the images, or even those viewing them) 
                sometimes with text overlaid, for the purpose of humour, also known as a meme, was discontinued?
            </p><p>
                I, personally, was at my place of residence, assumedly a house built with materials such as, and in no particular order, 
                brick, mortar, plaster, copper, iron, glass, wood, plastic and concrete, consuming a processed corn based, savoury snack 
                with a dry, crispy texture and coated with cheese-like flavouring as a fine powder, known as the &apos;Dorito&apos;, when my 
                telecommunications device, in this case either a landline telephone, a hardwired device connected to an external network 
                (usually running underground) for the propose of transferring my voice with minimal latency to places a distance from my 
                home that would otherwise be too far for the recipient to hear, or a mobile telephone, which works on a similar principle 
                to the home phone however uses electromagnetic waves anywhere from 600 to 6000 MHz, depending on one&apos;s country of residence 
                and telecommunications service provider, to transmit one&apos;s voice, produced a sound, as it is designed to do, to alert me 
                to the fact that there was a person using their own telecommunications device in an effort to contact me.
            </p><p>
                The individual, whose voice was transmitted to me through the telecommunications device the individual reading this text 
                imagines the aforementioned individual to be speaking to me through (most likely determined by the reader&apos;s age, as there 
                has been a close to linear decline in households with landline telephones since approximately 2003), spoke, assumedly in 
                the same language that I was speaking, and said to me, &quot;Club penguin is kil&quot;, which the reader is likely to assume was in 
                my native language as it also contains poor grammar, syntax and spelling. This sentence informed me that the internet game 
                known as Club Penguin had been discontinued.
            </p><p>
                This shocked me, as I enjoyed viewing the memes individuals of my species produced using the game known as Club Penguin. 
                This is evidenced by my inability to say more than a single word in response to the news of the game&apos;s demise. Unable to 
                fully articulate the intensity of my feelings or thoughts regarding the shocking news that was just communicated to me 
                through the telecommunications device I was holding, I said a single word that reflected these inner processes and captured 
                the essence of my disbelief that something so important to me had ended: &quot;no&quot;.
            </p>
            <div id="profile-left__orders"></div>
            <div id="profile-left__transactions"></div>
        </section>
        <section id="profile-right">
            <h2>Right Side Placeholder</h2>
            {/* The right side of the profile page holds the user's portfolio at the top, and watchlists at the bottom. */}
            <div id="profile-right__portfolio">

            </div>
            <div id="profile-right__watchlist">

            </div>
        </section>
    </main>)
}