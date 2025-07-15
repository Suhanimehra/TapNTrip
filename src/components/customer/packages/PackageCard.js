import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

const PackageCard = ({ packageData, onBookNow }) => {
  const { isDarkMode } = useTheme();
  const {
    name,
    description,
    price,
    duration,
    inclusions,
    exclusions,
    images,
  } = packageData;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full ${
        isDarkMode ? 'bg-[#2d3348] text-white' : 'bg-white text-gray-900'
      }`}
    >
      {/* Images */}
      <div className="relative h-48 overflow-hidden flex items-center justify-center bg-gray-800">
        {Array.isArray(images) && images.length > 0 ? (
          <img
            src={images[0]}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 min-h-[180px] justify-between">
        <div>
          <h3 className="text-lg font-bold mb-1 line-clamp-1 text-left">{name}</h3>
          <p className={`text-sm mb-2 line-clamp-2 text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
          <div className="flex flex-col gap-1 mb-2 text-left">
          <span className="text-xs">Duration: <span className="font-medium">{duration}</span></span>
          <span className="text-xs">Price: <span className="font-bold text-blue-500">₹{price}</span></span>
          {inclusions && <span className="text-xs">Inclusions: <span className="font-medium">{inclusions}</span></span>}
          {exclusions && <span className="text-xs">Exclusions: <span className="font-medium">{exclusions}</span></span>}
        </div>
        </div>
        {/* Removed Book Now button */}
      </div>
    </motion.div>
  );
};

export default PackageCard; 