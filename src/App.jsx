import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import ServiceApplicationPage from './pages/ServiceApplicationPage.jsx'
import SubmissionsPage from './pages/SubmissionsPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ServiceApplicationPage />} />
      <Route path="/submissions" element={<SubmissionsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
