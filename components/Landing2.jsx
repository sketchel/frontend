import Navbar from './Navbar'


export default function Landing2(props) {
    console.log(props)
    return (
        <div className="section hero is-small is-info is-bold">
            <div className="hero-head">
                <Navbar loggedIn="true" wrapper={props.wrapper} />
            </div>
            <div align="center" className="hero-body has-text-centered justify-center">
                <h1 className="title">
                <i className="em em em-wave" ariaRole="presentation"></i>
                </h1>
                <h1 className="subtitle"><strong>Welcome back!</strong></h1>
            </div>
        </div>
    )
}