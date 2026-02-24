import { Link } from "react-router-dom"

const Missing = () => {
  return (
    <main className="Missing">
      <h2>page not found</h2>
      <p>Go to Home Page</p>
      <p>
        <Link to="/" >Home</Link>
      </p>
    </main>
  )
}

export default Missing
