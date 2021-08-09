import { faHandPeace } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from './Navbar'


export default function Landing2(props) {
    return (
        <div className="section hero is-small is-info is-bold">
            <div className="hero-head">
                <Navbar loggedIn="true" name={props.name}/>
            </div>
            <div align="center" className="hero-body has-text-centered justify-center">
                <h1 className="title">
                <FontAwesomeIcon icon={faHandPeace} size="2x"></FontAwesomeIcon>
                </h1>
                <h1 className="title"><strong>Welcome back!</strong></h1>
            </div>
        </div>
    )
}