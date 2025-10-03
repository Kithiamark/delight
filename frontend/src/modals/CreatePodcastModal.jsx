import React, { useState } from 'react';
import Modal from '../components/Modal';
import { Mic } from 'lucide-react';

const CreatePodcastModal = ({ isOpen, onClose, onCreate }) => {
  const [newPodcast, setNewPodcast] = useState({
    title: "",
    audioUrl: "",
    description: "",
    duration: "",
    speaker: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(newPodcast);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🎙️ Add Podcast Episode">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Episode Title
              </label>
              <input
                type="text"
                placeholder="Enter episode title"
                value={newPodcast.title}
                onChange={(e) => setNewPodcast({ ...newPodcast, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>

            {/* Audio URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Audio URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/audio.mp3"
                value={newPodcast.audioUrl}
                onChange={(e) => setNewPodcast({ ...newPodcast, audioUrl: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>

            {/* Speaker & Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Speaker
                </label>
                <input
                  type="text"
                  placeholder="Speaker name"
                  value={newPodcast.speaker}
                  onChange={(e) => setNewPodcast({ ...newPodcast, speaker: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  placeholder="e.g., 45:30"
                  value={newPodcast.duration}
                  onChange={(e) => setNewPodcast({ ...newPodcast, duration: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Episode Description
            </label>
            <textarea
              rows={7}
              placeholder="Describe the episode content..."
              value={newPodcast.description}
              onChange={(e) => setNewPodcast({ ...newPodcast, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:shadow-lg hover:opacity-90 transition-all flex items-center justify-center"
        >
          <Mic className="h-5 w-5 mr-2" />
          Add Podcast
        </button>
      </form>
    </Modal>
  );
};

export default CreatePodcastModal;
