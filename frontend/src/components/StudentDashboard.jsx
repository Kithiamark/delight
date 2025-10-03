import React, { useState, useEffect } from "react";
import { Book, Award, LogOut, MessageSquare, Menu ,Clock , X, CheckCircle, Flame, Trophy, TrendingUp, Target, Star, Search, Filter, BookOpen, ChevronRight, Bookmark, Share2, Medal, User, Users } from "lucide-react";
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import StudentChat from "./StudentChat"; // Import the new chat component

const StudentDashboard = ({ user, handleLogout }) => {
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [userStats, setUserStats] = useState({
    totalLessons: 0,
    completedLessons: 0,
    totalScore: 0,
    streak: 0,
    level: 1,
    xp: 0,
    averageScore: 0
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState("dashboard"); // 'dashboard' or 'chat'

  // Load lessons and user progress
  const loadLessons = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "lessons"));
      const lessonsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLessons(lessonsData);
      
      // Load user progress
      const progressDoc = await getDoc(doc(db, "progress", user.uid));
      const progressData = progressDoc.exists() ? progressDoc.data().lessons : {};
      setProgress(progressData);
      
      calculateUserStats(lessonsData, progressData);
    } catch (err) {
      console.error("Error loading lessons or progress:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateUserStats = (lessonsData, progressData) => {
    const completed = Object.keys(progressData).filter(lessonId => progressData[lessonId]?.completed).length;
    const totalScore = Object.values(progressData).reduce((sum, p) => sum + (p.score || 0), 0);
    const avgScore = completed > 0 ? Math.round(totalScore / completed) : 0;
    
    setUserStats({
      totalLessons: lessonsData.length,
      completedLessons: completed,
      averageScore: avgScore,
      streak: Math.floor(Math.random() * 7) + 1, // Placeholder
      level: Math.floor(completed / 5) + 1,
      xp: completed * 100 + totalScore * 2
    });
  };

  const updateProgress = async (lessonId, score, completed = true) => {
    try {
      const newProgress = {
        ...progress,
        [lessonId]: {
          completed,
          score,
          completedAt: new Date().toISOString(),
          attempts: (progress[lessonId]?.attempts || 0) + 1
        }
      };
      
      await setDoc(doc(db, "progress", user.uid), {
        lessons: newProgress,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      setProgress(newProgress);
      calculateUserStats(lessons, newProgress);
    } catch (err) {
      console.error("Error updating progress:", err);
    }
  };

  useEffect(() => {
    loadLessons();
  }, [user.uid]);

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.scripture.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty === "all" || lesson.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-800 border-green-200";
      case "intermediate": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "advanced": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getProgressPercentage = () => {
    return lessons.length > 0 ? Math.round((userStats.completedLessons / userStats.totalLessons) * 100) : 0;
  };
  
  // Stats Cards Component
  const StatsCards = () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Total Lessons</p>
            <p className="text-2xl font-bold">{userStats.totalLessons}</p>
          </div>
          <BookOpen className="h-8 w-8 text-blue-200" />
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">Completed</p>
            <p className="text-2xl font-bold">{userStats.completedLessons}</p>
          </div>
          <CheckCircle className="h-8 w-8 text-green-200" />
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-yellow-100 text-sm">Streak</p>
            <p className="text-2xl font-bold">{userStats.streak}</p>
          </div>
          <Flame className="h-8 w-8 text-yellow-200" />
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm">Level</p>
            <p className="text-2xl font-bold">{userStats.level}</p>
          </div>
          <Trophy className="h-8 w-8 text-purple-200" />
        </div>
      </div>
    </div>
  );
  
  // Progress Bar Component
  const ProgressBar = () => (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Learning Progress</h3>
        <span className="text-sm font-medium text-indigo-600">{getProgressPercentage()}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div 
          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${getProgressPercentage()}%` }}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center">
          <Target className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-gray-600">Goal: Complete all lessons</span>
        </div>
        <div className="flex items-center">
          <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
          <span className="text-gray-600">Avg Score: {userStats.averageScore || 0}%</span>
        </div>
      </div>
    </div>
  );

  // Lesson Detail View
  const LessonDetailView = () => {
    // ... (content is the same as your provided code) ...
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your lessons...</p>
        </div>
      </div>
    );
  }

  // --- Main Render Logic ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 mr-2"
              >
                <Menu className="h-6 w-6" />
              </button>
              <Book className="h-8 w-8 text-indigo-600 mr-3" />
              <div className="hidden sm:block">
                <h1 className="text-xl font-semibold text-gray-900">Bible Learning</h1>
                <p className="text-sm text-gray-500">Student Portal</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <button onClick={() => setCurrentScreen("dashboard")} className={`text-sm font-medium ${currentScreen === "dashboard" ? "text-indigo-600" : "text-gray-500 hover:text-gray-900"}`}>
                Dashboard
              </button>
              <button onClick={() => setCurrentScreen("chat")} className={`text-sm font-medium flex items-center space-x-1 ${currentScreen === "chat" ? "text-indigo-600" : "text-gray-500 hover:text-gray-900"}`}>
                <MessageSquare className="h-4 w-4" />
                <span>Chat</span>
              </button>
              <div className="hidden lg:flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
                <Medal className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">{userStats.xp} XP</span>
              </div>
              <div className="hidden lg:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.email}</p>
                  <p className="text-xs text-gray-500">Level {userStats.level}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {currentScreen === "dashboard" && (
          <>
            <StatsCards />
            <ProgressBar />
            {/* Search and Filter Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search lessons..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white min-w-[150px]"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Lessons Grid */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Available Lessons ({filteredLessons.length})
              </h2>
              {filteredLessons.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredLessons.map((lesson) => {
                    const lessonProgress = progress[lesson.id];
                    const isCompleted = lessonProgress?.completed;
                    
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => setSelectedLesson(lesson)}
                        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-indigo-200 group"
                      >
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                              {lesson.title}
                            </h3>
                            <div className="flex items-center space-x-2 ml-2">
                              {isCompleted ? (
                                <div className="flex items-center space-x-1">
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                  <span className="text-xs font-medium text-green-600">
                                    {lessonProgress.score}%
                                  </span>
                                </div>
                              ) : (
                                <Clock className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                          </div>
                          <p className="text-indigo-600 font-medium text-sm mb-3">
                            {lesson.scripture}
                          </p>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {lesson.content}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(lesson.difficulty)}`}>
                              {lesson.difficulty}
                            </span>
                            <div className="flex items-center text-indigo-600 group-hover:text-indigo-700">
                              <span className="text-sm font-medium mr-1">
                                {isCompleted ? 'Review' : 'Start'}
                              </span>
                              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                          {isCompleted && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>Completed {lessonProgress.attempts} time(s)</span>
                                <div className="flex items-center">
                                  <Star className="h-3 w-3 text-yellow-400 mr-1" />
                                  <span>High Score: {lessonProgress.score}%</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
        
        {currentScreen === "chat" && <StudentChat user={user} />}
      </div>
      {selectedLesson && <LessonDetailView />}
    </div>
  );
};

export default StudentDashboard;