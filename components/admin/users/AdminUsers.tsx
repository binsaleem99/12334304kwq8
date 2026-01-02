import React, { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, Check, X, Shield, Lock, Trash2, Mail, User, ChevronLeft, ChevronRight, Download, Edit } from 'lucide-react';
import UserDetailModal from './UserDetailModal';

const AdminUsers: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [selectedUserForModal, setSelectedUserForModal] = useState<any | null>(null);

  // Mock Data
  const users = [
    { id: '1', name: 'محمد أحمد', email: 'm@email.com', plan: 'Pro', status: 'active', joined: '15/12/2024', avatar: 'bg-blue-500' },
    { id: '2', name: 'سارة علي', email: 's@email.com', plan: 'Basic', status: 'active', joined: '10/12/2024', avatar: 'bg-pink-500' },
    { id: '3', name: 'خالد محمد', email: 'k@email.com', plan: 'Premium', status: 'suspended', joined: '05/12/2024', avatar: 'bg-yellow-500' },
    { id: '4', name: 'نورة سعد', email: 'n@email.com', plan: 'Pro', status: 'trial', joined: '01/12/2024', avatar: 'bg-purple-500' },
    { id: '5', name: 'فهد العنزي', email: 'f@email.com', plan: 'Enterprise', status: 'active', joined: '28/11/2024', avatar: 'bg-green-500' },
    { id: '6', name: 'أحمد سالم', email: 'a@email.com', plan: 'Basic', status: 'inactive', joined: '25/11/2024', avatar: 'bg-red-500' },
    { id: '7', name: 'منى الكندري', email: 'm.k@email.com', plan: 'Pro', status: 'active', joined: '20/11/2024', avatar: 'bg-indigo-500' },
  ];

  const filteredUsers = users.filter(user => 
    user.name.includes(searchQuery) || user.email.includes(searchQuery)
  );

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id));
    }
  };

  const toggleSelectUser = (id: string) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(u => u !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const openUserDetail = (user: any) => {
      setSelectedUserForModal(user);
      setActiveMenu(null);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active': return <span className="px-2 py-1 rounded text-xs font-bold bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/50">Active</span>;
      case 'trial': return <span className="px-2 py-1 rounded text-xs font-bold bg-[#FACC15]/20 text-[#FACC15] border border-[#FACC15]/50">Trial</span>;
      case 'suspended': return <span className="px-2 py-1 rounded text-xs font-bold bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/50">Suspended</span>;
      default: return <span className="px-2 py-1 rounded text-xs font-bold bg-[#666666]/20 text-[#A0A0A0] border border-[#666666]/50">Inactive</span>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch(plan) {
      case 'Pro': return <span className="text-[#7C3AED] font-black">⭐ Pro</span>;
      case 'Premium': return <span className="text-[#F472B6] font-black">Premium</span>;
      case 'Enterprise': return <span className="text-[#F97316] font-black">Enterprise</span>;
      default: return <span className="text-[#A0A0A0] font-bold">Basic</span>;
    }
  };

  return (
    <div className="space-y-6 relative min-h-[calc(100vh-100px)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-white mb-1">Users Management</h1>
            <p className="text-[#A0A0A0] text-sm">Manage user access, plans, and status.</p>
        </div>
        <div className="flex flex-wrap gap-3">
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search users..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#1A1A1A] border border-[#333333] text-white pl-10 pr-4 py-2 rounded focus:outline-none focus:border-[#7C3AED] transition-colors w-64"
                />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]" />
            </div>
            
            <button className="flex items-center gap-2 px-3 py-2 bg-[#1A1A1A] border border-[#333333] text-white rounded hover:bg-[#2A2A2A] transition-colors">
                <Filter size={16} /> Filter
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-[#7C3AED] text-white font-bold rounded hover:bg-[#6D28D9] transition-colors">
                <Plus size={18} /> Add User
            </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-[#333333] bg-[#0A0A0A]">
                        <th className="p-4 w-12">
                            <input 
                                type="checkbox" 
                                checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                                onChange={toggleSelectAll}
                                className="w-4 h-4 bg-[#1A1A1A] border-[#333333] rounded accent-[#7C3AED]"
                            />
                        </th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">User</th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Email</th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Plan</th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Status</th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Joined</th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-[#333333] hover:bg-[#2A2A2A] transition-colors group">
                            <td className="p-4">
                                <input 
                                    type="checkbox" 
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() => toggleSelectUser(user.id)}
                                    className="w-4 h-4 bg-[#1A1A1A] border-[#333333] rounded accent-[#7C3AED]"
                                />
                            </td>
                            <td className="p-4 cursor-pointer" onClick={() => openUserDetail(user)}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${user.avatar}`}>
                                        {user.name.charAt(0)}
                                    </div>
                                    <span className="font-bold text-white group-hover:text-[#7C3AED] transition-colors">{user.name}</span>
                                </div>
                            </td>
                            <td className="p-4 text-[#CCCCCC] font-mono text-sm">{user.email}</td>
                            <td className="p-4">{getPlanBadge(user.plan)}</td>
                            <td className="p-4">{getStatusBadge(user.status)}</td>
                            <td className="p-4 text-[#666666] text-sm font-bold">{user.joined}</td>
                            <td className="p-4 text-right relative">
                                <button 
                                    onClick={() => setActiveMenu(activeMenu === user.id ? null : user.id)}
                                    className="p-1 text-[#666666] hover:text-white rounded hover:bg-[#333333] transition-colors"
                                >
                                    <MoreVertical size={18} />
                                </button>

                                {/* Dropdown Menu */}
                                {activeMenu === user.id && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)}></div>
                                        <div className="absolute right-8 top-8 w-48 bg-[#1A1A1A] border border-[#333333] rounded shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-20 overflow-hidden">
                                            <button 
                                                onClick={() => openUserDetail(user)}
                                                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2A2A2A] flex items-center gap-2"
                                            >
                                                <Edit size={14} /> Edit Details
                                            </button>
                                            <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2A2A2A] flex items-center gap-2">
                                                <Shield size={14} /> Change Plan
                                            </button>
                                            <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2A2A2A] flex items-center gap-2">
                                                <User size={14} /> Impersonate
                                            </button>
                                            <div className="h-px bg-[#333333]"></div>
                                            <button className="w-full text-left px-4 py-2 text-sm text-[#EF4444] hover:bg-[#2A2A2A] flex items-center gap-2">
                                                <Trash2 size={14} /> Delete User
                                            </button>
                                        </div>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between p-4 bg-[#0A0A0A] border-t border-[#333333]">
            <span className="text-xs text-[#666666]">Showing 1-7 of 1,247 users</span>
            <div className="flex items-center gap-2">
                <button className="p-1 text-[#666666] hover:text-white disabled:opacity-50">
                    <ChevronLeft size={18} />
                </button>
                <button className="px-3 py-1 bg-[#1A1A1A] border border-[#333333] text-white text-xs font-bold rounded">1</button>
                <button className="px-3 py-1 text-[#666666] hover:bg-[#1A1A1A] rounded text-xs font-bold">2</button>
                <button className="px-3 py-1 text-[#666666] hover:bg-[#1A1A1A] rounded text-xs font-bold">3</button>
                <span className="text-[#666666]">...</span>
                <button className="p-1 text-[#666666] hover:text-white">
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
      </div>

      {/* Bulk Actions Floating Bar */}
      {selectedUsers.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1A1A1A] border border-[#7C3AED] rounded-lg shadow-[0_0_20px_rgba(124,58,237,0.3)] px-6 py-3 flex items-center gap-6 z-30 animate-in slide-in-from-bottom-4">
            <span className="text-white font-bold text-sm bg-[#7C3AED] px-2 py-0.5 rounded text-xs">{selectedUsers.length} selected</span>
            <div className="h-4 w-px bg-[#333333]"></div>
            <div className="flex items-center gap-2">
                <button className="text-[#CCCCCC] hover:text-white text-sm font-bold flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-[#2A2A2A]">
                    <Shield size={14} /> Change Plan
                </button>
                <button className="text-[#CCCCCC] hover:text-white text-sm font-bold flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-[#2A2A2A]">
                    <Lock size={14} /> Suspend
                </button>
                <button className="text-[#EF4444] hover:text-red-400 text-sm font-bold flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-[#2A2A2A]">
                    <Trash2 size={14} /> Delete
                </button>
            </div>
            <button 
                onClick={() => setSelectedUsers([])}
                className="ml-2 p-1 text-[#666666] hover:text-white"
            >
                <X size={16} />
            </button>
        </div>
      )}

      {/* User Detail Modal */}
      {selectedUserForModal && (
          <UserDetailModal 
            user={selectedUserForModal} 
            onClose={() => setSelectedUserForModal(null)} 
          />
      )}

    </div>
  );
};

export default AdminUsers;