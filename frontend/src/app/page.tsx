import React from 'react';
import Link from 'next/link';
import { Search, Calendar, MapPin, Users, Shield, Building2, Clock, Wifi, Coffee, Monitor } from 'lucide-react';
import Layout from '@/components/Layout/Layout';
import SpaceList from '@/components/SpaceList';
import { Space } from '@/types';

// Mock data for featured spaces (replace with actual API call)
const featuredSpaces: Space[] = [
  {
    _id: '1',
    name: 'Creative Co-Working Hub',
    description: 'A modern co-working space with high-speed internet, meeting rooms, and free coffee. Perfect for freelancers and remote workers.',
    address: '123 Business District, Downtown',
    capacity: 50,
    amenities: ['Wi-Fi', 'Meeting Rooms', 'Coffee', 'Printing', 'Projector'],
    images: ['/api/placeholder/400/300'],
    pricingModel: 'hourly',
    price: 250,
    owner: 'owner1',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01'
  },
  {
    _id: '2',
    name: 'Event Hall Grande',
    description: 'Spacious event hall suitable for conferences, weddings, and corporate events. Includes full AV setup and catering services.',
    address: '456 Event Street, City Center',
    capacity: 200,
    amenities: ['Stage', 'Sound System', 'Lighting', 'Catering', 'Parking'],
    images: ['/api/placeholder/400/300'],
    pricingModel: 'hourly',
    price: 5000,
    owner: 'owner2',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01'
  },
  {
    _id: '3',
    name: 'Quiet Study Lounge',
    description: 'Peaceful environment for students and professionals to focus and study. Individual cubicles and group study rooms available.',
    address: '789 Academic Avenue, University Area',
    capacity: 30,
    amenities: ['Quiet Zones', 'Study Rooms', 'Printing', 'Snacks', 'Charging Stations'],
    images: ['/api/placeholder/400/300'],
    pricingModel: 'hourly',
    price: 150,
    owner: 'owner3',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01'
  }
];

// Mock data for popular amenities
const popularAmenities = [
  { name: 'Wi-Fi', icon: Wifi, count: '120+' },
  { name: 'Coffee', icon: Coffee, count: '95+' },
  { name: 'Meeting Rooms', icon: Building2, count: '80+' },
  { name: 'Monitors', icon: Monitor, count: '65+' },
  { name: '24/7 Access', icon: Clock, count: '50+' },
  { name: 'Parking', icon: MapPin, count: '45+' }
];

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Amazing Spaces
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Book event spaces, co-working areas, and casual third spaces where you can work, meet, or simply relax.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/spaces"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Spaces
              </Link>
              <Link
                href="/register?role=brand_owner"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                List Your Space
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="bg-white py-8 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-6 shadow-inner">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Where do you need space?"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="datetime-local"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <button className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spaces Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Spaces
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and highly-rated spaces
            </p>
          </div>
          
          <SpaceList spaces={featuredSpaces} />
          
          <div className="text-center mt-12">
            <Link
              href="/spaces"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              View All Spaces
              <MapPin className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Spaces by Fanpit?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make finding and booking spaces simple and hassle-free
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Discover</h3>
              <p className="text-gray-600">
                Browse through our curated collection of spaces tailored to your needs. Filter by location, amenities, and pricing.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Book</h3>
              <p className="text-gray-600">
                Reserve your preferred time slot with our secure booking system. Instant confirmation and easy payment processing.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Enjoy</h3>
              <p className="text-gray-600">
                Arrive at the space and enjoy your productive time or event. Easy check-in process and dedicated support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Amenities Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Amenities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find spaces with the amenities that matter most to you
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularAmenities.map((amenity, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 group-hover:border-blue-300 group-hover:shadow-md transition-all">
                  <amenity.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1">{amenity.name}</h3>
                  <p className="text-sm text-gray-600">{amenity.count} spaces</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">Spaces Available</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-gray-600">Secure Payments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don&apos;t just take our word for it - hear from our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Sarah Chen</h4>
                  <p className="text-sm text-gray-600">Freelance Designer</p>
                </div>
              </div>
              <p className="text-gray-700">
                &quot;Found the perfect co-working space for my team. The booking process was smooth and the space exceeded our expectations!&quot;
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Michael Rodriguez</h4>
                  <p className="text-sm text-gray-600">Startup Founder</p>
                </div>
              </div>
              <p className="text-gray-700">
                &quot;As a brand owner, listing my space was incredibly easy. The platform handles payments and bookings seamlessly.&quot;
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Emily Watson</h4>
                  <p className="text-sm text-gray-600">Event Planner</p>
                </div>
              </div>
              <p className="text-gray-700">
                &quot;The variety of spaces available is impressive. I&apos;ve booked everything from small meeting rooms to large event halls.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Space?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who have discovered amazing spaces for work, events, and relaxation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </Link>
            <Link
              href="/spaces"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Browse Spaces
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}