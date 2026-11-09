
import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import {
  LayoutDashboard, Users, DollarSign, Activity, TrendingUp, Search, Bell,
  ChevronDown, Settings, Shield, ArrowUpRight, ArrowDownRight, Menu, X,
  MoreHorizontal, Plus, Filter, Download, Zap, FileText, CheckCircle2, AlertCircle
} from 'lucide-react';

// Sample data for monochrome charts
const analyticsData = [
  { name: 'Jan', revenue: 4000, users: 2400 },
  { name: 'Feb', revenue: 3000, users: 1398 },
  { name: 'Mar', revenue: 9800, users: 2000 },
  { name: 'Apr', revenue: 3908, users: 2780 },
  { name: 'May', revenue: 4800, users: 1890 },
  { name: 'Jun', revenue: 3800, users: 2390 },
  { name: 'Jul', revenue: 6400, users: 3490 },
];

const sparklineData = [
  { v: 10 }, { v: 25 }, { v: 18 }, { v: 30 }, { v: 45 }, { v: 38 }, { v: 55 }
];

const recentActivity = [
  { id: 1, user: 'Alex Rivera', email: 'alex@example.com', role: 'Admin', status: 'Active', amount: '$1,200', time: '2m ago' },
  { id: 2, user: 'Sarah Chen', email: 'sarah@design.io', role: 'Editor', status: 'Active', amount: '$450', time: '15m ago' },
  { id: 3, user: 'Marcus Vance', email: 'm.vance@tech.co', role: 'User', status: 'Pending', amount: '$890', time: '1h ago' },
  { id: 4, user: 'Elena Rostova', email: 'elena@dev.org', role: 'Developer', status: 'Active', amount: '$2,340', time: '3h ago' },
  { id: 5, user: 'David Kim', email: 'dkim@enterprise.com', role: 'Manager', status: 'Inactive', amount: '$150', time: '5h ago' },
];

