import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import { auth } from "./firebase"; // from your uploaded file

const App = () => {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState("login");

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setCurrentView("login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (currentView === "login") {
    return <LoginForm setUser={setUser} setCurrentView={setCurrentView} />;
  }
  if (currentView === "admin") {
    return <AdminDashboard user={user} handleLogout={handleLogout} />;
  }
  if (currentView === "student") {
    return <StudentDashboard user={user} handleLogout={handleLogout} />;
  }

  return <LoginForm setUser={setUser} setCurrentView={setCurrentView} />;
};

export default App;
