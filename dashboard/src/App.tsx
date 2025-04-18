
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import History from "./pages/History";
import LandingPage from './pages/LandingPage';
import FeatureSection from './components/LandingFeatures/FeatureSection';

function App() {
  return (

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path='/home' element={<Home/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignUpPage/>} />
      <Route path="/history" element={<History />} />      
      <Route path="/features" element={<FeatureSection />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App