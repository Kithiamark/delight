import React, { useState } from "react";
import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, signInAnonymously } from "firebase/auth";

const Auth = () => {
  const [loading, setLoading] = useState(false);

  // Sign in with Google
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      console.log("Signed in with Google");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sign in anonymously
  const handleAnonymousSignIn = async () => {
    setLoading(true);
    try {
      const userCredential = await signInAnonymously(auth);
      console.log("Signed in as:", userCredential.user.uid);
    } catch (error) {
      console.error("Error signing in anonymously:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Welcome!</h1>

        {loading ? (
          <div className="text-blue-500 font-semibold">Loading...</div>
        ) : (
          <>
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200 mb-4"
            >
              Continue with Google
            </button>

            <button
              onClick={handleAnonymousSignIn}
              className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition duration-200"
            >
              Continue as Guest
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
