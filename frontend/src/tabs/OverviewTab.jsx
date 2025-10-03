import React from "react";
import {
  Users,
  BookOpen,
  Award,
  Activity,
  CheckCircle2,
  Youtube,
  MessageSquare,
  Mic,
} from "lucide-react";

const OverviewTab = ({ stats }) => {
  return (
    <div className="space-y-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Students",
            value: stats.totalStudents,
            sub: "+3 this week",
            gradient: "from-emerald-500 to-teal-600",
            icon: <Users className="h-10 w-10 text-emerald-200" />,
          },
          {
            label: "Total Lessons",
            value: stats.totalLessons,
            sub: "Active content",
            gradient: "from-indigo-500 to-purple-600",
            icon: <BookOpen className="h-10 w-10 text-indigo-200" />,
          },
          {
            label: "Avg Score",
            value: `${stats.averageScore}%`,
            sub: "Class average",
            gradient: "from-cyan-500 to-sky-600",
            icon: <Award className="h-10 w-10 text-cyan-200" />,
          },
          {
            label: "Active Students",
            value: stats.activeStudents,
            sub: "This week",
            gradient: "from-pink-500 to-rose-600",
            icon: <Activity className="h-10 w-10 text-pink-200" />,
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`relative overflow-hidden bg-gradient-to-br ${card.gradient} rounded-2xl p-6 text-white shadow-lg transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl`}
          >
            {/* Glow accent */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-20 rounded-2xl" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">{card.label}</p>
                <p className="text-3xl font-bold mt-1">{card.value}</p>
                <p className="text-xs text-white/70 mt-1">{card.sub}</p>
              </div>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity + Content Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Recent Activity */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-5">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[
              {
                action: "New student registered",
                time: "2 hours ago",
                icon: Users,
                color: "text-emerald-600",
                bg: "bg-emerald-100",
              },
              {
                action: "Lesson 'Faith and Trust' completed by 5 students",
                time: "4 hours ago",
                icon: CheckCircle2,
                color: "text-green-600",
                bg: "bg-green-100",
              },
              {
                action: "Video 'Prayer Basics' uploaded",
                time: "1 day ago",
                icon: Youtube,
                color: "text-rose-600",
                bg: "bg-rose-100",
              },
              {
                action: "Announcement sent to all students",
                time: "2 days ago",
                icon: MessageSquare,
                color: "text-indigo-600",
                bg: "bg-indigo-100",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
              >
                <div
                  className={`flex items-center justify-center h-10 w-10 rounded-full ${activity.bg}`}
                >
                  <activity.icon className={`h-5 w-5 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Overview */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-5">
            Content Overview
          </h3>
          <div className="space-y-5">
            {[
              {
                label: "Lessons",
                value: stats.totalLessons,
                icon: BookOpen,
                bg: "bg-emerald-100",
                color: "text-emerald-600",
              },
              {
                label: "Videos",
                value: stats.totalVideos,
                icon: Youtube,
                bg: "bg-blue-100",
                color: "text-blue-600",
              },
              {
                label: "Podcasts",
                value: stats.totalPodcasts,
                icon: Mic,
                bg: "bg-purple-100",
                color: "text-purple-600",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-5 rounded-xl ${item.bg} hover:shadow-md transition`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                  <span className="font-medium text-gray-900">{item.label}</span>
                </div>
                <span className={`text-2xl font-bold ${item.color}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
