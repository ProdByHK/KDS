'use client';

import { motion } from 'framer-motion';
import { Activity, Users, Box, TrendingUp, Ship, Zap, ArrowUpRight, ArrowDownRight, Server, Terminal, Shield } from 'lucide-react';

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
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Ecosystem Overview</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time monitoring of all KDS platforms and services.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#1f2937] hover:bg-[#374151] rounded-lg text-sm font-medium transition-colors border border-[#374151]">
            Export Report
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
            Deploy Updates
          </button>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><Activity className="w-5 h-5" /></div>
            <span className="flex items-center text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
              <ArrowUpRight className="w-3 h-3 mr-1" /> 12.5%
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">245.8k</h3>
          <p className="text-sm text-slate-400">Total System Transactions</p>
        </div>
        
        <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><Users className="w-5 h-5" /></div>
            <span className="flex items-center text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
              <ArrowUpRight className="w-3 h-3 mr-1" /> 4.2%
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">12,490</h3>
          <p className="text-sm text-slate-400">Active Enterprise Users</p>
        </div>
        
        <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-gold-500/10 text-gold-400 rounded-lg"><TrendingUp className="w-5 h-5" /></div>
            <span className="flex items-center text-xs font-medium text-red-400 bg-red-400/10 px-2 py-1 rounded-full">
              <ArrowDownRight className="w-3 h-3 mr-1" /> 1.8%
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">$84.2M</h3>
          <p className="text-sm text-slate-400">Commodity Volume (24h)</p>
        </div>
        
        <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-green-500/10 text-green-400 rounded-lg"><Server className="w-5 h-5" /></div>
            <span className="flex items-center text-xs font-medium text-slate-400 bg-slate-800 px-2 py-1 rounded-full">
              Stable
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">99.99%</h3>
          <p className="text-sm text-slate-400">System Uptime</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Platform Status */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl overflow-hidden">
            <div className="p-5 border-b border-[#1f2937] flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Platform Health</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300">View Details</button>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {platforms.map((platform) => (
                  <div key={platform.name} className="p-4 bg-[#0a0f1c] border border-[#1f2937] rounded-lg border-l-2 border-l-blue-500">
                    <div className="flex items-center gap-3 mb-2">
                      <platform.icon className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-sm text-slate-200">{platform.name}</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-lg font-bold text-white">{platform.metric}</div>
                        <div className="text-xs text-slate-500">{platform.label}</div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${platform.status === 'optimal' ? 'bg-green-500' : 'bg-gold-500'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Mock Analytics Chart */}
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-white">Global Logistics Volume</h2>
              <select className="bg-[#0a0f1c] border border-[#1f2937] text-sm text-slate-300 rounded-md px-3 py-1.5 focus:outline-none focus:border-blue-500">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="h-64 flex items-end gap-2">
              {[40, 55, 45, 70, 65, 80, 75, 90, 85, 100, 95, 110].map((height, i) => (
                <div key={i} className="flex-1 bg-[#1f2937] rounded-t-sm relative group hover:bg-[#374151] transition-colors" style={{ height: `${height}%` }}>
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-blue-600/0 to-blue-500/50 rounded-t-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-[#374151] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap pointer-events-none`}>
                    Val: {height * 12}k
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3 text-xs text-slate-500 px-1">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
              <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          {/* AI Control Panel */}
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl overflow-hidden">
            <div className="p-5 border-b border-[#1f2937] flex items-center gap-2">
              <Terminal className="w-5 h-5 text-gold-400" />
              <h2 className="text-lg font-semibold text-white">Sentinel AI Logic</h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Model Status</span>
                <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">Online</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Knowledge Base Sync</span>
                  <span>99.8%</span>
                </div>
                <div className="h-1.5 w-full bg-[#0a0f1c] rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[99.8%]"></div>
                </div>
              </div>
              <div className="pt-3 border-t border-[#1f2937]">
                <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Recent Queries</h4>
                <div className="space-y-3">
                  <div className="text-sm text-slate-300 bg-[#0a0f1c] p-2 rounded border border-[#1f2937]">
                    "Status of Container X192 arriving in Jakarta?"
                  </div>
                  <div className="text-sm text-slate-300 bg-[#0a0f1c] p-2 rounded border border-[#1f2937]">
                    "Current coffee export volume comparison Q1 vs Q2"
                  </div>
                </div>
              </div>
              <button className="w-full py-2 bg-[#1f2937] hover:bg-[#374151] rounded-lg text-sm text-white transition-colors border border-[#374151]">
                Train Model
              </button>
            </div>
          </div>

          {/* User Management */}
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl overflow-hidden">
            <div className="p-5 border-b border-[#1f2937]">
              <h2 className="text-lg font-semibold text-white">Active Enterprise Clients</h2>
            </div>
            <div className="p-0">
              <table className="w-full text-left sm:text-sm text-xs">
                <thead className="bg-[#0a0f1c] text-slate-500 font-medium">
                  <tr>
                    <th className="p-4 font-normal">Client Name</th>
                    <th className="p-4 font-normal text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f2937]">
                  {mockClients.map((client) => (
                    <tr key={client.id} className="hover:bg-[#1f2937]/50 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-slate-200">{client.name}</div>
                        <div className="text-slate-500 text-[11px] mt-0.5">{client.id} • {client.tier}</div>
                      </td>
                      <td className="p-4 text-right">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${
                          client.status === 'Active' ? 'bg-green-400/10 text-green-400 border border-green-400/20' : 'bg-slate-400/10 text-slate-400 border border-slate-400/20'
                        }`}>
                          {client.status}
                        </span>
                        <div className="text-[10px] text-slate-600 mt-1">{client.lastActive}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-3 border-t border-[#1f2937] text-center">
                <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">View All Clients</button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
