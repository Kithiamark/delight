import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Loader2, AtSign, KeyRound, Eye, EyeOff } from "lucide-react";

const LoginForm = ({ setUser, setCurrentView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("student");
  const [birthYear, setBirthYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Helper: assign group by birth year
  const getAgeGroup = (year) => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - parseInt(year, 10);

    if (age >= 0 && age <= 3) return "0-3";
    if (age >= 4 && age <= 9) return "4-9";
    if (age >= 10 && age <= 12) return "10-12";
    if (age >= 13) return "Teens";
    return "unknown";
  };

  const handleSuccess = async (user) => {
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    let userRole = "student";
    let userBirthYear = birthYear;
    let userAgeGroup = "0-3";

    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      userRole = data.role || "student";
      userBirthYear = data.birthYear || "";
      userAgeGroup = data.ageGroup || "0-3";
    } else {
      userAgeGroup = getAgeGroup(birthYear);
      await setDoc(userDocRef, {
        email: user.email,
        role: "student",
        birthYear,
        ageGroup: userAgeGroup,
        createdAt: new Date().toISOString(),
      });
    }

    setUser({ ...user, role: userRole, birthYear: userBirthYear, ageGroup: userAgeGroup });
    setCurrentView(userRole === "admin" ? "admin" : userAgeGroup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isRegister) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const group = getAgeGroup(birthYear);
        await setDoc(doc(db, "users", cred.user.uid), {
          email,
          role,
          birthYear,
          ageGroup: group,
          createdAt: new Date().toISOString(),
        });
        setUser({ ...cred.user, role, birthYear, ageGroup: group });
        setCurrentView(role === "admin" ? "admin" : group);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 via-white to-emerald-100">
      <div className="bg-white/80 backdrop-blur-xl p-8 shadow-xl rounded-2xl w-96 border border-gray-100">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-emerald-700 drop-shadow-sm">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h2>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-xl hover:shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          disabled={loading}
        >
          <img
            src="https://www.vectorlogo.zone/logos/google/google-icon.svg"
            alt="Google"
            className="h-5 w-5"
          />
          <span>Sign {isRegister ? "up" : "in"} with Google</span>
        </button>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm font-medium">
            OR
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 h-5 w-5" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/70"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 h-5 w-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/70"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {isRegister && (
            <>
              <select
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/70"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={loading}
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>

              {role === "student" && (
                <input
                  type="number"
                  placeholder="Birth Year (e.g., 2015)"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/70"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  disabled={loading}
                />
              )}
            </>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-2 rounded-xl hover:shadow-lg transition-all flex items-center justify-center disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            ) : (
              <span className="font-semibold">
                {isRegister ? "Register" : "Login"}
              </span>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 text-center text-red-600 text-sm">{error}</div>
        )}

        <p className="text-sm text-center mt-6 text-gray-600">
          {isRegister ? "Already have an account?" : "Need an account?"}{" "}
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setError(null);
            }}
            className="text-emerald-600 hover:underline font-medium"
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