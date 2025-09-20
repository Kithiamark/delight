import React from 'react';
import { MessageSquare, Plus } from 'lucide-react';

const MessagesTab = ({ messages, onSend }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800">Message History</h2>
        <button
          onClick={onSend}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" /> Send New
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm">
        <div className="divide-y divide-gray-200">
          {messages.map((message) => (
            <div key={message.id} className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-gray-900">{message.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    message.priority === 'high' ? 'bg-red-100 text-red-800' :
                    message.priority === 'normal' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {message.priority}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    message.type === 'announcement' ? 'bg-purple-100 text-purple-800' :
                    message.type === 'reminder' ? 'bg-yellow-100 text-yellow-800' :
                    message.type === 'encouragement' ? 'bg-green-100 text-green-800' :
                    'bg-indigo-100 text-indigo-800'
                  }`}>
                    {message.type}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {message.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently sent'}
                </span>
              </div>
              <p className="text-gray-700">{message.content}</p>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No messages sent yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesTab;