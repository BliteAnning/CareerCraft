import './index.css'
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
import Resume from './pages/resume'
import Resource from './pages/resources'
import Contact from './pages/contact'
import { ToastBar, Toaster } from 'react-hot-toast'
import Quiz from './pages/quiz'
import Qresults from './pages/Qresults'

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)

  return (
    <>
      <Navbar setShowLogin={setShowLogin} showLogin={showLogin} setShowDrawer={setShowDrawer} showDrawer={showDrawer}/>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : null}
      <SecondNavbar showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
      <Routes>
        <Route path="/" showDrawer={showDrawer} setShowDrawer={setShowDrawer} element={<Landing />} />
        <Route path="/questionnaire" showDrawer={showDrawer} setShowDrawer={setShowDrawer} element={<Questionnaire />} />
        <Route path="/questions" showDrawer={showDrawer} setShowDrawer={setShowDrawer} element={<Questions />} />
        <Route path="/generate" showDrawer={showDrawer} setShowDrawer={setShowDrawer} element={<Response />} />
        <Route path="/roadmap" showDrawer={showDrawer} setShowDrawer={setShowDrawer} element={<Roadmap />} />
        <Route path="/resume" showDrawer={showDrawer} setShowDrawer={setShowDrawer} element={<Resume />} />
        <Route path="/resources" showDrawer={showDrawer} setShowDrawer={setShowDrawer} element={<Resource />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
        <Route path='/qresult' element={<Qresults/>}/>
      </Routes>
      <Footer />
      <Toaster/>
    </>
  )
}

export default App
