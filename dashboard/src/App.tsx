import {Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import History from "./pages/History";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
// import { useAuthStore } from "./store/useAuthStore.js"; // adjust path as needed

import { BrowserRouter } from "react-router-dom";

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Get your boolean variables and setters from the store
  // const { isLoggingIn, isSigningUp, setIsLoggingIn, setIsSigningUp } = useAuthStore();

  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);

  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    // Check current route and update store
    setIsLoggingIn(location.pathname === "/login");
    setIsSigningUp(location.pathname === "/signup");
  }, [location.pathname, setIsLoggingIn, setIsSigningUp]);

  const handleAuthChange = () => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  };

  // Hide Navbar only when logging in or signing up
  const hideNavbarAndFooter = isLoggingIn || isSigningUp;

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
     {!hideNavbarAndFooter && <Footer />}
      <Toaster position="top-center" />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

