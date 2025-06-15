import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Eye, EyeOff } from 'lucide-react';
import { useShoppingStore } from '../stores/shoppingStore';

const CategoryFilter = () => {
  const { categories, filter, setFilter, darkMode } = useShoppingStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`${
        darkMode 
          ? 'bg-gray-950 border border-gray-800' 
          : 'bg-gray-50 border border-gray-200'
      } rounded-3xl p-8 transition-all duration-300`}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-light mb-2">Filters</h2>
        <div className={`h-px w-16 ${
          darkMode ? 'bg-white' : 'bg-black'
        }`} />
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <label className={`block text-sm font-medium mb-3 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Category
          </label>
          <select
            value={filter.category}
            onChange={(e) => setFilter({ category: e.target.value })}
            className={`w-full px-0 py-4 bg-transparent border-0 border-b-2 transition-all duration-300 focus:outline-none ${
              darkMode 
                ? 'border-gray-800 focus:border-white text-white' 
                : 'border-gray-200 focus:border-black text-black'
            }`}
          >
            <option value="all" className={darkMode ? 'bg-black' : 'bg-white'}>
              All Categories
            </option>
            {categories.map(cat => (
              <option key={cat} value={cat} className={darkMode ? 'bg-black' : 'bg-white'}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Show Purchased Toggle */}
        <div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilter({ showPurchased: !filter.showPurchased })}
            className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all duration-300 ${
              filter.showPurchased
                ? darkMode
                  ? 'bg-gray-900 border-gray-700'
                  : 'bg-gray-100 border-gray-300'
                : darkMode
                  ? 'bg-gray-900 border-gray-800'
                  : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center gap-4">
              {filter.showPurchased ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
              <span className="font-medium">
                {filter.showPurchased ? 'Show purchased' : 'Hide purchased'}
              </span>
            </div>
            
            <div className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
              filter.showPurchased 
                ? darkMode ? 'bg-white' : 'bg-black'
                : darkMode ? 'bg-gray-700' : 'bg-gray-300'
            }`}>
              <motion.div 
                animate={{ x: filter.showPurchased ? 24 : 2 }}
                transition={{ duration: 0.2 }}
                className={`w-5 h-5 rounded-full absolute top-0.5 transition-colors duration-300 ${
                  filter.showPurchased 
                    ? darkMode ? 'bg-black' : 'bg-white'
                    : darkMode ? 'bg-gray-500' : 'bg-white'
                }`} 
              />
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryFilter;