import Navbar from "./components/Navbar.tsx"
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import History from "./pages/History";
import LandingPage from './pages/LandingPage';
import FeatureSection from './components/LandingFeatures/FeatureSection';
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore.ts";
function App() {
  const currentPage = useAuthStore();
  useEffect(()=>{
    const path = window.location.pathname;
    console.log(path)
    currentPage.currentPage = path;
  },[currentPage])
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