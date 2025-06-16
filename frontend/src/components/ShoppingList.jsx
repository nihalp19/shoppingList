import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Search, SortAsc, List } from 'lucide-react';
import { useShoppingStore } from '../stores/shoppingStore';
import ShoppingItem from './ShoppingItem';
import CustomDropdown from './CustomDropDown';

const ShoppingList = () => {
  const { getFilteredItems, darkMode, filter, setFilter } = useShoppingStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  const items = getFilteredItems();
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortOptions = [
    { value: 'name', label: 'Sort by Name' },
    { value: 'price', label: 'Sort by Price' },
    { value: 'category', label: 'Sort by Category' },
    { value: 'date', label: 'Sort by Date' }
  ];

  const currentSortLabel = sortOptions.find(option => option.value === filter.sortBy)?.label || 'Sort by Name';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`${
        darkMode 
          ? 'bg-gray-950 border border-gray-800' 
          : 'bg-gray-50 border border-gray-200'
      } rounded-3xl p-8 transition-all duration-300 shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <List className={`h-6 w-6 ${
              darkMode ? 'text-white' : 'text-black'
            }`} />
            <h2 className="text-2xl font-light">Your List</h2>
          </div>
          <div className={`h-px w-16 ${
            darkMode ? 'bg-white' : 'bg-black'
          }`} />
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            darkMode ? 'bg-gray-900 text-gray-300 border border-gray-800' : 'bg-gray-200 text-gray-600 border border-gray-200'
          }`}
        >
          {filteredItems.length} items
        </motion.div>
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all duration-300 focus:outline-none shadow-sm focus:shadow-md ${
              darkMode 
                ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-500 focus:border-gray-600' 
                : 'bg-white border-gray-200 text-black placeholder-gray-400 focus:border-gray-400'
            }`}
          />
        </div>
        
        <div className="flex items-center gap-3 min-w-0 lg:min-w-[200px]">
          <SortAsc className={`h-5 w-5 flex-shrink-0 ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`} />
          <div className="flex-1">
            <CustomDropdown
              options={sortOptions.map(option => option.label)}
              value={currentSortLabel}
              onChange={(label) => {
                const option = sortOptions.find(opt => opt.label === label);
                if (option) {
                  setFilter({ sortBy: option.value });
                }
              }}
              darkMode={darkMode}
              placeholder="Sort by..."
              icon={<SortAsc className="h-4 w-4" />}
            />
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Package className={`h-20 w-20 mx-auto mb-6 ${
                  darkMode ? 'text-gray-800' : 'text-gray-300'
                }`} />
              </motion.div>
              <p className={`text-xl font-light mb-2 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {searchTerm ? 'No items match your search' : 'Your list is empty'}
              </p>
              <p className={`text-sm ${
                darkMode ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {searchTerm ? 'Try a different search term' : 'Add some items to get started'}
              </p>
            </motion.div>
          ) : (
            filteredItems.map((item, index) => (
              <ShoppingItem
                key={item.id}
                item={item}
                index={index}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ShoppingList;