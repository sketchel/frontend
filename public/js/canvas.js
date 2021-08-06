
window.onload = () => {
  document.onkeydown = (e) => {
    var evtobj = window.event ? event : e
    if (evtobj.keyCode === 90 && evtobj.ctrlKey) document.getElementById('undo').click()
    if (evtobj.keyCode === 89 && evtobj.ctrlKey) document.getElementById('redo').click()
  }
}