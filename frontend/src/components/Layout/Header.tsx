import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Building2, Calendar } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth(); // This should now work

  const getDashboardLink = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'brand_owner':
        return '/brand-owner/dashboard';
      case 'staff':
        return '/staff/dashboard';
      default:
        return '/dashboard';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Spaces by Fanpit</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/spaces" className="text-gray-700 hover:text-blue-600">
              Browse Spaces
            </Link>
            {user && (
              <Link href={getDashboardLink()} className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-700">
                    {user.name} ({user.role})
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-gray-500 hover:text-red-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;