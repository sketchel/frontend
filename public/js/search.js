function search () {
    window.location.href = '/search/' + encodeURIComponent(document.getElementById('searchInput').value)
}
  
window.onload = function () {
    document.getElementById('searchInput').addEventListener('keyup', function (evt) {
        if (evt.keyCode === 13) {
        search()
        }
    })
}