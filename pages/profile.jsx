import config from '../config.json'
import { useCookie } from 'next-cookie'
import moment from 'moment'

import Container from '../components/Container'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Profile(props) {
  const cookie = useCookie(props.cookie)
  const submitChanges = async (event) => {
    event.preventDefault()
    let res = await fetch(config.API_BASE + '/users/profile', {
      body: JSON.stringify({
        bio: event.target.bio.value
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': cookie.get('session')
      },
      method: 'POST'
    })
    res = await res.json()
    window.location.reload()
  }

  return (
    <>
      <Container>
        {props.loggedIn ? (
          <Navbar loggedIn="true" />
        ) : (
          <Navbar loggedIn="false" />
        )}
        <script src="/js/modal.js"></script>
        <script src="/js/autolink.js"></script>
        <div className="modal is-clipped" id="profileModal">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Edit profile</p>
              <button className="button is-small" aria-label="close" id="exitModal" data-target="profileModal">
                <span className="icon is-small">
                  <i className="fas fa-times"></i>
                </span>
              </button>
            </header>
            <form onSubmit={submitChanges}>
              <section className="modal-card-body">
                <p>Bio</p>
                <div className="field">
                  <p className="control">
                    <textarea className="textarea" name="bio" placeholder="Say something about yourself, like, you like doing backflips, or something." id="bio2"></textarea>
                  </p>
                </div>
              </section>
              <footer class="modal-card-foot">
                <div className="buttons">
                  <input className="button is-success is-rounded" type="submit" value="Save Changes"></input>
                </div>
              </footer>
            </form>
          </div>
        </div>
        <div className="container is-fluid">
          <div className="container columns is-multiline">
            <div className="column is-one-third">
              <div className="card">
                <div className="card-content">
                  <div className="media">
                      <div className="media-left">
                        <figure className="image is-64x64">
                          <img src={props.resultUser.avatar} />
                        </figure>
                      </div>
                      <div className="media-content">
                          <p className="title is-4"><strong id="username">{props.resultUser.name}</strong>&nbsp;
                          <span className="tag is-info" id="rank">{props.resultUser.rank}</span>
                          </p> 
                        <p className="subtitle is-6">Joined at <strong id="joinedAt">{props.formattedDate}</strong></p>
                      </div>
                  </div>
                  <div className="content has-text-centered">
                    <p id="bio">{props.resultUser.description}</p>
                    <div className="container is-fluid">
                    </div>
                  </div>
                  <div>
                    <nav className="level">
                      <div className="level-item">
                        <a className="button is-white" data-target="followerModal" id="openFollowerModal">
                          <div>
                            <p>Followers: <strong id="followers">{props.resultUser.followers.length}</strong></p>
                          </div>
                        </a>
                      </div>
                      <div className="level-item">
                        <a className="button is-white" data-target="followingModal" id="openFollowingModal">
                          <div>
                            <p>Following: <strong id="following">{props.resultUser.following.length}</strong></p>
                          </div>
                        </a>
                      </div>
                    </nav> 
                    <hr></hr>
                    <div align="center">
                      <a className="button is-info" data-target="profileModal" id="showModal">Edit profile</a>
                      <a className="button is-info left-spaced" href="/settings">Settings</a>
                    </div>
                  </div>
                </div> 
              </div>
            </div>
          </div>
        </div>
        <br />
      </Container>
      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  const cookie = useCookie(context)
  if (!cookie.get('user')) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  let res = await fetch(config.API_BASE + '/api/user/' + cookie.get('user'), {
    method: 'GET'
  })
  res = await res.json()
  const formattedDate = moment(res.user.joinedAt).format("dddd, MMMM Do YYYY")
  return {
    props: {
      loggedIn: cookie.get('loggedIn') || null,
      session: cookie.get('session') || null,
      user: cookie.get('user') || null,
      cookie: context.req.headers.cookie || '',
      resultUser: res.user,
      formattedDate: formattedDate
     }
  }
}