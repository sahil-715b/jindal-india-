import React, { useState } from 'react';
import { Home, Gift, Package, CreditCard, TrendingUp, Clock, CheckCircle, AlertCircle, Star, Trophy, Target, QrCode, Filter } from 'lucide-react';
const Loyalty = () => {
    const [activeTab, setActiveTab] = useState('history');
    const [filterStatus, setFilterStatus] = useState('all');
    // Sample data
    const loyaltyHistory = [
        { id: 'PO145HG36', points: 1250, status: 'Success', deliveredDate: '4 Aug, 2025', orderDate: '1 Aug, 2025', type: 'purchase' },
        { id: 'PO144RT29', points: 500, status: 'Success', deliveredDate: '4 Aug, 2025', orderDate: '1 Aug, 2025', type: 'purchase' },
        { id: 'PO143MN82', points: 750, status: 'Success', deliveredDate: '3 Aug, 2025', orderDate: '31 Jul, 2025', type: 'purchase' },
        { id: 'PO142XY15', points: 500, status: 'Pending', deliveredDate: '4 Aug, 2025', orderDate: '1 Aug, 2025', type: 'purchase' },
        { id: 'PO141ZA97', points: 250, status: 'Pending', deliveredDate: '4 Aug, 2025', orderDate: '1 Aug, 2025', type: 'purchase' },
        { id: 'REF789', points: 300, status: 'Success', deliveredDate: '2 Aug, 2025', orderDate: '2 Aug, 2025', type: 'referral' },
        { id: 'BON456', points: 100, status: 'Success', deliveredDate: '1 Aug, 2025', orderDate: '1 Aug, 2025', type: 'bonus' },
        { id: 'PO140KL63', points: 625, status: 'Success', deliveredDate: '30 Jul, 2025', orderDate: '28 Jul, 2025', type: 'purchase' },
    ];
    const rewardTiers = [
        { name: 'Bronze', minPoints: 0, maxPoints: 999, color: 'bg-amber-600', current: false },
        { name: 'Silver', minPoints: 1000, maxPoints: 2499, color: 'bg-gray-500', current: true },
        { name: 'Gold', minPoints: 2500, maxPoints: 4999, color: 'bg-yellow-500', current: false },
        { name: 'Platinum', minPoints: 5000, maxPoints: 9999, color: 'bg-purple-600', current: false },
    ];
    const availableRewards = [
        { id: 1, name: '10% Discount', points: 500, category: 'discount', image: '🎫' },
        { id: 2, name: 'Free Shipping', points: 250, category: 'shipping', image: '📦' },
        { id: 3, name: '$25 Gift Card', points: 2000, category: 'voucher', image: '🎁' },
        { id: 4, name: 'Premium Support', points: 1500, category: 'service', image: '⭐' },
        { id: 5, name: '20% Off Next Order', points: 800, category: 'discount', image: '🏷️' },
        { id: 6, name: 'VIP Access', points: 3000, category: 'exclusive', image: '👑' },
    ];
    const filteredHistory = filterStatus === 'all'
        ? loyaltyHistory
        : loyaltyHistory.filter(item => item.status.toLowerCase() === filterStatus);
    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'success': return <CheckCircle className="w-4 h-4 text-green-500"/>;
            case 'pending': return <Clock className="w-4 h-4 text-orange-500"/>;
            default: return <AlertCircle className="w-4 h-4 text-gray-500"/>;
        }
    };
    const getTypeIcon = (type) => {
        switch (type) {
            case 'purchase': return <Package className="w-4 h-4 text-blue-500"/>;
            case 'referral': return <Star className="w-4 h-4 text-purple-500"/>;
            case 'bonus': return <Gift className="w-4 h-4 text-green-500"/>;
            default: return <Trophy className="w-4 h-4 text-gray-500"/>;
        }
    };
    return (<div className="min-h-screen bg-gray-50">


      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Points Overview */}
          

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6 h-[60vh] overflow-scroll">
            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  <button onClick={() => setActiveTab('history')} className={`py-4 px-2 border-b-2 font-medium text-sm ${activeTab === 'history'
            ? 'border-orange-500 text-orange-600'
            : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                    Points History
                  </button>
                  <button onClick={() => setActiveTab('rewards')} className={`py-4 px-2 border-b-2 font-medium text-sm ${activeTab === 'rewards'
            ? 'border-orange-500 text-orange-600'
            : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                    
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              {/* Tab Content - show both always */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Loyalty Points History</h2>
                    <p className="text-sm text-gray-600 mt-1">From Sun 1 Jun, 25 to Thu 4 Aug, 25</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Filter className="w-4 h-4 text-gray-500"/>
                      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                        <option value="all">All Status</option>
                        <option value="success">Success</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                   
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredHistory.map((item, index) => (<div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg">
                          {getTypeIcon(item.type)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900">{item.id}</p>
                            {getStatusIcon(item.status)}
                          </div>
                          <p className="text-sm text-gray-600">Delivered on {item.deliveredDate}</p>
                          <p className="text-xs text-gray-500">Order Date: {item.orderDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${item.status === 'Success' ? 'text-green-600' : 'text-orange-500'}`}>
                          +{item.points}
                        </p>
                        <p className={`text-sm capitalize ${item.status === 'Success' ? 'text-green-600' : 'text-orange-500'}`}>
                          {item.status}
                        </p>
                      </div>
                    </div>))}
                </div>
              </div>

             

            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col justify-around space-y-6">
            {/* Points Cards */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-gray-600">Actual Loyalty Points</span>
                  </div>
                  <p className="text-3xl font-bold text-orange-500">1750</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-3 h-3 bg-orange-300 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-gray-600">Provisional Points</span>
                  </div>
                  <p className="text-3xl font-bold text-orange-300">750</p>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200">
                Redeem Now
              </button>
            </div>



            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-green-500 mr-2"/>
                    <span className="text-gray-600">Points This Month</span>
                  </div>
                  <span className="font-semibold text-gray-900">+1,250</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Target className="w-5 h-5 text-blue-500 mr-2"/>
                    <span className="text-gray-600">Total Earned</span>
                  </div>
                  <span className="font-semibold text-gray-900">5,420</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Gift className="w-5 h-5 text-purple-500 mr-2"/>
                    <span className="text-gray-600">Rewards Claimed</span>
                  </div>
                  <span className="font-semibold text-gray-900">12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Reward Tiers */}
        <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Available Rewards</h2>
                  <p className="text-sm text-gray-600">Redeem your points for exciting rewards</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableRewards.map((reward) => (<div key={reward.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{reward.image}</span>
                          <div>
                            <h3 className="font-medium text-gray-900">{reward.name}</h3>
                            <span className="text-xs text-gray-500 capitalize">{reward.category}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-orange-600">{reward.points}</p>
                          <p className="text-xs text-gray-500">points</p>
                        </div>
                      </div>
                      <button className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${1750 >= reward.points
                ? 'bg-orange-600 text-white hover:bg-orange-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`} disabled={1750 < reward.points}>
                        {1750 >= reward.points ? 'Redeem Now' : 'Need More Points'}
                      </button>
                    </div>))}
                </div>
              </div>
      </div>
      

      {/* Bottom Navigation for Mobile Feel */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-3">
          <button className="flex flex-col items-center p-2">
            <Home className="w-5 h-5 text-gray-500"/>
            <span className="text-xs text-gray-500 mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center p-2">
            <Gift className="w-5 h-5 text-orange-500"/>
            <span className="text-xs text-orange-500 mt-1">Rewards</span>
          </button>
          <button className="flex items-center justify-center w-12 h-12 bg-orange-500 rounded-full">
            <QrCode className="w-6 h-6 text-white"/>
          </button>
          <button className="flex flex-col items-center p-2">
            <Package className="w-5 h-5 text-gray-500"/>
            <span className="text-xs text-gray-500 mt-1">Orders</span>
          </button>
          <button className="flex flex-col items-center p-2">
            <CreditCard className="w-5 h-5 text-gray-500"/>
            <span className="text-xs text-gray-500 mt-1">Wallet</span>
          </button>
        </div>
      </div>
    </div>);
};
export default Loyalty;
