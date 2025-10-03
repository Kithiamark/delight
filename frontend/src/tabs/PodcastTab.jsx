import React from 'react';
import { Mic, Trash2, Plus, ExternalLink } from 'lucide-react';

const PodcastsTab = ({ podcasts, onDelete, onCreate }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-md p-6 text-white">
        <h2 className="text-xl font-bold">Podcast Library ({podcasts.length})</h2>
        <button
          onClick={onCreate}
          className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium shadow hover:shadow-md hover:bg-gray-50 transition-all flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" /> Add Podcast
        </button>
      </div>

      {/* Podcast List */}
      <div className="bg-white rounded-2xl shadow-md divide-y divide-gray-100">
        {podcasts.map((podcast) => (
          <div
            key={podcast.id}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start space-x-5">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center shadow-inner">
                  <Mic className="h-8 w-8 text-indigo-600" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {podcast.title}
                  </h3>
                  {podcast.duration && (
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      {podcast.duration}
                    </span>
                  )}
                </div>

                {podcast.speaker && (
                  <p className="text-sm font-medium text-indigo-600 mb-2">
                    🎙️ {podcast.speaker}
                  </p>
                )}

                <p className="text-gray-700 mb-4 line-clamp-2">
                  {podcast.description}
                </p>

                {/* Actions */}
                <div className="flex items-center flex-wrap gap-4">
                  <audio controls className="flex-1 max-w-md rounded-md shadow-sm">
                    <source src={podcast.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  <a
                    href={podcast.audioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Open
                  </a>
                  <button
                    onClick={() => onDelete(podcast.id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {podcasts.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mic className="h-10 w-10 text-gray-400" />
            </div>
            <p className="text-lg font-medium">No podcast episodes yet</p>
            <p className="text-sm text-gray-400">Add your first one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PodcastsTab;
