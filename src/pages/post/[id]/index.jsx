import { useCookie } from 'next-cookie'
import { useRouter } from 'next/router'
import moment from 'moment'
import config from '../../../../config.json'

import Image from 'next/image'
import Container from '../../../components/Container'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'


export default function Post(props) {
  const router = useRouter()
  let post = JSON.parse(props.post)
  let author = props.author

  return (
    <>
      <meta name="twitter:card" content="summary_large_image"></meta>
      <meta name="twitter:image" content={post.image}></meta>
      <title>{props.title} - Sketchel!</title>
      <meta property="og:site_name" content="Sketchel"/>
      <meta property="og:title" content={post.title + ' by ' + author.name}/>
      <meta content={post.description} name="description"/>
      <Container>
        {props.loggedIn ? (
          <Navbar loggedIn="true" props={props} />
        ) : (
          <Navbar loggedIn="false" props={props} />
        )}
        <br></br>
        <div align="center" className="container">
          <h1 className="title">{post.title}</h1>
          <h2 className="subtitle">{post.description}</h2>
          <div className="box">
            <img src={post.image} alt={post.title} />
          </div>
          <div align="left" className="box">
            <div className="media">
              <div className="media-left">
                <figure className="image is-64x64">
                  <img src={author.avatar} alt={author.name} />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">
                  <a href={"/profile/" + author.name} style={{color: '#3e8ed0'}}>{author.name}&nbsp;</a>
                  <span className="tag is-info" id="rank">{author.rank}</span>
                </p>
                <p className="subtitle">{moment(author.joinedAt).format("dddd, MMMM Do YYYY")}</p>
              </div>
            </div>
          </div>
        </div>
        <br></br>
      </Container>
    </>
  )
}
  
export async function getServerSideProps(context) {
  let res = await fetch(config.API_BASE + '/api/post/' + context.query.id, {
    method: 'GET'
  })
  res = await res.json()
  if (!res.success) return { notFound: true }
  const cookie = useCookie(context)
  let r = await fetch(config.API_BASE + '/users/@me' + cookie.get('user'), {
    method: 'GET',
    headers: {
      Authorization: cookie.get('session')
    }
  })
  r = await r.json()
  if (!r.user && cookie.get('user')) {
    cookie.remove('user')
    cookie.remove('session')
    cookie.remove('loggedIn')
  }
  if (cookie.get('session')) {
    await fetch(config.API_BASE + '/users/view/' + context.query.id, {
      method: 'POST',
      headers: {
        Authorization: cookie.get('session')
      }
    })
  }
  let you = false
  if (cookie.get('user') === res.post.author) you = true
  let resAuthor = await fetch(config.API_BASE + '/api/user/' + res.post.author, {
    method: 'GET'
  })
  resAuthor = await resAuthor.json()
  resAuthor = resAuthor.user
  return {
    props: {
      loggedIn: cookie.get('loggedIn') || null,
      session: cookie.get('session') || null,
      user: cookie.get('user') || null,
      post: JSON.stringify(res.post) || null,
      you: you,
      author: resAuthor
    }
  }
}
