import { useState } from "react";
import { Edit2, LogOut, Mail, Phone, BarChart2, Activity, User, Target, CheckCircle } from "lucide-react";

export default function ProfilePage() {
  const [user] = useState({
    name: "Sahil",
    role: "Frappe Developer",
    email: "sahil@example.com",
    phone: "+91 98765 43210",
    stats: {
      projects: 12,
      tasks: 87,
      completed: 74,
    },
  });

  const completionRate = Math.round((user.stats.completed / user.stats.tasks) * 100);

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header Section */}
      {/* Header Section */}
      <div className="rounded-3xl p-8 shadow-xl text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f97416c1, #f36b21cb)' }}>
        {/* Overlay (just a subtle tint, not solid white) */}
        <div className="absolute inset-0 bg-black/5 backdrop-blur-[2px]"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Profile Info */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm ring-2 ring-white/30">
              <User size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold leading-tight">{user.name}</h1>
              <p className="text-lg text-white/90">{user.role}</p>
            </div>
          </div>

          {/* Buttons */}
          
        </div>
      </div>


      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <Target size={24} className="text-orange-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Active Projects</h3>
              <p className="text-2xl font-bold text-gray-900">{user.stats.projects}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <Activity size={24} className="text-orange-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Tasks</h3>
              <p className="text-2xl font-bold text-gray-900">{user.stats.tasks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <CheckCircle size={24} className="text-orange-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Completion Rate</h3>
              <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="bg-gray-100 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{user.stats.completed} of {user.stats.tasks} tasks</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Contact Information */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <Mail size={20} className="text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="text-gray-900">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <Phone size={20} className="text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Phone</p>
                <p className="text-gray-900">{user.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
            <Activity size={20} className="text-orange-500" /> Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center mt-1">
                <CheckCircle size={16} className="text-green-500" />
              </div>
              <div>
                <p className="text-gray-900 font-medium">Task Completed</p>
                <p className="text-sm text-gray-600">Fixed OCR API bug in invoice processing module</p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mt-1">
                <Target size={16} className="text-blue-500" />
              </div>
              <div>
                <p className="text-gray-900 font-medium">Feature Deployed</p>
                <p className="text-sm text-gray-600">Invoice Scanner v2.1 released to production</p>
                <p className="text-xs text-gray-400 mt-1">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center mt-1">
                <Edit2 size={16} className="text-orange-500" />
              </div>
              <div>
                <p className="text-gray-900 font-medium">Profile Updated</p>
                <p className="text-sm text-gray-600">Updated contact details and skills</p>
                <p className="text-xs text-gray-400 mt-1">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
          <BarChart2 size={20} className="text-orange-500" /> Performance Insights
        </h2>
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <BarChart2 size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Great Progress!</h3>
              <p className="text-gray-600">You've maintained an excellent {completionRate}% task completion rate this month. Keep up the outstanding work!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}