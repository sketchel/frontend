
window.onload = () => {
  document.onkeydown = (e) => {
    var evtobj = window.event ? event : e
    if (evtobj.keyCode === 90 && evtobj.ctrlKey) document.getElementById('undo').click()
    if (evtobj.keyCode === 89 && evtobj.ctrlKey) document.getElementById('redo').click()
  }
  window.sketchel = new Object()
  window.sketchel.pickr = Pickr.create({
    el: '.pickr',
    theme: 'monolith',

    swatches: [
      'rgba(244, 67, 54, 1)',
      'rgba(233, 30, 99, 1)',
      'rgba(156, 39, 176, 1)',
      'rgba(103, 58, 183, 1)',
      'rgba(63, 81, 181, 1)',
      'rgba(33, 150, 243, 1)',
      'rgba(3, 169, 244, 1)',
      'rgba(0, 188, 212, 1)',
      'rgba(0, 150, 136, 1)',
      'rgba(76, 175, 80, 1)',
      'rgba(139, 195, 74, 1)',
      'rgba(205, 220, 57, 1)',
      'rgba(255, 235, 59, 1)',
      'rgba(255, 193, 7, 1)'
    ],
    default: '#000',

    components: {
      preview: true,
      hue: true,
      interaction: {
        input: true,
        save: true
      }
    }
  })
  window.sketchel.pickr.on('save', (e) => {
    document.querySelector('.pickr').click()
  })
}