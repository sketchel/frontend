import { useCookie } from 'next-cookie'
import * as React from 'react'
import Container from '../components/Container'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import { useEffect } from 'react'

const styles: any = {
  'background-image': 'url(https://upload.wikimedia.org/wikipedia/commons/7/70/Graph_paper_scan_1600x1000_%286509259561%29.jpg)'
};

export default function Create(props) {
  const canvas = React.createRef()
  const picker = React.createRef()

  const undoHandler = () => {
    const undo = canvas.current.undo
    if (undo) {
      undo()
    }
  }

  const redoHandler = () => {
    const redo = canvas.current.redo
    if (redo) {
      redo()
    }
  }

  const resetHandler = () => {
    const reset = canvas.current.redo
    if (reset) {
      reset()
    }
  }

  const clearHandler = () => {
    const clear = canvas.current.clear
    if (clear) {
      clear()
    }
  } 

  const penHandler = () => {
    const pen = canvas.current.eraseMode
    if (pen) {
      pen(false)
    }
  } 

  const eraserHandler = () => {
    const eraser = canvas.current.eraseMode
    if (eraser) {
      eraser(true)
    }
  } 

  const onUpdate = (updatedPaths) => {
    setPaths(updatedPaths)
  }

  return (
    <>
      <Container>
        {props.loggedIn ? (
          <Navbar loggedIn="true" />
        ) : (
          <Navbar loggedIn="false" />
        )}
        <br />
          <script src="/js/canvas.js"></script>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/themes/monolith.min.css"/>
          <script src="https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/pickr.min.js"></script>
          <div align="center">
            <div className="container columns">
              <div className="box row no-gutters canvas-area m-0 p-0">
                <ReactSketchCanvas
                  ref={canvas}
                  style={styles}
                  width="100%"
                  height="500px"
                  strokeWidth={4}
                />
              </div>
              <div className="column container is-one-sixth panel">
                <div id="picker" onClick={() => {
                  canvas.current.strokeColor = '#' + window.sketchel.pickr._color.toHEXA().join('')
                }}><div title="Pick a color" id="color-picker" ref={picker} className="more-space-upwards pickr"></div></div>
                <hr />
                <button id="undo" title="Undo" className="more-space-upwards button" onClick={undoHandler}><i className="fas fa-undo"></i></button>
                <button id="redo" title="Redo" className="button space-upwards" onClick={redoHandler}><i className="fas fa-redo"></i></button>
                <hr />
                <button id="pen" title="Pen" className="button more-space-upwards" onClick={penHandler}><i className="fas fa-pen"></i></button>
                <button id="eraser" title="Eraser" className="button space-upwards" onClick={eraserHandler}><i className="fas fa-eraser"></i></button>
                <hr />
                <button id="reset" title="Reset all" className="button is-danger more-space-upwards" onClick={resetHandler}><i className="fas fa-dumpster"></i></button>
                <button id="clear" title="Clear all" className="button is-danger space-upwards" onClick={clearHandler}><i className="fas fa-trash"></i></button>
              </div>
            </div>
          </div>
        <br />
      </Container>
      <Footer />
    </>
  )
}
  
export function getServerSideProps(context) {
  const cookie = useCookie(context)
  if (!cookie.get('user')) {
      return {
          redirect: {
              destination: '/login',
              permanent: false
          }
      }
  }
  return {
    props: {
      loggedIn: cookie.get('loggedIn') || null,
      session: cookie.get('session') || null,
      user: cookie.get('user') || null,
     }
  }
}