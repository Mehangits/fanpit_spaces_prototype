import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Space } from '@/types';
import { MapPin, Users, Clock, IndianRupee } from 'lucide-react';

interface SpaceListProps {
  spaces: Space[];
}

const SpaceList: React.FC<SpaceListProps> = ({ spaces }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {spaces.map((space) => (
        <div key={space._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          {space.images && space.images.length > 0 && (
            <div className="relative h-48 w-full">
              <Image
                src={space.images[0]}
                alt={space.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {space.name}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {space.description}
            </p>
            
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="truncate">{space.address}</span>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-1" />
                <span>Capacity: {space.capacity}</span>
              </div>
              <div className="flex items-center text-sm font-semibold text-green-600">
                <IndianRupee className="w-4 h-4 mr-1" />
                <span>{formatPrice(space.price)}/hour</span>
              </div>
            </div>

            {space.amenities && space.amenities.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {space.amenities.slice(0, 3).map((amenity: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                  {space.amenities.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{space.amenities.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            <Link
              href={`/spaces/${space._id}`}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors block text-center"
            >
              View Details & Book
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpaceList;