import SecondNavbar from './components/SecondNavbar'
import Navbar from "./components/Navbar"
import Landing from './pages/Landing'
import Footer from './components/Footer'
import Questionnaire from './pages/questionnaire'
import{Routes, Route} from 'react-router'
import Questions from './pages/questions'
import Response from './pages/Response'
import { useState } from 'react'
import Login from './components/Login'
import Roadmap from './pages/roadmap'

function App() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      <Navbar setShowLogin={setShowLogin} showLogin={showLogin} />
      {showLogin ? <Login setShowLogin={setShowLogin} /> : null}
      <SecondNavbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/generate" element={<Response />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
