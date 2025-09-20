import React, { useState, useEffect } from "react";
import {
  LogOut,
  Book,
  Menu,
  X,
  Bell,
  Users,
  BookOpen,
  MessageSquare,
  Youtube,
  Mic,
  BarChart3,
  Search,
  ChevronDown,
} from "lucide-react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

// Import new components
import OverviewTab from "../tabs/OverviewTab";
import LessonsTab from "../tabs/LessonTab";
import StudentsTab from "../tabs/StudentsTab";
import MessagesTab from "../tabs/MessageTab";
import VideosTab from "../tabs/VideosTab";
import PodcastsTab from "../tabs/PodcastTab";
import CreateLessonModal from "../modals/CreateLessonModal";
import CreateMessageModal from "../modals/CreateMessageModal";
import CreateVideoModal from "../modals/CreateVideoModal";
import CreatePodcastModal from "../modals/CreatePodcastModal";

const AdminDashboard = ({ user, handleLogout }) => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [lessons, setLessons] = useState([]);
  const [students, setStudents] = useState([]);
  const [messages, setMessages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  // Data Loading and CRUD functions
  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadLessons(),
        loadStudents(),
        loadMessages(),
        loadVideos(),
        loadPodcasts(),
      ]);
    } catch (err) {
      console.error("Error loading initial data:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadLessons = async () => {
    const q = query(collection(db, "lessons"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const lessonsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setLessons(lessonsData);
  };
  const loadStudents = async () => {
    const q = query(collection(db, "students"));
    const querySnapshot = await getDocs(q);
    const studentsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStudents(studentsData);
  };
  const loadMessages = async () => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const messagesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMessages(messagesData);
  };
  const loadVideos = async () => {
    const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const videosData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setVideos(videosData);
  };
  const loadPodcasts = async () => {
    const q = query(collection(db, "podcasts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const podcastsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPodcasts(podcastsData);
  };

  const handleCreateLesson = async (newLesson) => {
    try {
      await addDoc(collection(db, "lessons"), {
        ...newLesson,
        tags: newLesson.tags.split(",").map((tag) => tag.trim()),
        createdAt: serverTimestamp(),
        createdBy: user.email,
      });
      await loadLessons();
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error("Error creating lesson:", err);
    }
  };
  const handleDeleteLesson = async (lessonId) => {
    try {
      await deleteDoc(doc(db, "lessons", lessonId));
      await loadLessons();
    } catch (err) {
      console.error("Error deleting lesson:", err);
    }
  };
  const handleCreateVideo = async (newVideo) => {
    try {
      await addDoc(collection(db, "videos"), {
        ...newVideo,
        createdAt: serverTimestamp(),
        createdBy: user.email,
      });
      await loadVideos();
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error("Error creating video:", err);
    }
  };
  const handleDeleteVideo = async (videoId) => {
    try {
      await deleteDoc(doc(db, "videos", videoId));
      await loadVideos();
    } catch (err) {
      console.error("Error deleting video:", err);
    }
  };
  const handleCreatePodcast = async (newPodcast) => {
    try {
      await addDoc(collection(db, "podcasts"), {
        ...newPodcast,
        createdAt: serverTimestamp(),
        createdBy: user.email,
      });
      await loadPodcasts();
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error("Error creating podcast:", err);
    }
  };
  const handleDeletePodcast = async (podcastId) => {
    try {
      await deleteDoc(doc(db, "podcasts", podcastId));
      await loadPodcasts();
    } catch (err) {
      console.error("Error deleting podcast:", err);
    }
  };
  const handleSendMessage = async (newMessage) => {
    try {
      await addDoc(collection(db, "messages"), {
        ...newMessage,
        createdAt: serverTimestamp(),
        sender: user.email,
      });
      await loadMessages();
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderModal = () => {
    if (!isCreateModalOpen) return null;
    switch (modalType) {
      case "lesson":
        return (
          <CreateLessonModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onCreate={handleCreateLesson}
          />
        );
      case "message":
        return (
          <CreateMessageModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSend={handleSendMessage}
          />
        );
      case "video":
        return (
          <CreateVideoModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onCreate={handleCreateVideo}
          />
        );
      case "podcast":
        return (
          <CreatePodcastModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onCreate={handleCreatePodcast}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Nav */}
      <div className="relative z-40 lg:hidden" role="dialog" aria-modal="true">
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300 ease-in-out ${
            mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        ></div>
        <div
          className={`fixed inset-y-0 right-0 flex max-w-full pl-10 transition duration-300 ease-in-out transform ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="w-screen max-w-xs">
            <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Menu</h2>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="absolute -inset-0.5"></span>
                      <span className="sr-only">Close panel</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="flow-root">
                    <div className="-my-2 divide-y divide-gray-200">
                      {[
                        { id: "overview", label: "Overview", icon: BarChart3 },
                        { id: "lessons", label: "Lessons", icon: BookOpen },
                        { id: "students", label: "Students", icon: Users },
                        { id: "messages", label: "Messages", icon: MessageSquare },
                        { id: "videos", label: "Videos", icon: Youtube },
                        { id: "podcasts", label: "Podcasts", icon: Mic },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setSelectedTab(tab.id);
                            setMobileMenuOpen(false);
                          }}
                          className={`-m-2 block p-2 font-medium text-gray-600 hover:text-gray-900 w-full text-left`}
                        >
                          <span className="flex items-center space-x-2">
                            <tab.icon className="h-4 w-4" />
                            <span>{tab.label}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Book className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Admin Dashboard
              </span>
            </div>
            <div className="hidden lg:block">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: "overview", label: "Overview", icon: BarChart3 },
                  { id: "lessons", label: "Lessons", icon: BookOpen },
                  { id: "students", label: "Students", icon: Users },
                  { id: "messages", label: "Messages", icon: MessageSquare },
                  { id: "videos", label: "Videos", icon: Youtube },
                  { id: "podcasts", label: "Podcasts", icon: Mic },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      selectedTab === tab.id
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
              </button>
              <button
                type="button"
                className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleLogout}
              >
                <span className="sr-only">Sign out</span>
                <LogOut className="h-6 w-6" />
              </button>
              <button
                type="button"
                className="lg:hidden p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <main className="py-6 px-4 sm:px-6 lg:px-8">
        {/* Tab Content */}
        {selectedTab === "overview" && (
          <OverviewTab
            stats={{
              totalStudents: students.length,
              totalLessons: lessons.length,
              totalVideos: videos.length,
              totalPodcasts: podcasts.length,
            }}
          />
        )}
        {selectedTab === "lessons" && (
          <LessonsTab
            lessons={lessons}
            onDelete={handleDeleteLesson}
            onCreate={() => {
              setModalType("lesson");
              setIsCreateModalOpen(true);
            }}
          />
        )}
        {selectedTab === "students" && (
          <StudentsTab students={students} lessons={lessons} />
        )}
        {selectedTab === "messages" && (
          <MessagesTab
            messages={messages}
            onSend={() => {
              setModalType("message");
              setIsCreateModalOpen(true);
            }}
          />
        )}
        {selectedTab === "videos" && (
          <VideosTab
            videos={videos}
            onDelete={handleDeleteVideo}
            onCreate={() => {
              setModalType("video");
              setIsCreateModalOpen(true);
            }}
          />
        )}
        {selectedTab === "podcasts" && (
          <PodcastsTab
            podcasts={podcasts}
            onDelete={handleDeletePodcast}
            onCreate={() => {
              setModalType("podcast");
              setIsCreateModalOpen(true);
            }}
          />
        )}
      </main>

      {/* Render the appropriate modal */}
      {renderModal()}
    </div>
  );
};

export default AdminDashboard;