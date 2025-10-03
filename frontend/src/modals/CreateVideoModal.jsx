import React, { useState } from 'react';
import Modal from '../components/Modal';
import { Youtube } from 'lucide-react';

const CreateVideoModal = ({ isOpen, onClose, onCreate }) => {
  const [newVideo, setNewVideo] = useState({
    title: "",
    youtubeUrl: "",
    description: "",
    category: "lesson",
    duration: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(newVideo);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add YouTube Video">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Video Title</label>
              <input
                type="text"
                placeholder="Enter video title"
                value={newVideo.title}
                onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm transition"
              />
            </div>

            {/* YouTube URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">YouTube URL</label>
              <input
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={newVideo.youtubeUrl}
                onChange={(e) => setNewVideo({ ...newVideo, youtubeUrl: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm transition"
              />
            </div>

            {/* Category & Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select
                  value={newVideo.category}
                  onChange={(e) => setNewVideo({ ...newVideo, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm transition bg-white"
                >
                  <option value="lesson">Lesson</option>
                  <option value="worship">Worship</option>
                  <option value="testimony">Testimony</option>
                  <option value="sermon">Sermon</option>
                  <option value="devotional">Devotional</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  placeholder="e.g., 15:30"
                  value={newVideo.duration}
                  onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm transition"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              rows={7}
              placeholder="Describe the video content..."
              value={newVideo.description}
              onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm transition resize-none"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full flex items-center justify-center px-6 py-3 rounded-xl 
                     bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold
                     shadow-md hover:shadow-lg hover:from-red-700 hover:to-red-600
                     transition-all duration-200"
        >
          <Youtube className="h-5 w-5 mr-2" />
          Add Video
        </button>
      </form>
    </Modal>
  );
};

export default CreateVideoModal;
