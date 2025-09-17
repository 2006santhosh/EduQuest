import React, { useState } from 'react';
import { User, GraduationCap, BookOpen, Users, Award, Calendar, ChevronRight } from 'lucide-react';
import { Link } from "react-router-dom";

const App = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleProfileClick = (profileType) => {
    console.log(`${profileType} profile clicked`);
    // Navigation logic can be added here
  };

  return (
    <div className="min-h-screen w-screen h-screen fixed top-0 right-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="text-center mb-12 max-w-4xl">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Welcome to EduQuest
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Choose your profile to access personalized features, tools, and resources designed for your educational journey.
        </p>
      </div>

      {/* Profile Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Student Card */}
        <Link to="/login">
        <div
          className={`group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transform transition-all duration-500 cursor-pointer ${
            hoveredCard === 'student' ? 'scale-105 -rotate-1' : ''
          }`}
          onMouseEnter={() => setHoveredCard('student')}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => handleProfileClick('student')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-200 z-0"></div>
          <div className="relative z-10 p-8 sm:p-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-blue-800">Student</h2>
                  <p className="text-slate-700">Learn & Grow</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-indigo-600" />
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-slate-800">
                <BookOpen className="w-5 h-5 mr-3 text-blue-600" />
                <span>Access Games and Study Materials</span>
              </div>
              <div className="flex items-center text-slate-800">
                <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                <span>Track Academic Progress</span>
              </div>
              <div className="flex items-center text-slate-800">
                <Award className="w-5 h-5 mr-3 text-blue-600" />
                <span>View Grades and Achievements</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <p className="text-sm text-slate-800 font-medium">
                "Education is the most powerful weapon which you can use to change the world."
              </p>
              <p className="text-xs text-slate-600 mt-1">- Nelson Mandela</p>
            </div>
          </div>
        </div>
        </Link>

        {/* Teacher Card */}
        <Link to="/dashboard">
        <div
          className={`group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transform transition-all duration-500 cursor-pointer ${
            hoveredCard === 'teacher' ? 'scale-105 rotate-1' : ''
          }`}
          onMouseEnter={() => setHoveredCard('teacher')}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => handleProfileClick('teacher')}
        >
          {/* Gradient background behind content */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-200 z-0"></div>

          {/* Foreground content */}
          <div className="relative z-10 p-8 sm:p-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-emerald-800">Teacher</h2>
                  <p className="text-slate-700">Teach & Inspire</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-emerald-700" />
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-slate-900">
                <Users className="w-5 h-5 mr-3 text-emerald-700" />
                <span>Manage Student Progress</span>
              </div>
              <div className="flex items-center text-slate-900">
                <BookOpen className="w-5 h-5 mr-3 text-emerald-700" />
                <span>Share Study Materials</span>
              </div>
              <div className="flex items-center text-slate-900">
                <Award className="w-5 h-5 mr-3 text-emerald-700" />
                <span>Check Grade and Provide Feedback</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
              <p className="text-sm text-slate-900 font-medium">
                "The mediocre teacher tells. The good teacher explains. The superior teacher demonstrates."
              </p>
              <p className="text-xs text-slate-700 mt-1">- William Arthur Ward</p>
            </div>
          </div>
        </div>
        </Link>
      </div>
    

      {/* Footer */}
      <div className="mt-16 text-center">
        <p className="text-slate-600 text-sm">
          Secure • Reliable • Built for Education
        </p>
      </div>
    </div>
  );
};

export default App;
