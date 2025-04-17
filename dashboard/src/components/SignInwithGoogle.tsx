import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import React from 'react'
import { auth } from './firebase';

function SignInwithGoogle() {

    function googleLogin() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(async (result) => {
            console.log(result);
            if (result.user) {
                const user = result.user;
                console.log("User logged in successfully!");
                console.log(user);
            

                window.location.href = "/";
                
                
            }            
        })
    }
  return (
    <div>
      <div className="text-center text-gray-400 my-4 text-sm">OR</div>
      <button
          className="flex items-center justify-center w-full border border-gray-400 text-sm py-2 rounded-md bg-blue-900 hover:bg-gray-700 transition-colors"
          type="button"
          onClick={googleLogin}       
           >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21.805 10.023h-9.82v3.955h5.658c-.245 1.34-.983 2.475-2.088 3.223v2.682h3.38c1.979-1.82 3.127-4.5 3.127-7.719 0-.642-.055-1.266-.158-1.863z" fill="#4285F4"/>
            <path d="M11.985 22c2.835 0 5.216-.94 6.955-2.551l-3.38-2.682c-.939.63-2.135 1.002-3.574 1.002-2.747 0-5.078-1.855-5.909-4.355h-3.47v2.738c1.732 3.445 5.3 5.848 9.378 5.848z" fill="#34A853"/>
            <path d="M6.076 13.414c-.213-.63-.334-1.3-.334-1.987 0-.687.121-1.357.334-1.987v-2.738h-3.47a10.004 10.004 0 000 9.45l3.47-2.738z" fill="#FBBC05"/>
            <path d="M11.985 5.954c1.544 0 2.931.532 4.02 1.577l3.02-3.02c-1.737-1.62-4.118-2.624-7.04-2.624-4.078 0-7.646 2.403-9.378 5.848l3.47 2.738c.831-2.5 3.162-4.355 5.908-4.355z" fill="#EA4335"/>
          </svg>
          Login With Google
        </button>
    </div>
  )
}

export default SignInwithGoogle
