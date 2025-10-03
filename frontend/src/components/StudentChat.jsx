import React, { useState, useEffect, useRef } from "react";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, where, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Send, User, Users, Clock } from "lucide-react";

const StudentChat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatType, setChatType] = useState("general"); // 'general' or 'teacher'
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the chat when a new message arrives
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Fetch teachers (users with a 'role' of 'admin')
    const fetchTeachers = async () => {
      const teachersQuery = query(collection(db, "users"), where("role", "==", "admin"));
      const querySnapshot = await getDocs(teachersQuery);
      setTeachers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchTeachers();
  }, []);

  useEffect(() => {
    let unsubscribe;
    let messagesCollectionRef;

    if (chatType === "general") {
      messagesCollectionRef = collection(db, "chats", "general", "messages");
    } else if (selectedTeacher) {
      // Create a consistent chat ID for private chats
      const chatId = [user.uid, selectedTeacher.id].sort().join("-");
      messagesCollectionRef = collection(db, "chats", chatId, "messages");
    }

    if (messagesCollectionRef) {
      const q = query(messagesCollectionRef, orderBy("createdAt", "asc"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const chatMessages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(chatMessages);
      });
    }

    // Scroll to bottom on initial load and message updates
    scrollToBottom();

    return () => unsubscribe && unsubscribe();
  }, [chatType, selectedTeacher, user.uid]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    let chatDocId;
    if (chatType === "general") {
      chatDocId = "general";
    } else if (selectedTeacher) {
      chatDocId = [user.uid, selectedTeacher.id].sort().join("-");
    } else {
      return;
    }

    const messagesCollectionRef = collection(db, "chats", chatDocId, "messages");

    await addDoc(messagesCollectionRef, {
      text: newMessage,
      senderId: user.uid,
      senderEmail: user.email,
      createdAt: serverTimestamp(),
      type: "chat_message",
    });

    setNewMessage("");
    scrollToBottom();
  };

  const getRecipientName = () => {
    if (chatType === "general") return "General Chat";
    if (selectedTeacher) return selectedTeacher.email;
    return "Select a Recipient";
  };

  return (
    <div className="flex h-full bg-gray-50 rounded-xl shadow-lg overflow-hidden">
      {/* Sidebar for Chat Selection */}
      <div className="w-1/4 bg-white border-r p-4 hidden md:block">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Chats</h3>
        <div className="space-y-2">
          <button
            onClick={() => { setChatType("general"); setSelectedTeacher(null); }}
            className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 transition-colors ${chatType === "general" ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"}`}
          >
            <Users className="h-5 w-5" />
            <span>General Chat</span>
          </button>
          <div className="border-t pt-2 mt-2">
            <p className="text-gray-500 text-sm font-medium mb-2">Teachers</p>
            {teachers.map(teacher => (
              <button
                key={teacher.id}
                onClick={() => { setChatType("teacher"); setSelectedTeacher(teacher); }}
                className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 transition-colors ${selectedTeacher?.id === teacher.id ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"}`}
              >
                <User className="h-5 w-5" />
                <span>{teacher.email}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-white border-b shadow-sm flex items-center">
          <h4 className="font-semibold">{getRecipientName()}</h4>
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-100">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.senderId === user.uid ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-xl max-w-xs ${
                  msg.senderId === user.uid
                    ? "bg-indigo-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                <p className="font-semibold text-xs mb-1">
                  {msg.senderId === user.uid ? "You" : msg.senderEmail}
                </p>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentChat;