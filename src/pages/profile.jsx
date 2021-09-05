import config from '../../config.json'
import { useCookie } from 'next-cookie'
import moment from 'moment'

import Container from '../components/Container'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

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

  async function setAvatar(event) {
    event.preventDefault()
    let res = await fetch(config.API_BASE + '/users/avatar', {
      body: JSON.stringify({
        avatar: event.target.id
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
          <Navbar loggedIn="true" props={props} />
        ) : (
          <Navbar loggedIn="false" props={props} />
        )}
        <script async src="/js/modal.js"></script>
        <div className="modal is-clipped" id="profileModal">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Edit profile</p>
              <button className="button is-small" aria-label="close" id="exitModal" data-target="profileModal">
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faTimes}/>
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
              <footer className="modal-card-foot">
                <div className="buttons">
                  <input className="button is-success is-rounded" type="submit" value="Save Changes"></input>
                </div>
              </footer>
            </form>
          </div>
        </div>
        <div className="modal is-clipped" id="followingModal">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Following</p>
              <button className="button is-small" aria-label="close" id="exitFollowingModal" data-target="followingModal">
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faTimes}/>
                </span>
              </button>
            </header>
            <section className="modal-card-body">
              <div className="container">
                {props.followingList.map((following, i) => {
                  const format = moment(following.joinedAt).format("dddd, MMMM Do YYYY")
                  return (
                    <div key={i} className="media">
                      <div className="media-left">
                        <figure className="image is-64x64">
                          <Image src={following.avatar} alt={following.name} height={64} width={64}/>
                        </figure>
                      </div>
                      <div className="media-content">
                        <p className="title is-4">
                          {following.name}&nbsp;
                          <span className="tag is-info" id="rank">{following.rank}</span>
                        </p>
                        <p className="subtitle">{format}</p>
                      </div>
                      <div className="media-right">
                        <a className="button is-info" href={"/profile/" + following.id}>Profile</a>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
            <footer className="modal-card-foot">
            </footer>
          </div>
        </div>
        <div className="modal is-clipped" id="followerModal">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Followers</p>
              <button className="button is-small" aria-label="close" id="exitFollowerModal" data-target="followerModal">
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faTimes}/>
                </span>
              </button>
            </header>
            <section className="modal-card-body">
              {props.followerList.map((follower, i) => {
                const format = moment(follower.joinedAt).format("dddd, MMMM Do YYYY")
                return (
                  <div key={i} className="media">
                    <div className="media-left">
                      <figure className="image is-64x64">
                        <Image src={follower.avatar} alt={follower.name} height={64} width={64}/>
                      </figure>
                    </div>
                    <div className="media-content">
                      <p className="title is-4">
                        {follower.name}&nbsp;
                        <span className="tag is-info" id="rank">{follower.rank}</span>
                      </p>
                      <p className="subtitle">{format}</p>
                    </div>
                    <div className="media-right">
                      <a className="button is-info" href={"/profile/" + follower.id}>Profile</a>
                    </div>
                  </div>
                )
              })}
            </section>
            <footer className="modal-card-foot">
            </footer>
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
                          <Image src={props.resultUser.avatar} height={64} width={64}/>
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
                  <div align="center">
                    <a className="button is-info" data-target="profileModal" id="showModal">Edit profile</a>
                    <a className="button is-info left-spaced" href="/settings">Settings</a>
                  </div>
                </div> 
              </div>
              <br />
              <div className="box" align="center">
                <h1 className="title is-5">Followers / Following</h1>
                <a className="button is-white" data-target="followerModal" id="openFollowerModal">
                  <div>
                    <p>Followers: <strong id="followers">{props.resultUser.followers.length}</strong></p>
                  </div>
                </a>
                <a className="button left-spaced is-white" data-target="followingModal" id="openFollowingModal">
                  <div>
                    <p>Following: <strong id="following">{props.resultUser.following.length}</strong></p>
                  </div>
                </a>
                <br></br>
              </div>
            </div>
            <div align="center" className="column">
              <br />
              <h1 className="title is-5">Posts ({props.posts.length})</h1>
              {props.posts.length === 0 ? (
                <h2 className="subtitle is-5">This person has no posts :(</h2>
              ) : (
                <div/>
              )}
              <div className="columns is-multiline">
                {props.posts.map((post, i) => {
                  const format = moment(post.createdAt).fromNow()
                  return (
                    <div key={i} id="post" className="column is-one-third is-6">
                      <br/>
                      <img width="70%" height="auto" src={post.image} alt={post.title} />
                      <br/>
                      <h1 className="title is-5" style={{color: '#3e8ed0'}}><a href={"/post/" + post._id}>{post.title}</a></h1>
                      <h2 className="subtitle is-6">{format}</h2>
                      <button onClick={setAvatar} id={post._id} className="button is-info">Set as Avatar</button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <br />
      </Container>
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
  let posts = await fetch(config.API_BASE + '/api/posts/' + cookie.get('user'), {
    method: 'GET'
  }) 
  res = await res.json()
  posts = await posts.json()
  posts = posts.posts
  let followingList = []
  let followerList = []
  for await (const follower of res.user.followers) {
    let resFollower = await fetch(config.API_BASE + '/api/user/' + follower, {
      method: 'GET'
    })
    resFollower = await resFollower.json()
    followerList.push(resFollower.user)
  }
  for await (const following of res.user.following) {
    let resFollowing = await fetch(config.API_BASE + '/api/user/' + following, {
      method: 'GET'
    })
    resFollowing = await resFollowing.json()
    followingList.push(resFollowing.user)
  }
  const formattedDate = moment(res.user.joinedAt).format("dddd, MMMM Do YYYY")
  return {
    props: {
      loggedIn: cookie.get('loggedIn') || null,
      session: cookie.get('session') || null,
      user: cookie.get('user') || null,
      cookie: context.req.headers.cookie || '',
      resultUser: res.user,
      formattedDate: formattedDate,
      followerList: followerList,
      followingList: followingList,
      posts: posts
     }
  }
}