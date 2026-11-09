
import React, { useState } from 'react';
import { Users, Shield, Terminal, Search, Bell, Plus, Activity, Lock, X, UserX, UserCheck, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';

const initialUsers = [
  { id: 1, name: 'Eleanor Vance', email: 'e.vance@sys.io', role: 'Super Admin', status: 'Active', active: 'Just now' },
  { id: 2, name: 'Marcus Sterling', email: 'm.sterling@sys.io', role: 'Security Admin', status: 'Active', active: '4m ago' },
  { id: 3, name: 'Devon Claire', email: 'd.claire@dev.io', role: 'Editor', status: 'Pending', active: '2h ago' },
  { id: 4, name: 'Kaelen Voss', email: 'k.voss@partner.io', role: 'User', status: 'Suspended', active: '3d ago' },
];

const logs = [
  { id: 1, event: 'API Secret Rotation', actor: 'M. Sterling', severity: 'Info', time: '11:54' },
  { id: 2, event: 'User Account Suspended', actor: 'E. Vance', severity: 'Warning', time: '11:42' },
  { id: 3, event: 'Failed SSH Login Attempt', actor: '192.168.1.1', severity: 'Critical', time: '11:30' },
];

export default function Admin() {
  const [ users, setUsers ] = useState(initialUsers);
  const [ query, setQuery ] = useState('');
  const [ modal, setModal ] = useState(false);
  const [ newUser, setNewUser ] = useState({ name: '', email: '', role: 'User' });

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase()) || u.role.toLowerCase().includes(query.toLowerCase())
  );

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
  };

  const deleteUser = (id) => setUsers(users.filter(u => u.id !== id));

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    setUsers([ ...users, { id: Date.now(), ...newUser, status: 'Active', active: 'Just now' } ]);
    setNewUser({ name: '', email: '', role: 'User' });
    setModal(false);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-white selection:text-black">
      {/* Top Header */}
      <header className="h-16 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white text-black font-mono font-black rounded flex items-center justify-center text-xs">ADM</div>
          <span className="font-semibold text-xs tracking-widest text-white uppercase font-mono">ROOT // CONTROL PANEL</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-48 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text" placeholder="Search..." value={query} onChange={e => setQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded pl-8 pr-3 py-1 text-xs font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
            />
          </div>
          <button onClick={() => setModal(true)} className="flex items-center gap-1.5 px-3 py-1 bg-white text-black text-xs font-semibold rounded hover:bg-zinc-200 transition-colors">
            <Plus className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Add User</span>
          </button>
          <div className="w-7 h-7 rounded bg-zinc-900 border border-zinc-700 flex items-center justify-center font-mono text-xs text-white">EV</div>
        </div>
      </header>

      {/* Main Body */}
      <main className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', val: users.length, sub: '+2 this week', icon: Users },
            { label: 'System Load', val: '14.2%', sub: 'All nodes green', icon: Activity },
            { label: 'Active Sessions', val: '42', sub: '12 IP ranges', icon: Shield },
            { label: 'Security Level', val: 'STRICT', sub: '2FA Enforced', icon: Lock },
          ].map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={i} className="bg-zinc-950 border border-zinc-800 rounded p-4">
                <div className="flex justify-between items-center text-zinc-400 text-xs">
                  <span>{m.label}</span> <Icon className="w-4 h-4 text-zinc-500" />
                </div>
                <div className="text-xl font-mono font-bold text-white mt-2">{m.val}</div>
                <div className="text-[10px] font-mono text-zinc-500 mt-0.5">{m.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Table */}
          <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 rounded overflow-hidden">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
              <h2 className="text-sm font-semibold text-white">User Accounts</h2>
              <span className="text-[11px] font-mono text-zinc-500">{filteredUsers.length} entries</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-900/50 text-[10px] font-mono uppercase text-zinc-400 border-b border-zinc-800">
                  <tr>
                    <th className="p-3">User</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 font-mono">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-zinc-900/40">
                      <td className="p-3">
                        <div className="font-sans font-medium text-white">{u.name}</div>
                        <div className="text-[10px] text-zinc-500">{u.email}</div>
                      </td>
                      <td className="p-3 text-zinc-400">{u.role}</td>
                      <td className="p-3">
                        <span className={`px - 2 py - 0.5 rounded text - [ 9px ] border uppercase ${u.status === 'Active' ? 'bg-zinc-950 border-zinc-700 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                          } `}>
                          {u.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-1">
                        <button onClick={() => toggleStatus(u.id)} className="p-1 hover:text-white text-zinc-400">
                          {u.status === 'Active' ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                        </button>
                        <button onClick={() => deleteUser(u.id)} className="p-1 hover:text-white text-zinc-500">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System Audit Feed */}
          <div className="bg-zinc-950 border border-zinc-800 rounded p-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-zinc-900 mb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-white" />
                  <h3 className="text-xs font-semibold text-white">Live Audit Feed</h3>
                </div>
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </div>
              <div className="space-y-3 font-mono text-[11px]">
                {logs.map((l) => (
                  <div key={l.id} className="p-2 bg-zinc-900/40 border border-zinc-900 rounded">
                    <div className="flex justify-between text-zinc-500 text-[10px]">
                      <span>{l.time}</span>
                      <span className={l.severity === 'Critical' ? 'text-white font-bold' : 'text-zinc-400'}>{l.severity}</span>
                    </div>
                    <div className="text-white mt-1">{l.event}</div>
                    <div className="text-[10px] text-zinc-500">By: {l.actor}</div>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full mt-4 py-1.5 border border-zinc-800 rounded text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors">
              Export Audit Stream
            </button>
          </div>
        </div>
      </main>

      {/* Add User Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded w-full max-w-sm p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
              <h3 className="text-xs font-mono font-bold text-white uppercase">Add New Account</h3>
              <button onClick={() => setModal(false)} className="text-zinc-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleAddUser} className="space-y-3 text-xs font-mono">
              <div>
                <label className="text-zinc-400 block mb-1">Full Name</label>
                <input
                  type="text" required value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-white focus:outline-none focus:border-zinc-500"
                />
              </div>
              <div>
                <label className="text-zinc-400 block mb-1">Email Address</label>
                <input
                  type="email" required value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-white focus:outline-none focus:border-zinc-500"
                />
              </div>
              <div>
                <label className="text-zinc-400 block mb-1">Role</label>
                <select
                  value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-white focus:outline-none focus:border-zinc-500"
                >
                  <option value="User">User</option>
                  <option value="Editor">Editor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModal(false)} className="px-3 py-1.5 text-zinc-400 hover:text-white">Cancel</button>
                <button type="submit" className="px-3 py-1.5 bg-white text-black font-semibold rounded hover:bg-zinc-200">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}