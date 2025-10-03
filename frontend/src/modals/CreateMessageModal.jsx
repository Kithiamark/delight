import React, { useState } from 'react';
import Modal from '../components/Modal';
import { Send } from 'lucide-react';

const CreateMessageModal = ({ isOpen, onClose, onSend }) => {
  const [newMessage, setNewMessage] = useState({
    title: "",
    content: "",
    type: "announcement",
    priority: "normal"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(newMessage);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Send Message">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title & Dropdowns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Message Title</label>
            <input
              type="text"
              placeholder="Enter message title"
              value={newMessage.title}
              onChange={(e) => setNewMessage({ ...newMessage, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition shadow-sm"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Type</label>
              <select
                value={newMessage.type}
                onChange={(e) => setNewMessage({ ...newMessage, type: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition shadow-sm"
              >
                <option value="announcement">Announcement</option>
                <option value="reminder">Reminder</option>
                <option value="encouragement">Encouragement</option>
                <option value="event">Event</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Priority</label>
              <select
                value={newMessage.priority}
                onChange={(e) => setNewMessage({ ...newMessage, priority: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition shadow-sm"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Message Content</label>
          <textarea
            rows={4}
            placeholder="Write your message here..."
            value={newMessage.content}
            onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition shadow-sm resize-none"
          />
        </div>
        
        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:opacity-90 transition flex items-center justify-center shadow-md"
        >
          <Send className="h-5 w-5 mr-2" />
          Send Message
        </button>
      </form>
    </Modal>
  );
};

export default CreateMessageModal;
