import './App.css'
import MockServiceApplicationForm from './components/MockServiceApplicationForm.jsx'

function App() {
  return (
    <main className="app">
      <section className="cardShell" aria-label="service application form mockup">
        <h1 className="pageTitle">Service Application Form</h1>
        <p className="pageSubtitle">
          Please fill in the details below to submit your service request.
        </p>
        <MockServiceApplicationForm />
      </section>
    </main>
  )
}

export default App
