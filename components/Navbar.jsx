
import { FaDiscord, FaHome } from 'react-icons/fa'

export default function Navbar() {
    return (
        <header>
            <nav className="navbar is-spaced" role="navigation" aria-label="main navigation">
                <a href="/" className="navbar-brand">
                    <figure className="image is-48x48">
                        <img src="/Sketchel.png" alt="Logo" />
                    </figure>
                    <a className="navbar-burger" role="button" data-target="navbar" aria-label="menu" aria-expanded="false">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </a> 
                <div className="navbar-menu is-active" id="navbar">
                    <div className="navbar-start">
                        <a className="navbar-item" href="https://discord.com/invite/WTJeh8eCVD"> <FaDiscord size="1.5em"/>&nbsp;Discord</a>
                    </div>
                </div>
            </nav>
        </header>
    )
}