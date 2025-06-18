import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
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
      color: darkMode ? 'text-blue-400' : 'text-blue-600'
    },
    {
      label: 'Done',
      value: purchasedItems,
      icon: CheckCircle2,
      color: darkMode ? 'text-green-400' : 'text-green-600'
    },
    {
      label: 'Left',
      value: remainingItems,
      icon: Clock,
      color: darkMode ? 'text-orange-400' : 'text-orange-600'
    },
    {
      label: 'Cost',
      value: `$${totalCost.toFixed(2)}`,
      icon: DollarSign,
      color: darkMode ? 'text-purple-400' : 'text-purple-600'
    }
  ];

  const progressPercentage = totalCost > 0 ? (purchasedCost / totalCost) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`${
        darkMode 
          ? 'bg-gray-950 border border-gray-800' 
          : 'bg-gray-50 border border-gray-200'
      } rounded-3xl p-8 transition-all duration-300 shadow-lg`}
    >
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className={`h-6 w-6 ${
            darkMode ? 'text-white' : 'text-black'
          }`} />
          <h2 className="text-2xl font-light">Summary</h2>
        </div>
        <div className={`h-px w-16 ${
          darkMode ? 'bg-white' : 'bg-black'
        }`} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`p-4 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md ${
                darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon className={`h-4 w-4 ${stat.color}`} />
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

      {totalCost > 0 && (
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Spent: ${purchasedCost.toFixed(2)}
            </span>
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Remaining: ${remainingCost.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {totalCost > 0 && (
        <div>
          <div className="flex justify-between text-sm mb-3">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Progress
            </span>
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              {progressPercentage.toFixed(0)}%
            </span>
          </div>
          <div className={`w-full h-3 rounded-full overflow-hidden ${
            darkMode ? 'bg-gray-800' : 'bg-gray-200'
          }`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              className={`h-full rounded-full bg-gradient-to-r ${
                darkMode 
                  ? 'from-blue-500 to-purple-500' 
                  : 'from-blue-600 to-purple-600'
              }`}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Summary;