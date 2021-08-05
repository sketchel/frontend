import { useRouter } from 'next/router'
import { useCookie } from 'next-cookie'
import config from '../../../config.json'
import moment from 'moment'

import Container from '../../../components/Container'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'

export default function UserProfile(props) {
  const router = useRouter();

  const interact = async (event) => {
    let res = await fetch(config.API_BASE + '/users/interact/' + props.resultUser.id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': props.session
      },
      method: 'POST'
    })
    res = await res.json()
    if (!res.success) return window.location.href = "/login"
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
                      <hr />
                      <div>
                        <nav className="level">
                          <div className="level-item">
                            <a className="button is-white" data-target="followerModal" id="openFollowerModal">
                              <div>
                                <p>Followers: <strong>{props.resultUser.followers.length}</strong></p>
                              </div>
                            </a>
                          </div>
                          <div className="level-item">
                            <a className="button is-white" data-target="followingModal" id="openFollowingModal">
                              <div>
                                <p>Following: <strong>{props.resultUser.following.length}</strong></p>
                              </div>
                            </a>
                          </div>
                        </nav> 
                        {props.followingYou ? (
                          <a onClick={interact} className="button is-info" id="followButton">Unfollow</a>
                        ) : (
                          <a onClick={interact} className="button is-info" id="followButton">Follow</a>
                        )}
                      </div>
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
  let res = await fetch(config.API_BASE + '/api/user/' + context.query.user, {
    method: 'GET'
  })
  res = await res.json()
  if (!res.success) return { notFound: true }
  const formattedDate = moment(res.user.joinedAt).format("dddd, MMMM Do YYYY")
  const cookie = useCookie(context)
  let me = await fetch(config.API_BASE + '/users/@me', 
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': cookie.get('session')
      },
      method: 'GET'
    }
  )
  me = await me.json()
  me = me.user
  let followingYou
  if (me.following.includes(res.user.id)) {
    followingYou = true
  } else {
    followingYou = false
  }
  if (me._id === res.user.id) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false
      }
    }
  }
  return {
    props: { 
      resultUser: res.user,
      formattedDate: formattedDate,
      loggedIn: cookie.get('loggedIn') || null,
      session: cookie.get('session') || null,
      user: cookie.get('user') || null,
      cookie: context.req.headers.cookie || '',
      followingYou: followingYou
     },
  }
}
