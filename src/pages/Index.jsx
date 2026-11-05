import React from 'react';
import { DollarSign, Package, Clock, CheckCircle, Truck, FileText, Users, Edit3, TrendingUp, Calendar } from 'lucide-react';
import PieCard from './PieCard';
const Index = () => {
    // Sample data for the chart
    const chartData = [
        { month: 'Jan', value: 0 },
        { month: 'Feb', value: 0 },
        { month: 'Mar', value: 0 },
        { month: 'Apr', value: 0 },
        { month: 'May', value: 0 },
        { month: 'Jun', value: 2 },
        { month: 'Jul', value: 40 },
        { month: 'Aug', value: 22 },
        { month: 'Sep', value: 18 },
        { month: 'Oct', value: 0 },
        { month: 'Nov', value: 0 },
        { month: 'Dec', value: 0 }
    ];
    const maxValue = Math.max(...chartData.map(d => d.value));
    const StatCard = ({ title, value, icon: Icon, color, bgColor, trend }) => (<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (<div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1"/>
              <span className="text-sm text-green-600 font-medium">{trend}</span>
            </div>)}
        </div>
        <div className={`${bgColor} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${color}`}/>
        </div>
      </div>
    </div>);
    return (<div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, <span className='text-[#ea580c]'>Shalu Rawal!</span></h1>
              <p className="text-gray-600">Here's what's happening with your business today.</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2"/>
                <span className="text-sm font-medium">September 3, 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Order Value" value="$0" icon={DollarSign} color="text-green-600" bgColor="bg-green-50" trend="+0% from last month"/>
          <StatCard title="Total Orders" value="0" icon={Package} color="text-purple-600" bgColor="bg-purple-50" trend="+0% from last month"/>
          <StatCard title="Pending Orders" value="0" icon={Clock} color="text-orange-600" bgColor="bg-orange-50" trend="+45% from last month"/>
          <StatCard title="Confirmed Orders" value="0" icon={CheckCircle} color="text-orange-600" bgColor="bg-emerald-50" trend="+0% from last month"/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Picked Orders" value="0" icon={Truck} color="text-red-600" bgColor="bg-red-50" trend="+0% from last month"/>
          <StatCard title="Invoiced Orders" value="0" icon={FileText} color="text-yellow-600" bgColor="bg-yellow-50" trend="+0% from last month"/>
          <StatCard title="End Customers" value="0" icon={Users} color="text-pink-600" bgColor="bg-pink-50" trend="+0% from last month"/>
          <StatCard title="Draft Orders" value="0" icon={Edit3} color="text-indigo-600" bgColor="bg-indigo-50" trend="+0% from last month"/>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Trends</h2>
            <p className="text-gray-600">Monthly order volume overview</p>
          </div>
          
          <div className="relative">
            {/* Chart */}
            <div className="flex items-end justify-between h-64 mb-4">
              {chartData.map((data, index) => (<div key={index} className="flex flex-col items-center flex-1 mx-1">
                  <div className="w-full flex items-end justify-center h-48">
                    <div className="bg-gradient-to-t p-4 from-blue-500 to-blue-400 rounded-t-sm transition-all duration-300 hover:from-blue-600 hover:to-blue-500 cursor-pointer shadow-sm" style={{
                height: maxValue > 0 ? `${(data.value / maxValue) * 100}%` : '2px',
                minHeight: '2px',
                width: '70%'
            }} title={`${data.month}: ${data.value} orders`}></div>
                  </div>
                  <span className="text-xs font-medium text-gray-600 mt-2">{data.month}</span>
                </div>))}
            </div>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-48 flex flex-col justify-between text-xs text-gray-500 -ml-8">
              <span>{maxValue || 50}</span>
              <span>{Math.round((maxValue || 50) * 0.75)}</span>
              <span>{Math.round((maxValue || 50) * 0.5)}</span>
              <span>{Math.round((maxValue || 50) * 0.25)}</span>
              <span>0</span>
            </div>
          </div>
          
          {/* Chart Footer */}
          <div className="border-t border-gray-100 pt-4 mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Peak activity in July-August period</span>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Orders</span>
              </div>
            </div>
          </div>
        </div>
      <PieCard />
      </div>
    </div>);
};
export default Index;
