
export default function Footer() {
  return (
    <div align="center">
      <footer className="footer justify-center">
        <div className="card-body">
          <h1 className="text-lg mb-2 text-black dark:text-white">
            <strong>Sketchel</strong> © <strong>2019</strong> - <strong>2021</strong>
            <div></div>
            <a href="/privacy" className="text-primary">Privacy Policy</a> • <a href="/terms" className="text-primary">Terms of Service</a> • <a href="https://github.com/sketchel" className="text-primary">Source</a>
          </h1>
        </div>
      </footer>
    </div>
  )
}