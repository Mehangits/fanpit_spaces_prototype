'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout/Layout';
import { Space } from '@/types';
import { api } from '@/lib/api';
import { MapPin, Users, Clock, IndianRupee, Star, Calendar } from 'lucide-react';
import Image from 'next/image';
import BookingModal from '@/components/BookingModal';

const SpaceDetailPage: React.FC = () => {
  const params = useParams();
  const spaceId = params.id as string;
  
  const [space, setSpace] = useState<Space | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    fetchSpace();
  }, [spaceId]);

  const fetchSpace = async () => {
    try {
      const response = await api.get(`/spaces/${spaceId}`);
      setSpace(response.data);
    } catch (error) {
      console.error('Error fetching space:', error);
    } finally {
      setLoading(false);
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

  if (!space) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Space not found</h1>
            <p className="text-gray-600">The space you&apos;re looking for doesn&apos;t exist.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Image Gallery */}
        <div className="relative h-96 bg-gray-200">
          {space.images && space.images.length > 0 ? (
            <>
              <Image
                src={space.images[selectedImage]}
                alt={space.name}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 flex space-x-2 overflow-x-auto">
                {space.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 flex-shrink-0 ${
                      selectedImage === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${space.name} ${index + 1}`}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-gray-400">No image available</div>
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{space.name}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-1" />
                  <span>{space.address}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-1" />
                  <span>Capacity: {space.capacity} people</span>
                </div>
                <div className="flex items-center text-green-600 font-semibold">
                  <IndianRupee className="h-5 w-5 mr-1" />
                  <span>{formatPrice(space.price)}/hour</span>
                </div>
              </div>

              <div className="prose prose-lg text-gray-700 mb-8">
                <p>{space.description}</p>
              </div>

              {/* Amenities */}
              {space.amenities && space.amenities.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {space.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700">Hourly Rate</span>
                    <span className="text-lg font-semibold text-green-600">
                      {formatPrice(space.price)}/hour
                    </span>
                  </div>
                  {space.peakMultiplier && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Peak Hours Multiplier</span>
                      <span className="text-gray-600">{space.peakMultiplier}x</span>
                    </div>
                  )}
                  {space.offPeakMultiplier && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Off-Peak Multiplier</span>
                      <span className="text-gray-600">{space.offPeakMultiplier}x</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {formatPrice(space.price)}
                  </div>
                  <div className="text-gray-600">per hour</div>
                </div>

                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Now
                </button>

                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Capacity</span>
                    <span>{space.capacity} people</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Minimum booking</span>
                    <span>1 hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cancelation</span>
                    <span>24 hours free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        {showBookingModal && (
          <BookingModal
            space={space}
            onClose={() => setShowBookingModal(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default SpaceDetailPage;