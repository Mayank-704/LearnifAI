import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import History from "./pages/History";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleAuthChange = () => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  };

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <LandingPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage onAuthChange={handleAuthChange} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignupPage onAuthChange={handleAuthChange} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/history"
          element={
            isAuthenticated ? (
              <History />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
