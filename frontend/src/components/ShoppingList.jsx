import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Search, SortAsc } from 'lucide-react';
import { useShoppingStore } from '../stores/shoppingStore';
import ShoppingItem from './ShoppingItem';

const ShoppingList = () => {
  const { getFilteredItems, darkMode, filter, setFilter } = useShoppingStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  const items = getFilteredItems();
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`${
        darkMode 
          ? 'bg-gray-950 border border-gray-800' 
          : 'bg-gray-50 border border-gray-200'
      } rounded-3xl p-8 transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-light mb-2">Your List</h2>
          <div className={`h-px w-16 ${
            darkMode ? 'bg-white' : 'bg-black'
          }`} />
        </div>
        <div className={`px-4 py-2 rounded-full text-sm font-medium ${
          darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-200 text-gray-600'
        }`}>
          {filteredItems.length} items
        </div>
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all duration-300 focus:outline-none ${
              darkMode 
                ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-500 focus:border-gray-600' 
                : 'bg-white border-gray-200 text-black placeholder-gray-400 focus:border-gray-400'
            }`}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <SortAsc className={`h-5 w-5 ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`} />
          <select
            value={filter.sortBy}
            onChange={(e) => setFilter({ sortBy: e.target.value })}
            className={`px-4 py-4 rounded-2xl border transition-all duration-300 focus:outline-none ${
              darkMode 
                ? 'bg-gray-900 border-gray-800 text-white' 
                : 'bg-white border-gray-200 text-black'
            }`}
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="category">Sort by Category</option>
            <option value="date">Sort by Date</option>
          </select>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <Package className={`h-20 w-20 mx-auto mb-6 ${
                darkMode ? 'text-gray-800' : 'text-gray-300'
              }`} />
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