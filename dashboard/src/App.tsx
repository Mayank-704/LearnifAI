
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignUpPage.tsx";
import History from "./pages/History";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

function App() {
 
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={!Cookies.get("token")? <LoginPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/signup"
          element={!Cookies.get("token") ? <SignupPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/history"
          element={Cookies.get("token") ? <History /> : <Navigate to="/login" replace />}
        />
      </Routes>
      <Footer />
      <Toaster position="top-center" />
    </BrowserRouter>
     
  );
}

export default App;
