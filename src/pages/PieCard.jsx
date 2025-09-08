import React, { useMemo, useState } from "react";
import { TrendingUp, AlertTriangle, CheckCircle, Clock, Info, Download, Filter } from "lucide-react";

/**
 * Convert polar coords to cartesian coords (for pie slice path)
 */
function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

/**
 * Build path string for a pie slice
 */
function describePieSlice(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

export default function RefinedPieCard({
  data = [
    { label: "Approved", value: 70, color: "#10b981", icon: CheckCircle, trend: "+5%" },
    { label: "Pending", value: 12, color: "#f59e0b", icon: Clock, trend: "-2%" },
    { label: "Rejected", value: 18, color: "#ef4444", icon: AlertTriangle, trend: "+1%" },
  ],
  size = 280,
  innerRadius = 90,
  title = "Request Status Overview",
  subtitle = "Real-time distribution of request statuses",
  period = "Last 30 days"
}) {
  const [hoveredSlice, setHoveredSlice] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('all');
  
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 10;

  // compute slices with start/end angles
  const slices = useMemo(() => {
    let angleSoFar = 0;
    return data.map((d, index) => {
      const fraction = d.value / total;
      const arcAngle = fraction * 360;
      const slice = {
        ...d,
        index,
        startAngle: angleSoFar,
        endAngle: angleSoFar + arcAngle,
        fraction,
      };
      angleSoFar += arcAngle;
      return slice;
    });
  }, [data, total]);

  const getStatusSummary = () => {
    const approved = data.find(d => d.label.toLowerCase().includes('approved'))?.value || 0;
    const pending = data.find(d => d.label.toLowerCase().includes('pending'))?.value || 0;
    const rejected = data.find(d => d.label.toLowerCase().includes('rejected'))?.value || 0;
    
    return { approved, pending, rejected };
  };

  const { approved, pending, rejected } = getStatusSummary();
  const approvalRate = Math.round((approved / total) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 w-full max-w-5xl mx-auto hover:shadow-xl transition-shadow duration-300">
      {/* Enhanced Header */}
      
      {/* Enhanced Chart Section */}
      <div className="flex gap-8 items-center">
        {/* Interactive Donut Chart */}
        <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
          <svg 
            width={size} 
            height={size} 
            viewBox={`0 0 ${size} ${size}`}
            className="drop-shadow-sm"
          >
            {/* Background circle for better depth */}
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="#f8f9fa"
              stroke="#e5e7eb"
              strokeWidth={1}
            />
            
            {slices.map((s) => {
              const path = describePieSlice(cx, cy, r, s.startAngle, s.endAngle);
              const isHovered = hoveredSlice === s.label;
              const hoverRadius = isHovered ? r + 5 : r;
              const hoverPath = isHovered 
                ? describePieSlice(cx, cy, hoverRadius, s.startAngle, s.endAngle)
                : path;
              
              return (
                <g key={s.label}>
                  <path
                    d={hoverPath}
                    fill={s.color}
                    stroke="white"
                    strokeWidth={3}
                    className="transition-all duration-300 cursor-pointer"
                    style={{
                      filter: isHovered ? 'brightness(1.1) drop-shadow(0 4px 8px rgba(0,0,0,0.15))' : 'none',
                      transformOrigin: `${cx}px ${cy}px`,
                      animation: `sliceIn 800ms ease-out ${s.index * 150}ms both`,
                    }}
                    onMouseEnter={() => setHoveredSlice(s.label)}
                    onMouseLeave={() => setHoveredSlice(null)}
                  />
                </g>
              );
            })}

            {/* Enhanced donut hole with gradient */}
            {innerRadius > 0 && (
              <>
                <defs>
                  <radialGradient id="centerGradient" cx="0.5" cy="0.3">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#f8fafc" />
                  </radialGradient>
                </defs>
                <circle
                  cx={cx}
                  cy={cy}
                  r={innerRadius}
                  fill="url(#centerGradient)"
                  stroke="#e2e8f0"
                  strokeWidth={2}
                />
              </>
            )}
          </svg>

          {/* Enhanced Center Content */}
          {innerRadius > 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500 mb-1">Total Requests</div>
                <div className="text-4xl font-bold text-gray-900 mb-1">{total}</div>
                <div className="text-xs text-gray-400">This Period</div>
                {hoveredSlice && (
                  <div className="mt-3 p-2 bg-white rounded-lg shadow-lg border animate-fade-in">
                    <div className="text-sm font-medium text-gray-900">{hoveredSlice}</div>
                    <div className="text-xs text-gray-500">
                      {data.find(d => d.label === hoveredSlice)?.value} requests
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Legend with Progress Bars */}
        <div className="flex-1 space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              Status Breakdown
              <span className="text-sm font-normal text-gray-500">({period})</span>
            </h4>
            
            <div className="space-y-4">
              {data.map((d) => {
                const percent = Math.round((d.value / total) * 100);
                const IconComponent = d.icon;
                
                return (
                  <div
                    key={d.label}
                    className={`p-4 rounded-xl border transition-all duration-200 ${
                      hoveredSlice === d.label 
                        ? 'shadow-md transform translate-x-2' 
                        : 'shadow-sm hover:shadow-md'
                    }`}
                    style={{
                      backgroundColor: hoveredSlice === d.label ? `${d.color}08` : '#fafafa',
                      borderColor: hoveredSlice === d.label ? d.color : '#e5e7eb',
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: d.color }}
                        />
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4" style={{ color: d.color }} />
                          <span className="font-medium text-gray-900">{d.label}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{d.value}</div>
                        <div className="text-sm text-gray-500">{percent}%</div>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ 
                          backgroundColor: d.color,
                          width: `${percent}%`,
                          animation: `progressFill 1s ease-out ${d.index * 200}ms both`
                        }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Trend: {d.trend}</span>
                      <span className="font-medium" style={{ color: d.color }}>
                        {d.value} requests
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Insights Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <h5 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Key Insights
            </h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• {approvalRate}% approval rate indicates healthy processing</li>
              <li>• {pending} requests currently pending review</li>
              <li>• Peak efficiency achieved with {approved} approvals</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          <p>Data refreshed automatically every 5 minutes • Last updated: just now</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span>Historical trends available in detailed reports</span>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            View Analytics →
          </button>
        </div>
      </div>

      {/* Enhanced Animations */}
      <style jsx>{`
        @keyframes sliceIn {
          0% {
            transform: scale(0.8) rotate(-10deg);
            opacity: 0;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        
        @keyframes progressFill {
          0% {
            width: 0%;
          }
          100% {
            width: ${100}%;
          }
        }
        
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}