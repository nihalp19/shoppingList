import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, DollarSign, Tag } from 'lucide-react';
import { useShoppingStore } from '../stores/shoppingStore';

const AddItemForm = () => {
  const { addItem, categories, addCategory, darkMode } = useShoppingStore();
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: 'Groceries'
  });
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = 'Item name is required';
    }
    
    if (!form.price || parseFloat(form.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      addItem({
        name: form.name.trim(),
        price: parseFloat(form.price),
        category: form.category
      });
      
      setForm({ name: '', price: '', category: form.category });
      setErrors({});
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      addCategory(newCategory.trim());
      setForm({ ...form, category: newCategory.trim() });
      setNewCategory('');
      setShowNewCategory(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${
        darkMode 
          ? 'bg-gray-950 border border-gray-800' 
          : 'bg-gray-50 border border-gray-200'
      } rounded-3xl p-8 transition-all duration-300`}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-light mb-2">Add Item</h2>
        <div className={`h-px w-16 ${
          darkMode ? 'bg-white' : 'bg-black'
        }`} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Item Name */}
        <div>
          <label className={`block text-sm font-medium mb-3 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Item Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`w-full px-0 py-4 bg-transparent border-0 border-b-2 transition-all duration-300 focus:outline-none ${
              errors.name
                ? 'border-red-500'
                : darkMode 
                  ? 'border-gray-800 focus:border-white text-white placeholder-gray-500' 
                  : 'border-gray-200 focus:border-black text-black placeholder-gray-400'
            }`}
            placeholder="Enter item name"
          />
          {errors.name && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-2"
            >
              {errors.name}
            </motion.p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className={`block text-sm font-medium mb-3 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Price
          </label>
          <div className="relative">
            <DollarSign className={`absolute left-0 top-4 h-5 w-5 ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className={`w-full pl-8 pr-0 py-4 bg-transparent border-0 border-b-2 transition-all duration-300 focus:outline-none ${
                errors.price
                  ? 'border-red-500'
                  : darkMode 
                    ? 'border-gray-800 focus:border-white text-white placeholder-gray-500' 
                    : 'border-gray-200 focus:border-black text-black placeholder-gray-400'
              }`}
              placeholder="0.00"
            />
          </div>
          {errors.price && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-2"
            >
              {errors.price}
            </motion.p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className={`block text-sm font-medium mb-3 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Category
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Tag className={`absolute left-0 top-4 h-5 w-5 ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`} />
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={`w-full pl-8 pr-0 py-4 bg-transparent border-0 border-b-2 transition-all duration-300 focus:outline-none ${
                  darkMode 
                    ? 'border-gray-800 focus:border-white text-white' 
                    : 'border-gray-200 focus:border-black text-black'
                }`}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className={darkMode ? 'bg-black' : 'bg-white'}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNewCategory(!showNewCategory)}
              className={`p-4 rounded-2xl transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-900 hover:bg-gray-800 border border-gray-800' 
                  : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              <Plus className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Add New Category */}
          {showNewCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 flex gap-3"
            >
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category name"
                className={`flex-1 px-0 py-3 bg-transparent border-0 border-b transition-all duration-300 focus:outline-none ${
                  darkMode 
                    ? 'border-gray-800 focus:border-white text-white placeholder-gray-500' 
                    : 'border-gray-300 focus:border-black text-black placeholder-gray-400'
                }`}
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddCategory}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  darkMode 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                Add
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-4 rounded-2xl font-medium transition-all duration-300 ${
            darkMode 
              ? 'bg-white text-black hover:bg-gray-200' 
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          Add to List
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddItemForm;