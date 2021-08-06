import { useCookie } from 'next-cookie'
import config from '../../config.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faUserPlus, faFire, faRssSquare, faSearch, faPaintBrush, faBell, faSign } from '@fortawesome/free-solid-svg-icons'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'

export default function Navbar(props) {
    const cookie = useCookie(props.cookie)
    const getUser = async event => {
        let res = await fetch(
          config.API_BASE + '/users/@me',
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': cookie.get('session')
            },
            method: 'GET'
          }
        )
        res = await res.json()
        if (!res.user && cookie.get('user')) {
            cookie.remove('user')
            cookie.remove('session')
            cookie.remove('loggedIn')
            window.location.reload()
        }
        if (res.user) document.getElementById('name').innerHTML = res.user.name
    }

    const logout = async event => {
        await fetch(
          config.API_BASE + '/users/logout',
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': cookie.get('session')
            },
            method: 'GET'
          }
        )
        cookie.remove('user')
        cookie.remove('session')
        cookie.remove('loggedIn')
        window.location.reload()
    }

    return (
        <header onLoad={getUser}>
            <nav className="navbar is-spaced" role="navigation" aria-label="main navigation">
                <a href="/" className="navbar-brand">
                    <figure className="image is-48x48">
                        <img src="/assets/Sketchel.png" alt="Logo" />
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
                            <a className="navbar-item left-spaced" href="https://discord.com/invite/WTJeh8eCVD"> <FontAwesomeIcon icon={faDiscord}/>&nbsp;Discord</a>
                        </div>
                        <div className="navbar-end">
                            <a className="navbar-item" href="/login">
                                <FontAwesomeIcon icon={faSignInAlt}/>&nbsp;Login
                            </a>
                            <a className="navbar-item" href="/register">
                                <FontAwesomeIcon icon={faUserPlus}/>&nbsp;Register
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="navbar-menu is-active" id="navbar">
                        <div className="navbar-start">
                            <a className="navbar-item" href="/hot">
                                <FontAwesomeIcon icon={faFire}/>&nbsp;Popular
                            </a>
                            <a className="navbar-item" href="/feed">
                                <FontAwesomeIcon icon={faRssSquare}/>&nbsp;Feed
                            </a>      
                            <a className="navbar-item" href="/search">
                                <FontAwesomeIcon icon={faSearch}/>&nbsp;Search
                            </a>                                       
                        </div>
                        <div className="navbar-end">
                            <a className="navbar-item"> <FontAwesomeIcon icon={faBell}/></a>
                            <a className="navbar-item" href="/create"> <FontAwesomeIcon icon={faPaintBrush}/></a>
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link" id="name">Your Name Here</a>
                                <div className="navbar-dropdown">
                                    <a className="navbar-item" href="/profile"> Profile</a>
                                    <a className="navbar-item" href="/settings"> Settings</a>
                                    <hr className="navbar-divider"></hr>
                                    <a className="navbar-item" onClick={logout}> Logout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}

export function getServerSideProps(context) {
    const cookie = useCookie(context)
    return {
      props: {
        loggedIn: cookie.get('loggedIn') || null,
        session: cookie.get('session') || null,
        user: cookie.get('user') || null,
        cookie: context.req.headers.cookie || ''
       }
    }
  }