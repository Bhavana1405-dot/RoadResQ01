'use client';

import { useAuth } from '@/src/context/AuthContext';
import { LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function SidebarProfile() {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside of dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!auth?.user) return null;

  const handleLogout = async () => {
    try {
      await auth.signOut?.();
      setIsOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const user = auth.user;
  const displayName = user?.displayName || 'User';
  const firstLetter = user?.displayName?.[0] || user?.email?.[0] || 'U';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 flex items-center space-x-3 rounded-lg hover:bg-white/10 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white">
          {firstLetter}
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-medium truncate">{displayName}</p>
          <p className="text-xs text-gray-400 truncate">{user?.email}</p>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-full left-0 w-full mb-2 bg-gray-800 rounded-lg shadow-lg py-2">
          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-white/10 transition-colors"
          >
            <User className="w-4 h-4" />
            <span>View Profile</span>
          </Link>
          <Link
            href="/profile?tab=preferences"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-white/10 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
} 