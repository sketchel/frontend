import { faPaintBrush, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from './Navbar'


export default function Landing(props) {
    return (
        <div className="section hero is-info is-bold">
        <div className="">
          <div className="hero-head">
            <Navbar loggedIn="false" props={props.props} />
          </div>
          <div align="center" className="hero-body has-text-centered justify-center">
            <h1 className="title">
            <FontAwesomeIcon icon={faPaintBrush} size="lg"></FontAwesomeIcon>
            </h1>
            <h1 className="title"><strong>Sketchel</strong></h1>
            <h2 className="subtitle">The newest platform to upload drawings/animations.</h2>
            <div className="field has-text-centered">
              <p className="control has-text-centered">
                <a className="button is-rounded is-info is-light" href="/register"> <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>&nbsp;Register for Sketchel here. </a>
                <a className="button left-spaced is-info is-light is-rounded" href="/login"> <FontAwesomeIcon icon={faSignInAlt}></FontAwesomeIcon> &nbsp;Or, you can login here. </a> 
              </p>
            </div>
          </div>
        </div>
      </div>
    )
}