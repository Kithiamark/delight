import React from 'react';
import { BookOpen, Plus, Edit, Trash2, Clock } from 'lucide-react';

const LessonsTab = ({ lessons, onDelete, onCreate }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800">Existing Lessons ({lessons.length})</h2>
        <button
          onClick={onCreate}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" /> Add Lesson
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="divide-y divide-gray-200">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{lesson.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {lesson.difficulty}
                    </span>
                  </div>
                  <p className="text-indigo-600 font-medium text-sm mb-2">{lesson.scripture}</p>
                  <p className="text-gray-700 mb-3 line-clamp-2">{lesson.content}</p>
                  {lesson.tags && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(lesson.tags || []).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {lesson.estimatedTime && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{lesson.estimatedTime} minutes</span>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2 ml-4">
                  <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(lesson.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {lessons.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No lessons added yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonsTab;