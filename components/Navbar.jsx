
import { FaDiscord, FaHome } from 'react-icons/fa'

export default function Navbar(props) {
    return (
        <header>
            <nav className="navbar" role="navigation" aria-label="main navigation">
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
                {props.loggedIn === "false" ? (
                    <div className="navbar-menu is-active" id="navbar">
                        <div className="navbar-start">
                            <a className="navbar-item left-spaced" href="https://discord.com/invite/WTJeh8eCVD"> <FaDiscord size="1.5em"/>&nbsp;Discord</a>
                        </div>
                        <div className="navbar-end">
                            <a className="navbar-item" href="/login">
                                <i class="fas fa-sign-in-alt"></i>&nbsp;Login
                            </a>
                            <a className="navbar-item" href="/register">
                                <i class="fas fa-user-plus"></i>&nbsp;Register
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="navbar-menu is-active" id="navbar">
                        <div className="navbar-start">
                            <a className="navbar-item" href="/hot">
                                <i class="fas fa-fire"></i>&nbsp;Popular
                            </a>
                            <a className="navbar-item" href="/feed">
                                <i class="fas fa-rss-square"></i>&nbsp;Feed
                            </a>
                            <a className="navbar-item" href="/search">
                                <i class="fas fa-search"></i>&nbsp;Search
                            </a>                            
                        </div>
                        <a className="navbar-item left-spaced" href="/profile"> <i className="fas fa-user-circle"></i>&nbsp;Profile</a>
                        <a className="navbar-item left-spaced"> <i className="fas fa-sign-out-alt"></i>&nbsp;Logout</a>
                    </div>
                )}
            </nav>
        </header>
    )
}