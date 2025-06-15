import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, CheckCircle2, Clock } from 'lucide-react';
import { useShoppingStore } from '../stores/shoppingStore';

const Summary = () => {
  const { 
    items, 
    getTotalCost, 
    getPurchasedCost, 
    getRemainingCost, 
    darkMode 
  } = useShoppingStore();

  const totalItems = items.length;
  const purchasedItems = items.filter(item => item.purchased).length;
  const remainingItems = totalItems - purchasedItems;
  
  const totalCost = getTotalCost();
  const purchasedCost = getPurchasedCost();
  const remainingCost = getRemainingCost();

  const stats = [
    {
      label: 'Total',
      value: totalItems,
      icon: ShoppingCart,
    },
    {
      label: 'Done',
      value: purchasedItems,
      icon: CheckCircle2,
    },
    {
      label: 'Left',
      value: remainingItems,
      icon: Clock,
    },
    {
      label: 'Cost',
      value: `$${totalCost.toFixed(2)}`,
      icon: DollarSign,
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`${
        darkMode 
          ? 'bg-gray-950 border border-gray-800' 
          : 'bg-gray-50 border border-gray-200'
      } rounded-3xl p-8 transition-all duration-300`}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-light mb-2">Summary</h2>
        <div className={`h-px w-16 ${
          darkMode ? 'bg-white' : 'bg-black'
        }`} />
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              className={`p-4 rounded-2xl transition-all duration-300 ${
                darkMode ? 'bg-gray-900' : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon className={`h-4 w-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <span className={`text-xs font-medium ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.label}
                </span>
              </div>
              <p className="text-xl font-light">
                {stat.value}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Bar */}
      {totalCost > 0 && (
        <div>
          <div className="flex justify-between text-sm mb-3">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Progress
            </span>
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              {((purchasedCost / totalCost) * 100).toFixed(0)}%
            </span>
          </div>
          <div className={`w-full h-2 rounded-full ${
            darkMode ? 'bg-gray-800' : 'bg-gray-200'
          }`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(purchasedCost / totalCost) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`h-full rounded-full ${
                darkMode ? 'bg-white' : 'bg-black'
              }`}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Summary;