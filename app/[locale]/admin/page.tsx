'use client';

import { Activity, Users, Box, TrendingUp, Ship, Zap, ArrowUpRight, ArrowDownRight, Server, Terminal, Shield } from 'lucide-react';
import { useLiveData } from '../../../src/hooks/useLiveData';

const platforms = [
  { name: 'Koonang', metric: '1,245', label: 'Active Sellers', status: 'optimal', icon: Users },
  { name: 'Carry', metric: '8,432', label: 'Tons in Transit', status: 'optimal', icon: Ship },
  { name: 'PasarX', metric: '$2.4M', label: '24h Volume', status: 'warning', icon: TrendingUp },
  { name: 'Konekt', metric: '45ms', label: 'Avg Latency', status: 'optimal', icon: Zap },
  { name: 'K-Secure', metric: '0', label: 'Threats Detected', status: 'optimal', icon: Shield },
  { name: 'Koonang Pay', metric: '124k', label: 'Tx/Hour', status: 'optimal', icon: Activity },
  { name: 'K-Logistics', metric: '98.5%', label: 'On-Time Rate', status: 'optimal', icon: Box },
];

const mockClients = [
  { id: 'ENT-9921', name: 'Global Trade Corp', tier: 'Platinum', status: 'Active', lastActive: '2 mins ago' },
  { id: 'ENT-8432', name: 'Pacific Logistics', tier: 'Gold', status: 'Active', lastActive: '15 mins ago' },
  { id: 'ENT-7710', name: 'Asian Commodities Ltd', tier: 'Platinum', status: 'Active', lastActive: '1 hour ago' },
  { id: 'ENT-6501', name: 'EuroFreight Solutions', tier: 'Silver', status: 'Inactive', lastActive: '2 days ago' },
];

export default function AdminDashboard() {
  const { metrics, formatters } = useLiveData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Ecosystem Overview</h1>
          <p className="text-sm text-white/40 mt-1">Real-time monitoring of all KDS platforms and services.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 glass-card-sm hover:border-white/20 rounded-xl text-sm font-medium transition-all text-white/70 hover:text-white">
            Export Report
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl text-white text-sm font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            Deploy Updates
          </button>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10', value: formatters.formatCompactNumber(metrics.transactions), label: 'Total System Transactions', badge: '12.5%', trend: 'up' },
          { icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10', value: formatters.formatNumberLocale(metrics.users), label: 'Active Enterprise Users', badge: '4.2%', trend: 'up' },
          { icon: TrendingUp, color: 'text-gold-400', bg: 'bg-gold-500/10', value: formatters.formatCurrency(metrics.volume), label: 'Commodity Volume (24h)', badge: '1.8%', trend: 'down' },
          { icon: Server, color: 'text-emerald-400', bg: 'bg-emerald-500/10', value: `${metrics.uptime}%`, label: 'System Uptime', badge: 'Stable', trend: 'stable' },
        ].map((item, i) => (
          <div key={i} className="glass-card p-5 relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white/[0.02] to-transparent rounded-b-3xl" />
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 ${item.bg} ${item.color} rounded-xl`}><item.icon className="w-5 h-5" /></div>
              <span className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                item.trend === 'up' ? 'text-emerald-400 bg-emerald-400/10' :
                item.trend === 'down' ? 'text-red-400 bg-red-400/10' :
                'text-white/40 bg-white/5'
              }`}>
                {item.trend === 'up' && <ArrowUpRight className="w-3 h-3 mr-1" />}
                {item.trend === 'down' && <ArrowDownRight className="w-3 h-3 mr-1" />}
                {item.badge}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1 transition-all">{item.value}</h3>
            <p className="text-sm text-white/40">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platform Status + Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card overflow-hidden">
            <div className="p-5 border-b border-white/[0.06] flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Platform Health</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">View Details</button>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {platforms.map((platform) => (
                <div key={platform.name} className="glass-card-sm p-4 relative overflow-hidden group border-l-2 border-l-blue-500/60">
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-500/5 to-transparent rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-3 mb-2">
                    <platform.icon className="w-4 h-4 text-white/30" />
                    <span className="font-medium text-sm text-white/80">{platform.name}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-lg font-bold text-white">{platform.metric}</div>
                      <div className="text-xs text-white/30">{platform.label}</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${platform.status === 'optimal' ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]' : 'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.7)]'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics Chart */}
          <div className="glass-card p-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-white">Global Logistics Volume</h2>
              <select className="glass-card-sm text-sm text-white/60 px-3 py-1.5 focus:outline-none focus:border-gold-500/30 transition-colors bg-transparent rounded-xl">
                <option className="bg-[#05080f]">Last 7 Days</option>
                <option className="bg-[#05080f]">Last 30 Days</option>
                <option className="bg-[#05080f]">This Year</option>
              </select>
            </div>
            <div className="h-64 flex items-end gap-2">
              {[40, 55, 45, 70, 65, 80, 75, 90, 85, 100, 95, 110].map((height, i) => (
                <div key={i} className="flex-1 rounded-t-lg relative group glass-card-sm !rounded-b-none transition-all hover:!border-white/20" style={{ height: `${height}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-blue-400/10 rounded-t-lg opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 glass-card-sm text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap pointer-events-none">
                    {height * 12}k
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3 text-xs text-white/20 px-1">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
              <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sentinel AI */}
          <div className="glass-card overflow-hidden">
            <div className="p-5 border-b border-white/[0.06] flex items-center gap-2">
              <Terminal className="w-5 h-5 text-gold-400" />
              <h2 className="text-lg font-semibold text-white">Sentinel AI Logic</h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Model Status</span>
                <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">Online</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-white/30">
                  <span>Knowledge Base Sync</span><span>99.8%</span>
                </div>
                <div className="h-1.5 w-full glass-card-sm rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 w-[99.8%] rounded-full" />
                </div>
              </div>
              <div className="pt-3 border-t border-white/[0.06] space-y-3">
                <h4 className="text-xs font-medium text-white/30 uppercase tracking-wider">Recent Queries</h4>
                {['"Status of Container X192 arriving in Jakarta?"', '"Current coffee export volume comparison Q1 vs Q2"'].map((q, i) => (
                  <div key={i} className="text-sm text-white/60 glass-card-sm p-2 rounded-xl">{q}</div>
                ))}
              </div>
              <button className="w-full py-2 glass-card-sm hover:border-white/20 rounded-xl text-sm text-white/60 hover:text-white transition-all">
                Train Model
              </button>
            </div>
          </div>

          {/* Active Clients */}
          <div className="glass-card overflow-hidden">
            <div className="p-5 border-b border-white/[0.06]">
              <h2 className="text-lg font-semibold text-white">Active Enterprise Clients</h2>
            </div>
            <div className="p-0">
              <table className="w-full text-left sm:text-sm text-xs">
                <thead className="text-white/30 font-medium">
                  <tr>
                    <th className="p-4 font-normal">Client Name</th>
                    <th className="p-4 font-normal text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {mockClients.map((client) => (
                    <tr key={client.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-white/80">{client.name}</div>
                        <div className="text-white/30 text-[11px] mt-0.5">{client.id} • {client.tier}</div>
                      </td>
                      <td className="p-4 text-right">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-medium ${
                          client.status === 'Active' ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20' : 'bg-white/5 text-white/30 border border-white/10'
                        }`}>
                          {client.status}
                        </span>
                        <div className="text-[10px] text-white/20 mt-1">{client.lastActive}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-3 border-t border-white/[0.04] text-center">
                <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">View All Clients</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
