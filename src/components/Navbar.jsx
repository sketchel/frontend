import Link from 'next/link'
import { faCogs, faHome, faIdCard, faPowerOff, faSearch, faSignInAlt, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useCookie } from 'next-cookie'
import config from '../../config.json'
import { useEffect, useState } from 'react'

export default function Navbar(props) {
    const cookie = useCookie(props.cookie)
    let loggedIn = cookie.get('loggedIn') || null
    let [name, setName] = useState(null)

    useEffect(async () => {
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
      if (res.user) setName(res.user.name)
      if (!res.user && cookie.get('user')) {
        cookie.remove('user')
        cookie.remove('session')
        cookie.remove('loggedIn')
      }
    })
    const logout = async () => {
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
        <nav className="navbar">
            <div className="navbar-start">
                <Link href="/">
                    <a className="logo">
                        <img title="Sketchel!" alt="Sketchel" src="/assets/temp.png" height="48px" width="48px"></img>  
                    </a>
                </Link>
                <div className="navbar-element">
                    <Link href="/">
                        <button title="Go to the home page" className="button">
                            <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>&nbsp;Home
                        </button>  
                    </Link>
                </div>
            <div className="navbar-element">
                <Link target="_blank" href="https://discord.gg/xKpz5GjFqQ">
                    <button title="Redirects you to a URL for the discord server." className="button secondary">
                        <FontAwesomeIcon icon={faDiscord}></FontAwesomeIcon>
                    </button>  
                </Link>
            </div>
        </div>
        {!loggedIn ? (
            <div className="navbar-end">
            <Link href="/login">
                <button title="Sends you to the login page." className="button">
                    <FontAwesomeIcon icon={faSignInAlt}></FontAwesomeIcon>&nbsp;Login
                </button>  
            </Link>
            <Link href="/register">
                <button title="Sends you to the register page." className="button">
                    <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>&nbsp;Register
                </button>  
            </Link>
            </div>
        ) : (
            <div className="navbar-end">
                <Link target="_blank" href="/search">
                    <button title="Sends you to the search page" className="button secondary">
                        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                    </button>  
                </Link>
                <button className="button dropdown personal" title="Dropdown for profile specific things.">
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>&nbsp;{name}
                    <div class="dropdown-content">
                        <a href="/profile" title="Visit your profile"><FontAwesomeIcon icon={faIdCard}></FontAwesomeIcon>&nbsp;Profile</a>
                        <a href="/settings" title="Visit the settings page"><FontAwesomeIcon icon={faCogs}></FontAwesomeIcon>&nbsp;Settings</a>
                        <a onClick={logout} title="Logout of Sketchel"><FontAwesomeIcon icon={faPowerOff}></FontAwesomeIcon>&nbsp;Logout</a>
                    </div>
                </button>
            </div>
        )}
      </nav>
    )
}