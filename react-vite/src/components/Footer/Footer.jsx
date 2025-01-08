import "./Footer.css";

function Footer() {

    const handleLinkButton = (link) => {
        window.location.href = link;
    }

    const aboutInfo = [
        {
            name: 'Ethan Guan',
            linkedIn: 'https://www.linkedin.com/in/ethan-guan-ba453a2a0/',
            gitHub: 'https://github.com/WildChargerTV'
        },
        {
            name: 'Brodrick Baker',
            linkedIn: 'https://www.linkedin.com/in/brodrick-baker/',
            gitHub: 'https://github.com/brodrickbaker'
        },
        {
            name: 'Kamara Reynolds',
            linkedIn: 'https://www.linkedin.com/in/kamara-reynolds-41248686/',
            gitHub: 'https://github.com/sause668'
        },
        {
            name: 'Stephen Young',
            linkedIn: '',
            gitHub: 'https://github.com/stephendyoungjr'
        },
    ]

    return (
        <div id="footerCon">
            <div id="infoConF">
                <h4 id="infoTitleF">About</h4>
                {aboutInfo.map((person, index) => (
                    <div className="personConF" key={`perInfo${index}`}>
                        <h5 className="personNameF">{person.name}:</h5>
                        <button 
                            className="linkButtonF"
                            onClick={() => handleLinkButton(person.linkedIn)}
                        >LinkedIn</button>
                        <button
                            className="linkButtonF"
                            onClick={() => handleLinkButton(person.gitHub)}
                        >GitHub</button>
                    </div>
                ))}
            </div>
            <img id="footerImg" src='/images/HoneyStock.png' alt='footer-img'/>
            {/* <img id="footerImg2" src='/images/HoneyStock.png' alt='footer-img'/> */}
        </div>
    )
}

export default Footer;
