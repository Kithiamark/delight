// components/StatsCards.jsx
const StatsCards = ({ stats }) => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Students */}
      <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
        {/* ... content ... */}
      </div>
      
      {/* Total Lessons */}
      <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl p-6 text-white shadow-lg">
        {/* ... content ... */}
      </div>
      
      {/* Avg Score */}
      <div className="bg-gradient-to-br from-fuchsia-500 to-fuchsia-700 rounded-xl p-6 text-white shadow-lg">
        {/* ... content ... */}
      </div>
      
      {/* Active Students */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl p-6 text-white shadow-lg">
        {/* ... content ... */}
      </div>
    </div>
);