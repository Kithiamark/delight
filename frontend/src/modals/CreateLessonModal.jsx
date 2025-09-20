import React, { useState } from 'react';
import Modal from '../components/Modal'; // Assumes you have a generic Modal component
import { Plus } from 'lucide-react';

const CreateLessonModal = ({ isOpen, onClose, onCreate }) => {
  const [newLesson, setNewLesson] = useState({
    title: "",
    content: "",
    scripture: "",
    difficulty: "beginner",
    estimatedTime: "",
    tags: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(newLesson);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Lesson">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Title</label>
              <input
                type="text"
                placeholder="Enter lesson title"
                value={newLesson.title}
                onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Scripture Reference</label>
              <input
                type="text"
                placeholder="e.g., John 3:16-17"
                value={newLesson.scripture}
                onChange={(e) => setNewLesson({ ...newLesson, scripture: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select
                  value={newLesson.difficulty}
                  onChange={(e) => setNewLesson({ ...newLesson, difficulty: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Est. Time (min)</label>
                <input
                  type="number"
                  placeholder="15"
                  value={newLesson.estimatedTime}
                  onChange={(e) => setNewLesson({ ...newLesson, estimatedTime: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <input
                type="text"
                placeholder="faith, prayer, salvation (comma separated)"
                value={newLesson.tags}
                onChange={(e) => setNewLesson({ ...newLesson, tags: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Content</label>
            <textarea
              rows={8}
              placeholder="Enter the lesson content here..."
              value={newLesson.content}
              onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="mt-6 w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Lesson
        </button>
      </form>
    </Modal>
  );
};

export default CreateLessonModal;