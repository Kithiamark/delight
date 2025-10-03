import React from 'react';
import { MessageSquare, Plus } from 'lucide-react';

const MessagesTab = ({ messages, onSend }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-teal-500" />
          Message History
        </h2>
        <button
          onClick={onSend}
          className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-5 py-2 rounded-xl hover:opacity-90 transition flex items-center shadow-sm"
        >
          <Plus className="h-5 w-5 mr-2" /> Send New
        </button>
      </div>
      
      {/* Messages List */}
      <div className="bg-white rounded-2xl shadow-md">
        <div className="divide-y divide-gray-100">
          {messages.map((message) => (
            <div key={message.id} className="p-6 hover:bg-gray-50 transition">
              <div className="flex justify-between items-start mb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">{message.title}</h3>
                  
                  {/* Priority Badge */}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full shadow-sm
                    ${message.priority === 'high' ? 'bg-red-100 text-red-700' :
                      message.priority === 'normal' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'}`}>
                    {message.priority}
                  </span>
                  
                  {/* Type Badge */}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full shadow-sm
                    ${message.type === 'announcement' ? 'bg-purple-100 text-purple-700' :
                      message.type === 'reminder' ? 'bg-yellow-100 text-yellow-700' :
                      message.type === 'encouragement' ? 'bg-green-100 text-green-700' :
                      'bg-indigo-100 text-indigo-700'}`}>
                    {message.type}
                  </span>
                </div>
                <span className="text-sm text-gray-400">
                  {message.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently sent'}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">{message.content}</p>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              No messages sent yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesTab;
