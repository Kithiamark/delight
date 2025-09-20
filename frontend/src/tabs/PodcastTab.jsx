import React from 'react';
import { Mic, Trash2, Plus, ExternalLink } from 'lucide-react';

const PodcastsTab = ({ podcasts, onDelete, onCreate }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800">Podcast Library ({podcasts.length})</h2>
        <button
          onClick={onCreate}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" /> Add Podcast
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm">
        <div className="divide-y divide-gray-200">
          {podcasts.map((podcast) => (
            <div key={podcast.id} className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Mic className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{podcast.title}</h3>
                    {podcast.duration && (
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {podcast.duration}
                      </span>
                    )}
                  </div>
                  {podcast.speaker && (
                    <p className="text-sm font-medium text-purple-600 mb-2">
                      Speaker: {podcast.speaker}
                    </p>
                  )}
                  <p className="text-gray-700 mb-3 line-clamp-2">{podcast.description}</p>
                  <div className="flex items-center space-x-4">
                    <audio controls className="flex-1 max-w-md">
                      <source src={podcast.audioUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    <a
                      href={podcast.audioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 flex items-center text-sm"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Open
                    </a>
                    <button
                      onClick={() => onDelete(podcast.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {podcasts.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              <Mic className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p>No podcast episodes added yet. Add your first episode!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PodcastsTab;