import Navbar from "./components/Navbar.tsx"
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import History from "./pages/History";
import LandingPage from './pages/LandingPage';
import FeatureSection from './components/LandingFeatures/FeatureSection';
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignUpPage.tsx";
import { useAuthStore } from "./store/useAuthStore.ts";
import { useEffect } from "react";

function App() {
  const authUser = useAuthStore();
 useEffect(()=>{
  
  console.log(authUser)
 })

  return (
    
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<LandingPage />} />  
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/history" element={<History />} />      
      <Route path="/features" element={<FeatureSection />} />
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App