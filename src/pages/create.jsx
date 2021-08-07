import { useCookie } from 'next-cookie'
import * as React from 'react'
import Container from '../components/Container'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

import { ReactSketchCanvas } from 'react-sketch-canvas'
import { SketchPicker } from 'react-color'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faEraser, faUndo, faRedo, faDumpster, faTrash, faPaintBrush, faUpload, faFileUpload, faFileImport } from '@fortawesome/free-solid-svg-icons'

const styles = {
  'background-image': 'url(https://upload.wikimedia.org/wikipedia/commons/7/70/Graph_paper_scan_1600x1000_%286509259561%29.jpg)'
};

export default function Create(props) {
  const canvas = React.createRef()
  let [color, setColor] = React.useState('#000')
  let [visible, setVisible] = React.useState(false)
  let [width, setWidth] = React.useState(8)

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
    const reset = canvas.current.resetHandler
    if (reset) {
      reset()
    }
  }

  const clearHandler = () => {
    const clear = canvas.current.clearCanvas
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

  const onTogglePicker = () => setVisible(!visible)

  // <div id="picker" onClick={colorChangeHandler}><div title="Pick a color" id="color-picker" ref={picker} className="more-space-upwards pickr"></div></div>
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
          <script src="/js/slider.js"></script>
          <div align="center">
            <div className="container columns">
              <div className="column container is-1 panel">
                <div>
                  <FontAwesomeIcon icon={faPaintBrush}></FontAwesomeIcon>
                  <input title="Change brush width" id="sliderWithValue" onChange={(e) => setWidth(e.target.valueAsNumber)}class="vertically-centered more-space-upwards slider has-output-tooltip has-output is-fullwidth" step="1" min="1" max="400" defaultValue="8" type="range" orient="vertical"/>
                  <output htmlFor="sliderWithValue">{width}</output>
                </div>
                <button id="upload" title="Upload to Sketchel" className="button is-success more-space-upwards"><FontAwesomeIcon icon={faUpload}/></button>
                <button id="export" title="Export" className="button is-info more-space-upwards"><FontAwesomeIcon icon={faFileImport}/></button>
                <button id="import" title="Import" className="button is-info space-upwards"><FontAwesomeIcon icon={faFileUpload}/></button>
                
              </div>
              <div className="column box row no-gutters canvas-area m-0 p-0">
                <ReactSketchCanvas
                  ref={canvas}
                  style={styles}
                  width="100%"
                  height="500px"
                  strokeWidth={width}
                  eraserWidth={width}
                  strokeColor={color}
                />
              </div>
              <div className="column container is-1 panel">
                { visible && (
                  <SketchPicker 
                    className="no"
                    color={color} 
                    onChangeComplete={(e) => {
                      setColor(e.hex)
                    }} />
                )}
                <button id="colorpicker" title="Pick a color" className="space-upwards button" onClick={ onTogglePicker } ><img height="24px" width="24px" src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Colorwheel.svg"></img></button>
                <hr />
                <button id="undo" title="Undo" className="more-space-upwards button" onClick={undoHandler}><FontAwesomeIcon icon={faUndo}/></button>
                <button id="redo" title="Redo" className="button space-upwards" onClick={redoHandler}><FontAwesomeIcon icon={faRedo}/></button>
                <hr />
                <button id="pen" title="Pen" className="button more-space-upwards" onClick={penHandler}><FontAwesomeIcon icon={faPen}/></button>
                <button id="eraser" title="Eraser" className="button space-upwards" onClick={eraserHandler}><FontAwesomeIcon icon={faEraser}/></button>
                <hr />
                <button id="reset" title="Reset all" className="button is-danger more-space-upwards" onClick={resetHandler}><FontAwesomeIcon icon={faDumpster}/></button>
                <button id="clear" title="Clear all" className="button is-danger space-upwards" onClick={clearHandler}><FontAwesomeIcon icon={faTrash}/></button>
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