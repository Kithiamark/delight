import React from 'react';
import { Users, BookOpen, Award, Activity, CheckCircle2, Youtube, MessageSquare, Mic, TrendingUp } from 'lucide-react';

const OverviewTab = ({ stats }) => {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Students</p>
              <p className="text-3xl font-bold">{stats.totalStudents}</p>
              <p className="text-blue-200 text-xs mt-1">+3 this week</p>
            </div>
            <Users className="h-10 w-10 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Lessons</p>
              <p className="text-3xl font-bold">{stats.totalLessons}</p>
              <p className="text-green-200 text-xs mt-1">Active content</p>
            </div>
            <BookOpen className="h-10 w-10 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Avg Score</p>
              <p className="text-3xl font-bold">{stats.averageScore}%</p>
              <p className="text-purple-200 text-xs mt-1">Class average</p>
            </div>
            <Award className="h-10 w-10 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Active Students</p>
              <p className="text-3xl font-bold">{stats.activeStudents}</p>
              <p className="text-orange-200 text-xs mt-1">This week</p>
            </div>
            <Activity className="h-10 w-10 text-orange-200" />
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: "New student registered", time: "2 hours ago", icon: Users, color: "text-blue-600" },
              { action: "Lesson 'Faith and Trust' completed by 5 students", time: "4 hours ago", icon: CheckCircle2, color: "text-green-600" },
              { action: "Video 'Prayer Basics' uploaded", time: "1 day ago", icon: Youtube, color: "text-red-600" },
              { action: "Announcement sent to all students", time: "2 days ago", icon: MessageSquare, color: "text-purple-600" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <activity.icon className={`h-5 w-5 ${activity.color}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Overview */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <span className="font-medium text-gray-900">Lessons</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">{stats.totalLessons}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Youtube className="h-6 w-6 text-red-600" />
                <span className="font-medium text-gray-900">Videos</span>
              </div>
              <span className="text-2xl font-bold text-red-600">{stats.totalVideos}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Mic className="h-6 w-6 text-purple-600" />
                <span className="font-medium text-gray-900">Podcasts</span>
              </div>
              <span className="text-2xl font-bold text-purple-600">{stats.totalPodcasts}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;