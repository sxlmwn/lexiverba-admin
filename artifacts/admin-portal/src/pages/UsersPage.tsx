import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../components/ui/dropdown-menu';

export const UsersPage: React.FC = () => {
  const users = Array.from({ length: 20 }).map((_, i) => ({
    id: `USR-${1000 + i}`,
    name: `User Name ${i}`,
    email: `user${i}@lexiverba.com`,
    role: ['Admin', 'Agency Manager', 'Translator', 'Customer'][i % 4],
    status: ['Active', 'Suspended', 'Pending'][i % 3],
    joined: `2026-0${1 + (i % 6)}-15`,
    lastLogin: `2 hours ago`,
  }));

  return (
    <div className="space-y-6 animate-page-enter">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Users</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">Manage platform access, roles, and status</p>
        </div>
        <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-md transition-all cursor-pointer">
          Add New User
        </button>
      </div>

      <div className="flex gap-4">
        <input 
          type="text" 
          placeholder="Search by name or email..." 
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-[#18181b] text-sm w-80 outline-none focus:border-blue-500"
        />
        <select className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-[#18181b] text-sm outline-none cursor-pointer">
          <option>All Roles</option>
          <option>Admin</option>
          <option>Translator</option>
          <option>Agency Manager</option>
          <option>Customer</option>
        </select>
      </div>

      <Card className="p-0 overflow-hidden" hoverable={false} interactive={false}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="bg-slate-100 dark:bg-zinc-800 px-2.5 py-1 rounded-md text-xs font-semibold border border-slate-200 dark:border-zinc-700">{user.role}</span>
                </TableCell>
                <TableCell>
                  <Badge status={user.status}>{user.status}</Badge>
                </TableCell>
                <TableCell className="text-slate-500 text-sm font-medium">{user.joined}</TableCell>
                <TableCell className="text-slate-500 text-sm font-medium">{user.lastLogin}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <button className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 flex items-center justify-center text-slate-500 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Settings</DropdownMenuItem>
                      <DropdownMenuItem className="text-amber-500 focus:text-amber-500">Suspend Access</DropdownMenuItem>
                      <DropdownMenuItem className="text-rose-500 focus:text-rose-500">Delete User</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="p-4 border-t dark:border-zinc-800 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50 dark:bg-zinc-800/30">
          <span>Showing 1 to 20 of 2,847 entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 bg-white dark:bg-zinc-900 font-semibold">1</button>
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800">2</button>
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800">3</button>
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800">Next</button>
          </div>
        </div>
      </Card>
    </div>
  );
};
