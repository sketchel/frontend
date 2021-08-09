
export default function Footer() {
  return (
    <div align="center">
      <footer className="footer justify-center">
        <div className="card-body">
          <h1 className="text-lg mb-2 text-black dark:text-white">
            <strong>Sketchel</strong> © <strong>2019</strong> - <strong>2021</strong>
            <div></div>
            <a href="/privacy" style={{color: '#3e8ed0'}}>Privacy Policy</a> • <a href="/terms" style={{color: '#3e8ed0'}}>Terms of Service</a> • <a href="https://github.com/sketchel" style={{color: '#3e8ed0'}}>Source</a>
          </h1>
        </div>
      </footer>
    </div>
  )
}