export default function Dashboard() {
  const [ sidebarOpen, setSidebarOpen ] = useState(false);
  const [ activeTab, setActiveTab ] = useState('Overview');

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-white selection:text-black">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Container */}
      <div className="flex h-screen overflow-hidden">

        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset - y - 0 left - 0 z - 50 w - 64 bg - zinc - 950 border - r border - zinc - 800 transform transition - transform duration - 200 ease -in -out flex flex - col justify - between ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            } `}
        >
          <div>
            {/* Logo Header */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-white rounded flex items-center justify-center font-bold text-black text-sm tracking-tighter">
                  N/X
                </div>
                <span className="font-semibold tracking-wider text-sm uppercase text-white">NEXUS MONO</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Menu */}
            <nav className="p-4 space-y-1">
              {[
                { name: 'Overview', icon: LayoutDashboard },
                { name: 'Analytics', icon: Activity },
                { name: 'Customers', icon: Users },
                { name: 'Transactions', icon: DollarSign },
                { name: 'Security', icon: Shield },
                { name: 'Settings', icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className={`w - full flex items - center gap - 3 px - 3 py - 2.5 rounded - md text - sm font - medium transition - all ${isActive
                      ? 'bg-white text-black shadow-sm font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                      } `}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* System Status / Footer */}
          <div className="p-4 border-t border-zinc-900">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-3 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-400">System Status</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
              </div>
              <p className="text-zinc-300 font-mono text-[11px]">v2.4.0 • All Nodes Operational</p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-black">

          {/* Top Bar Header */}
          <header className="h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur flex items-center justify-between px-4 sm:px-6 z-10">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-zinc-400 hover:text-white rounded-md border border-zinc-800 hover:bg-zinc-900"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Search Bar */}
              <div className="relative w-48 sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search logs, metrics, users..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md pl-9 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                />
              </div>
            </div>

            {/* Actions & Profile */}
            <div className="flex items-center gap-3">
              <button className="p-2 text-zinc-400 hover:text-white border border-zinc-800 rounded-md hover:bg-zinc-900 relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white rounded-full"></span>
              </button>

              <div className="h-6 w-px bg-zinc-800 mx-1 hidden sm:block"></div>

              {/* User Profile */}
              <button className="flex items-center gap-2 p-1.5 rounded-md hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all">
                <div className="w-7 h-7 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center font-mono text-xs font-bold text-white">
                  AD
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-medium leading-none text-zinc-200">Alex Drake</p>
                  <p className="text-[10px] text-zinc-500 leading-tight mt-0.5">Architect</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
              </button>
            </div>
          </header>

          {/* Dashboard Body / Scrollable Content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-5">
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-white">{activeTab}</h1>
                <p className="text-xs text-zinc-400 mt-1">Real-time performance metrics and system activity overview.</p>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded text-xs hover:bg-zinc-800 hover:text-white transition-colors">
                  <Filter className="w-3.5 h-3.5" />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded text-xs hover:bg-zinc-800 hover:text-white transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  Export
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white text-black font-medium rounded text-xs hover:bg-zinc-200 transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  New Project
                </button>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', positive: true, icon: DollarSign },
                { title: 'Active Sessions', value: '+2,350', change: '+180.1%', positive: true, icon: Activity },
                { title: 'Total Users', value: '12,234', change: '-4.5%', positive: false, icon: Users },
                { title: 'Conversion Rate', value: '3.24%', change: '+1.2%', positive: true, icon: TrendingUp },
              ].map((metric, i) => {
                const Icon = metric.icon;
                return (
                  <div key={i} className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-400 font-medium">{metric.title}</span>
                      <Icon className="w-4 h-4 text-zinc-500" />
                    </div>
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="text-2xl font-mono font-bold text-white tracking-tight">{metric.value}</span>
                      <span className={`flex items - center text - xs font - mono ${metric.positive ? 'text-zinc-200' : 'text-zinc-500'} `}>
                        {metric.positive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                        {metric.change}
                      </span>
                    </div>
                    {/* Sparkline Visual Placeholder */}
                    <div className="mt-3 h-8 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sparklineData}>
                          <Line type="monotone" dataKey="v" stroke="#ffffff" strokeWidth={1.5} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Main Area Chart (2 cols wide) */}
              <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 rounded-lg p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-white">Revenue Overview</h3>
                    <p className="text-xs text-zinc-500">Monthly financial progression in USD</p>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 border border-zinc-800 rounded px-2 py-1">2026</span>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData}>
                      <defs>
                        <linearGradient id="monoGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ffffff" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '6px', fontSize: '12px', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#ffffff" strokeWidth={2} fillOpacity={1} fill="url(#monoGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Secondary Bar Chart */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-white">User Acquisition</h3>
                    <p className="text-xs text-zinc-500">New registered accounts</p>
                  </div>
                  <MoreHorizontal className="w-4 h-4 text-zinc-500 cursor-pointer" />
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData}>
                      <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '6px', fontSize: '12px', color: '#fff' }}
                      />
                      <Bar dataKey="users" fill="#ffffff" radius={[ 2, 2, 0, 0 ]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Bottom Section: Data Table & Quick Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Activity Data Table (2 cols) */}
              <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden flex flex-col">
                <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white">Recent Transactions</h3>
                  <button className="text-xs text-zinc-400 hover:text-white transition-colors">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-900 bg-zinc-900/30 text-[11px] font-mono uppercase text-zinc-400">
                        <th className="py-3 px-4">User</th>
                        <th className="py-3 px-4">Role</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4 text-right">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900 text-xs">
                      {recentActivity.map((row) => (
                        <tr key={row.id} className="hover:bg-zinc-900/40 transition-colors">
                          <td className="py-3 px-4 font-medium text-zinc-200">
                            <div>{row.user}</div>
                            <div className="text-[10px] text-zinc-500 font-normal">{row.email}</div>
                          </td>
                          <td className="py-3 px-4 text-zinc-400">{row.role}</td>
                          <td className="py-3 px-4">
                            <span className={`inline - flex items - center px - 2 py - 0.5 rounded text - [ 10px ] font - mono border ${row.status === 'Active'
                              ? 'bg-zinc-900 border-zinc-700 text-white'
                              : row.status === 'Pending'
                                ? 'bg-zinc-950 border-zinc-800 text-zinc-400'
                                : 'bg-black border-zinc-900 text-zinc-600'
                              } `}>
                              {row.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono text-zinc-200">{row.amount}</td>
                          <td className="py-3 px-4 text-right text-zinc-500 font-mono text-[11px]">{row.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* System Audit Feed (1 col) */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 flex flex-col">
                <h3 className="text-sm font-medium text-white mb-4">Audit Logs</h3>
                <div className="space-y-4 flex-1">
                  {[
                    { event: 'API Key Regenerated', detail: 'Prod-Server-01 key updated', time: '12m ago', icon: Shield },
                    { event: 'Deployment Succeeded', detail: 'Commit #89aef2 pushed to main', time: '42m ago', icon: CheckCircle2 },
                    { event: 'High CPU Utilization', detail: 'Worker node 03 spike (94%)', time: '1h ago', icon: AlertCircle },
                    { event: 'New Policy Created', detail: 'Role-based access matrix update', time: '3h ago', icon: FileText },
                  ].map((log, idx) => {
                    const LogIcon = log.icon;
                    return (
                      <div key={idx} className="flex gap-3 text-xs border-b border-zinc-900/80 pb-3 last:border-0 last:pb-0">
                        <div className="mt-0.5 p-1 bg-zinc-900 rounded border border-zinc-800 text-zinc-300 shrink-0">
                          <LogIcon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-zinc-200 truncate">{log.event}</p>
                            <span className="text-[10px] font-mono text-zinc-500 shrink-0">{log.time}</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 truncate mt-0.5">{log.detail}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button className="w-full mt-4 py-2 border border-zinc-800 rounded text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors">
                  View Full Audit Log
                </button>
              </div>

            </div>

          </main>
        </div>

      </div>
    </div>
  );
}
