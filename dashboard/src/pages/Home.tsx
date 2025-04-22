import React, { useEffect, useState } from 'react';
import { auth } from '../components/firebase';

function Home() {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log(user);
                setUserDetails(user);
            } else {
                setUserDetails(null);
            }
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            console.log("User logged out successfully!");
            window.location.href = "/login";
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    };

    return (
        <div className='h-screen bg-gradient-to-r from-[#1A1A1D] to-[#2D2D30] text-white'>

            {userDetails ? (
                <>

                    <div className='flex justify-end mr-10'>
                        <button
                            onClick={handleLogout}
                            className="w-30 bg-blue-600 mt-10 hover:bg-blue-700 transition-colors py-2 px-4 rounded-md text-white font-medium"
                        >
                            Logout
                        </button>
                    </div>
                    <div className="text-center">
                        <img
                            src={userDetails.photoURL}
                            alt="User Profile"
                            className="rounded-full w-24 h-24 mx-auto mt-10"
                        />
                        <h1 className="text-2xl mt-4">Welcome, {userDetails.displayName}!</h1>
                    </div>

                    
                </>
            ) : (
                <div className='flex justify-center'>
                    <button className="mt-40 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200">
                        <a href="/signup" className="text-sky-50/100 ml-2">Get Started</a>
                    </button>
                </div>
            )}

        </div>
    );
}

export default Home;
