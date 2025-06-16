import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Eye, EyeOff } from 'lucide-react';
import { useShoppingStore } from '../stores/shoppingStore';
import CustomDropdown from './CustomDropDown';

const CategoryFilter = () => {
  const { categories, filter, setFilter, darkMode } = useShoppingStore();

  const categoryOptions = ['all', ...categories];
  const categoryLabels = {
    all: 'All Categories',
    ...Object.fromEntries(categories.map(cat => [cat, cat]))
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`${
        darkMode 
          ? 'bg-gray-950 border border-gray-800' 
          : 'bg-gray-50 border border-gray-200'
      } rounded-3xl p-8 transition-all duration-300 shadow-lg`}
    >
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Filter className={`h-6 w-6 ${
            darkMode ? 'text-white' : 'text-black'
          }`} />
          <h2 className="text-2xl font-light">Filters</h2>
        </div>
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
          <CustomDropdown
            options={categoryOptions.map(cat => categoryLabels[cat] || cat)}
            value={categoryLabels[filter.category] || filter.category}
            onChange={(value) => {
              const categoryKey = Object.keys(categoryLabels).find(
                key => categoryLabels[key] === value
              ) || value;
              setFilter({ category: categoryKey });
            }}
            darkMode={darkMode}
            placeholder="Select category"
            icon={<Filter className="h-5 w-5" />}
          />
        </div>

        {/* Show Purchased Toggle */}
        <div>
          <label className={`block text-sm font-medium mb-3 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Visibility
          </label>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilter({ showPurchased: !filter.showPurchased })}
            className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all duration-300 ${
              filter.showPurchased
                ? darkMode
                  ? 'bg-gray-900 border-gray-700 shadow-inner'
                  : 'bg-gray-100 border-gray-300 shadow-inner'
                : darkMode
                  ? 'bg-gray-900 border-gray-800 hover:border-gray-700'
                  : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: filter.showPurchased ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {filter.showPurchased ? (
                  <Eye className="h-5 w-5" />
                ) : (
                  <EyeOff className="h-5 w-5" />
                )}
              </motion.div>
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
                transition={{ duration: 0.2, type: "spring", stiffness: 500 }}
                className={`w-5 h-5 rounded-full absolute top-0.5 transition-colors duration-300 shadow-sm ${
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