import React from 'react';
import { Youtube, Play, Trash2, Plus } from 'lucide-react';

const VideosTab = ({ videos, onDelete, onCreate }) => {
  const extractYouTubeId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <Youtube className="h-6 w-6 text-red-600 mr-2" />
          Video Library
          <span className="ml-2 text-gray-500 font-medium">
            ({videos.length})
          </span>
        </h2>
        <button
          onClick={onCreate}
          className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-5 py-2.5 rounded-xl shadow hover:shadow-lg hover:opacity-90 transition-all flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Video
        </button>
      </div>

      {/* Video Grid */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* Thumbnail */}
              <div className="aspect-video relative">
                {video.youtubeUrl ? (
                  <img
                    src={`https://img.youtube.com/vi/${extractYouTubeId(
                      video.youtubeUrl
                    )}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100">
                    <Youtube className="h-12 w-12 text-gray-400" />
                  </div>
                )}

                {/* Hover Play Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                  <a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition"
                  >
                    <Play className="h-6 w-6" />
                  </a>
                </div>

                {/* Duration Tag */}
                {video.duration && (
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-gray-900 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {video.description}
                </p>

                {/* Category + Delete */}
                <div className="flex justify-between items-center pt-2">
                  {video.category && (
                    <span className="text-xs font-medium bg-red-100 text-red-700 px-2 py-1 rounded-full">
                      {video.category}
                    </span>
                  )}
                  <button
                    onClick={() => onDelete(video.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {videos.length === 0 && (
            <div className="col-span-full text-center py-16">
              <Youtube className="h-14 w-14 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">
                No videos yet — add your first one!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideosTab;
