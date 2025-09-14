'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { Space, Reservation } from '@/types';
import { Plus, Calendar, IndianRupee, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const BrandOwnerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [spacesResponse, reservationsResponse] = await Promise.all([
        api.get('/spaces/owner/my-spaces'),
        api.get('/reservations'),
      ]);
      
      setSpaces(spacesResponse.data);
      setReservations(reservationsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateRevenue = () => {
    return reservations
      .filter(r => r.status === 'confirmed' || r.status === 'checked_out')
      .reduce((total, r) => total + r.totalPrice, 0);
  };

  const upcomingReservations = reservations.filter(r => 
    new Date(r.startTime) > new Date() && 
    (r.status === 'confirmed' || r.status === 'pending')
  );

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Brand Owner Dashboard</h1>
            <p className="text-gray-600">Manage your spaces and bookings</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Plus className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{spaces.length}</div>
                  <div className="text-gray-600">Spaces</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{reservations.length}</div>
                  <div className="text-gray-600">Total Bookings</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{upcomingReservations.length}</div>
                  <div className="text-gray-600">Upcoming</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <IndianRupee className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">₹{calculateRevenue()}</div>
                  <div className="text-gray-600">Revenue</div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mb-8">
            <Link
              href="/brand-owner/spaces/new"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Space
            </Link>
          </div>

          {/* Spaces List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Your Spaces</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {spaces.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="text-gray-400 mb-4">No spaces yet</div>
                  <Link
                    href="/brand-owner/spaces/new"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Create your first space
                  </Link>
                </div>
              ) : (
                spaces.map((space) => (
                  <div key={space._id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{space.name}</h3>
                        <p className="text-gray-600">{space.address}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-green-600 font-semibold flex items-center justify-end">
                          <IndianRupee className="w-4 h-4 mr-1" />
                          {space.price}/hour
                        </div>
                        <div className="text-sm text-gray-600">{space.capacity} people capacity</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Upcoming Reservations */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Reservations</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {upcomingReservations.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="text-gray-400">No upcoming reservations</div>
                </div>
              ) : (
                upcomingReservations.map((reservation) => (
                  <div key={reservation._id} className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {typeof reservation.space === 'object' ? reservation.space.name : 'Loading...'}
                      </h3>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                        {reservation.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="text-gray-600 mb-2">
                      Customer: {typeof reservation.user === 'object' ? reservation.user.name : 'Loading...'}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>
                        {new Date(reservation.startTime).toLocaleDateString()} -{' '}
                        {new Date(reservation.startTime).toLocaleTimeString()}
                      </span>
                      <span className="font-semibold text-green-600 flex items-center">
                        <IndianRupee className="w-4 h-4 mr-1" />
                        {reservation.totalPrice}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BrandOwnerDashboard;