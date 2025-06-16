import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Check, X, DollarSign, Tag } from 'lucide-react';
import { useShoppingStore } from '../stores/shoppingStore';
import CustomDropdown from './CustomDropDown';

const ShoppingItem = ({ item, index }) => {
    const { updateItem, deleteItem, togglePurchased, darkMode, categories } = useShoppingStore();
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: item.name,
        price: item.price.toString(),
        category: item.category
    });

    const handleEdit = () => {
        if (editForm.name.trim() && editForm.price && parseFloat(editForm.price) > 0) {
            updateItem(item.id, {
                name: editForm.name.trim(),
                price: parseFloat(editForm.price),
                category: editForm.category
            });
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditForm({
            name: item.name,
            price: item.price.toString(),
            category: item.category
        });
        setIsEditing(false);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className={`p-4 sm:p-6 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md ${
                item.purchased
                    ? darkMode
                        ? 'bg-gray-900 border-gray-700 opacity-60'
                        : 'bg-gray-100 border-gray-300 opacity-60'
                    : darkMode
                        ? 'bg-gray-900 border-gray-800 hover:border-gray-700'
                        : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
        >
            {isEditing ? (
                <div className="space-y-4">
                    <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className={`w-full px-0 py-3 bg-transparent border-0 border-b transition-all duration-300 focus:outline-none ${
                            darkMode
                                ? 'border-gray-700 focus:border-white text-white placeholder-gray-500'
                                : 'border-gray-300 focus:border-black text-black placeholder-gray-400'
                        }`}
                        placeholder="Item name"
                        autoFocus
                    />

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <DollarSign className={`absolute left-0 top-3 h-4 w-4 ${
                                darkMode ? 'text-gray-500' : 'text-gray-400'
                            }`} />
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={editForm.price}
                                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                className={`w-full pl-6 pr-0 py-3 bg-transparent border-0 border-b transition-all duration-300 focus:outline-none ${
                                    darkMode
                                        ? 'border-gray-700 focus:border-white text-white'
                                        : 'border-gray-300 focus:border-black text-black'
                                }`}
                                placeholder="0.00"
                            />
                        </div>

                        <div className="flex-1">
                            <CustomDropdown
                                options={categories}
                                value={editForm.category}
                                onChange={(category) => setEditForm({ ...editForm, category })}
                                darkMode={darkMode}
                                placeholder="Select category"
                                icon={<Tag className="h-4 w-4" />}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleEdit}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                                darkMode
                                    ? 'bg-white text-black hover:bg-gray-200'
                                    : 'bg-black text-white hover:bg-gray-800'
                            }`}
                        >
                            <Check className="h-4 w-4" />
                            Save
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCancel}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                                darkMode
                                    ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                                    : 'bg-gray-100 hover:bg-gray-200 text-black border border-gray-200'
                            }`}
                        >
                            <X className="h-4 w-4" />
                            Cancel
                        </motion.button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-4 sm:gap-6">
                    {/* Checkbox */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => togglePurchased(item.id)}
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                            item.purchased
                                ? darkMode
                                    ? 'bg-white border-white'
                                    : 'bg-black border-black'
                                : darkMode
                                    ? 'border-gray-600 hover:border-white'
                                    : 'border-gray-300 hover:border-black'
                        }`}
                    >
                        {item.purchased && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500 }}
                            >
                                <Check className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                    darkMode ? 'text-black' : 'text-white'
                                }`} />
                            </motion.div>
                        )}
                    </motion.button>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <h3 className={`text-base sm:text-lg font-medium mb-1 sm:mb-2 transition-all duration-300 ${
                                    item.purchased ? 'line-through opacity-50' : ''
                                }`}>
                                    {item.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <motion.span 
                                        whileHover={{ scale: 1.05 }}
                                        className={`inline-flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                                            darkMode
                                                ? 'bg-gray-800 text-gray-400 border border-gray-700'
                                                : 'bg-gray-100 text-gray-600 border border-gray-200'
                                        }`}
                                    >
                                        <Tag className="h-3 w-3" />
                                        {item.category}
                                    </motion.span>
                                </div>
                            </div>

                            <div className="text-left sm:text-right sm:ml-6">
                                <p className={`text-lg sm:text-xl font-light transition-all duration-300 ${
                                    item.purchased ? 'line-through opacity-50' : ''
                                }`}>
                                    ${item.price.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsEditing(true)}
                            className={`p-2 sm:p-3 rounded-xl transition-all duration-300 ${
                                darkMode
                                    ? 'text-gray-500 hover:text-white hover:bg-gray-800'
                                    : 'text-gray-400 hover:text-black hover:bg-gray-100'
                            }`}
                        >
                            <Edit2 className="h-4 w-4" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteItem(item.id)}
                            className={`p-2 sm:p-3 rounded-xl transition-all duration-300 ${
                                darkMode
                                    ? 'text-gray-500 hover:text-red-400 hover:bg-gray-800'
                                    : 'text-gray-400 hover:text-red-600 hover:bg-gray-100'
                            }`}
                        >
                            <Trash2 className="h-4 w-4" />
                        </motion.button>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default ShoppingItem;