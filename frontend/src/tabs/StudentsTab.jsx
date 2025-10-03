import React from "react";
import { Users, Activity, TrendingUp } from "lucide-react";

const StudentsTab = ({ students, lessons }) => {
  return (
    <div className="space-y-8">
      {/* Students Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm">Total Students</p>
              <p className="text-4xl font-extrabold">{students.length}</p>
              <p className="text-indigo-200 text-xs mt-1">Active learners</p>
            </div>
            <Users className="h-12 w-12 text-indigo-200" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm">Active This Week</p>
              <p className="text-4xl font-extrabold">
                {Math.floor(students.length * 0.75)}
              </p>
              <p className="text-emerald-200 text-xs mt-1">Engaged students</p>
            </div>
            <Activity className="h-12 w-12 text-emerald-200" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Avg Completion</p>
              <p className="text-4xl font-extrabold">78%</p>
              <p className="text-purple-200 text-xs mt-1">Lesson progress</p>
            </div>
            <TrendingUp className="h-12 w-12 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Student List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                {["Student", "Progress", "Last Active", "Avg Score", "Status"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {students.map((student, index) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Student Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center font-semibold text-indigo-600">
                        {student.email.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {student.email}
                        </div>
                        <div className="text-xs text-gray-500">Student</div>
                      </div>
                    </div>
                  </td>

                  {/* Progress */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{
                            width: `${Math.floor(Math.random() * 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">
                        {Math.floor(Math.random() * lessons.length)}/
                        {lessons.length}
                      </span>
                    </div>
                  </td>

                  {/* Last Active */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {Math.floor(Math.random() * 7) + 1} days ago
                  </td>

                  {/* Avg Score */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {Math.floor(Math.random() * 40) + 60}%
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        index % 3 === 0
                          ? "bg-emerald-100 text-emerald-800"
                          : index % 3 === 1
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {index % 3 === 0
                        ? "Active"
                        : index % 3 === 1
                        ? "Idle"
                        : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}

              {students.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No students registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentsTab;
