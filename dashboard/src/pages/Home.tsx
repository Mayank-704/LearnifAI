import { useEffect, useState } from "react";
import { auth } from "../components/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">Login</a>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <img
        src={user.photoURL || ""}
        alt="Profile"
        className="w-24 h-24 rounded-full mb-4"
      />
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.displayName || user.email}!</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 py-2 px-6 rounded-md"
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
