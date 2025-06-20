import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Moon, Sun } from 'lucide-react';
import { useShoppingStore } from './stores/shoppingStore';
import ShoppingList from './components/ShoppingList';
import AddItemForm from './components/AddItemForm';
import CategoryFilter from './components/CategoryFilter';
import ExportImport from './components/ExportImport';
import Summary from './components/Summary';

function App() {
  const { darkMode, toggleDarkMode } = useShoppingStore();

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}>
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between mb-16"
        >
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className={`p-4 rounded-2xl ${darkMode ? 'bg-white' : 'bg-black'
                } transition-all duration-300 shadow-lg`}
            >
              <ShoppingBag className={`h-10 w-10 ${darkMode ? 'text-black' : 'text-white'
                }`} />
            </motion.div>
            <div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight">
                Shopping
              </h1>
              <p className={`text-lg font-light ${darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                Organize your essentials
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className={`p-4 rounded-2xl transition-all duration-300 shadow-lg ${darkMode
              ? 'bg-gray-900 hover:bg-gray-800 border border-gray-800'
              : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
              }`}
          >
            <motion.div
              initial={false}
              animate={{ rotate: darkMode ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              {darkMode ? (
                <Sun className="h-6 w-6 text-yellow-400" />
              ) : (
                <Moon className="h-6 w-6 text-gray-700" />
              )}
            </motion.div>
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <AddItemForm />
            <CategoryFilter />
            <Summary />
            <ExportImport />
          </div>

          <div className="lg:col-span-3">
            <ShoppingList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
