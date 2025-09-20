import React, { useState } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, // Import Google Auth Provider
  signInWithPopup // Import sign-in with pop-up method
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Loader2, AtSign, KeyRound } from 'lucide-react'; 

const LoginForm = ({ setUser, setCurrentView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle the common state and view updates after a successful login
  const handleSuccess = async (user) => {
    // Check if the user document exists in Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    let userRole = "student"; // Default to student
    if (userDocSnap.exists()) {
      userRole = userDocSnap.data().role;
    } else {
      // If the user document doesn't exist, create it.
      // This is crucial for social logins and new registrations.
      await setDoc(userDocRef, {
        email: user.email,
        role: "student", // Default role for social logins
        createdAt: new Date().toISOString(),
      });
    }

    setUser({ ...user, role: userRole });
    setCurrentView(userRole === "admin" ? "admin" : "student");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isRegister) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", cred.user.uid), {
          email,
          role,
          createdAt: new Date().toISOString(),
        });
        setUser({ ...cred.user, role });
        setCurrentView(role === "admin" ? "admin" : "student");
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await handleSuccess(result.user);
      }
    } catch (authError) {
      console.error("Auth error:", authError);
      let userMessage = "An unexpected error occurred. Please try again.";
      switch (authError.code) {
        case "auth/invalid-credential":
          userMessage = "Invalid email or password. Please try again.";
          break;
        case "auth/email-already-in-use":
          userMessage = "This email is already in use.";
          break;
        case "auth/weak-password":
          userMessage = "Password is too weak. Must be at least 6 characters.";
          break;
        case "auth/network-request-failed":
          userMessage = "Network error. Please check your connection.";
          break;
      }
      setError(userMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await handleSuccess(result.user);
    } catch (authError) {
      console.error("Google Auth error:", authError);
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isRegister ? "Register" : "Login"}
        </h2>
        
        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:bg-blue-400"
          disabled={loading}
        >
          <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" alt="Google" className="h-5 w-5" />
          <span>Sign {isRegister ? "up" : "in"} with Google</span>
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {isRegister && (
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:bg-indigo-400"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            ) : (
              <span>{isRegister ? "Register" : "Login"}</span>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 text-center text-red-600 text-sm">{error}</div>
        )}
        
        <p className="text-sm text-center mt-4 text-gray-600">
          {isRegister ? "Already have an account?" : "Need an account?"}{" "}
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setError(null);
            }}
            className="text-indigo-600 hover:underline font-medium"
            disabled={loading}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;