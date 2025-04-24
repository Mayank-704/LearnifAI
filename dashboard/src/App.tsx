import Navbar from "./components/Navbar.tsx"
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import History from "./pages/History";
import LandingPage from './pages/LandingPage';
import FeatureSection from './components/LandingFeatures/FeatureSection';

function App() {
 
  return (
    
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<LandingPage />} />  
      <Route path="/history" element={<History />} />      
      <Route path="/features" element={<FeatureSection />} />
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App