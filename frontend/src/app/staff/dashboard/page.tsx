'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { Reservation } from '@/types';
import { Calendar, CheckCircle, XCircle, User, MapPin } from 'lucide-react';

const StaffDashboard: React.FC = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchReservations();
  }, [selectedDate]);

  const fetchReservations = async () => {
    try {
      const response = await api.get('/reservations');
      // Filter reservations for the selected date
      const filtered = response.data.filter((reservation: Reservation) => {
        const reservationDate = new Date(reservation.startTime).toISOString().split('T')[0];
        return reservationDate === selectedDate;
      });
      setReservations(filtered);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateReservationStatus = async (reservationId: string, status: string) => {
    try {
      await api.patch(`/reservations/${reservationId}/status`, { status });
      fetchReservations(); // Refresh the list
    } catch (error) {
      console.error('Error updating reservation status:', error);
    }
  };

  const todaysReservations = reservations.filter(reservation => {
    const reservationDate = new Date(reservation.startTime).toISOString().split('T')[0];
    return reservationDate === selectedDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'checked_in':
        return 'bg-green-100 text-green-800';
      case 'checked_out':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no_show':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

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
            <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
            <p className="text-gray-600">Manage check-ins and reservations</p>
          </div>

          {/* Date Selector */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Reservations List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Reservations for {new Date(selectedDate).toLocaleDateString()}
              </h2>
              <p className="text-gray-600">{todaysReservations.length} reservations</p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {todaysReservations.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reservations</h3>
                  <p className="text-gray-600">No reservations scheduled for this date.</p>
                </div>
              ) : (
                todaysReservations.map((reservation) => (
                  <div key={reservation._id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {typeof reservation.space === 'object' ? reservation.space.name : 'Loading...'}
                        </h3>
                        <p className="text-gray-600 flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {typeof reservation.space === 'object' ? reservation.space.address : 'Loading...'}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                        {reservation.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex items-center text-gray-600 mb-2">
                          <User className="w-4 h-4 mr-2" />
                          <span>{typeof reservation.user === 'object' ? reservation.user.name : 'Loading...'}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {reservation.user && typeof reservation.user === 'object' && reservation.user.email}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-gray-600">
                          {new Date(reservation.startTime).toLocaleTimeString()} -{' '}
                          {new Date(reservation.endTime).toLocaleTimeString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(reservation.startTime).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {reservation.status === 'confirmed' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateReservationStatus(reservation._id, 'checked_in')}
                          className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors flex items-center"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Check In
                        </button>
                        <button
                          onClick={() => updateReservationStatus(reservation._id, 'no_show')}
                          className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700 transition-colors flex items-center"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          No Show
                        </button>
                      </div>
                    )}

                    {reservation.status === 'checked_in' && (
                      <button
                        onClick={() => updateReservationStatus(reservation._id, 'checked_out')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Check Out
                      </button>
                    )}
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

export default StaffDashboard;