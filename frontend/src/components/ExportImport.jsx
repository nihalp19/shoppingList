import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Upload, FileJson, FileSpreadsheet, Trash2, Database } from 'lucide-react';
import { useShoppingStore } from '../stores/shoppingStore';

const ExportImport = () => {
  const { 
    exportData, 
    importData, 
    clearAll, 
    clearPurchased, 
    darkMode,
    items 
  } = useShoppingStore();
  const fileInputRef = useRef(null);

  const handleExportJSON = () => {
    const data = exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shopping-list-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const data = exportData();
    const csvContent = [
      'Name,Price,Category,Purchased,Created At',
      ...data.items.map(item => 
        `"${item.name}",${item.price},"${item.category}",${item.purchased},"${item.createdAt}"`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shopping-list-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (importData(data)) {

        } else {
          alert('Invalid file format. Please select a valid JSON file.');
        }
      } catch (error) {
        alert('Error reading file. Please make sure it\'s a valid JSON file.');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
    
    event.target.value = '';
  };

  const handleClearAll = () => {
    if (items.length === 0) return;
    
    if (window.confirm('Are you sure you want to clear all items? This action cannot be undone.')) {
      clearAll();
    }
  };

  const handleClearPurchased = () => {
    const purchasedItems = items.filter(item => item.purchased);
    if (purchasedItems.length === 0) return;
    
    if (window.confirm(`Are you sure you want to remove ${purchasedItems.length} purchased items?`)) {
      clearPurchased();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`${
        darkMode 
          ? 'bg-gray-950 border border-gray-800' 
          : 'bg-gray-50 border border-gray-200'
      } rounded-3xl p-8 transition-all duration-300 shadow-lg`}
    >
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Database className={`h-6 w-6 ${
            darkMode ? 'text-white' : 'text-black'
          }`} />
          <h2 className="text-2xl font-light">Data</h2>
        </div>
        <div className={`h-px w-16 ${
          darkMode ? 'bg-white' : 'bg-black'
        }`} />
      </div>

      <div className="space-y-6">
        <div>
          <h3 className={`text-sm font-medium mb-3 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Export Data
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExportJSON}
              className={`flex items-center justify-center gap-2 p-4 rounded-2xl border transition-all duration-300 shadow-sm ${
                darkMode 
                  ? 'bg-gray-900 border-gray-800 text-gray-300 hover:border-gray-700 hover:shadow-md' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <FileJson className="h-4 w-4" />
              <span className="text-sm font-medium">JSON</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExportCSV}
              className={`flex items-center justify-center gap-2 p-4 rounded-2xl border transition-all duration-300 shadow-sm ${
                darkMode 
                  ? 'bg-gray-900 border-gray-800 text-gray-300 hover:border-gray-700 hover:shadow-md' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span className="text-sm font-medium">CSV</span>
            </motion.button>
          </div>
        </div>


        <div>
          <h3 className={`text-sm font-medium mb-3 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Import Data
          </h3>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current?.click()}
            className={`w-full flex items-center justify-center gap-2 p-4 rounded-2xl border transition-all duration-300 shadow-sm ${
              darkMode 
                ? 'bg-gray-900 border-gray-800 text-gray-300 hover:border-gray-700 hover:shadow-md' 
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <Upload className="h-4 w-4" />
            <span className="font-medium">Import JSON</span>
          </motion.button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </div>

        <div className={`pt-6 border-t ${
          darkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <h3 className={`text-sm font-medium mb-3 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Clear Data
          </h3>
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClearPurchased}
              disabled={items.filter(item => item.purchased).length === 0}
              className={`w-full flex items-center justify-center gap-2 p-4 rounded-2xl transition-all duration-300 ${
                items.filter(item => item.purchased).length === 0
                  ? darkMode
                    ? 'bg-gray-900 border-gray-800 text-gray-600 cursor-not-allowed opacity-50'
                    : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                  : darkMode
                    ? 'bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200 hover:border-gray-700 shadow-sm hover:shadow-md'
                    : 'bg-white border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 shadow-sm hover:shadow-md'
              } border`}
            >
              <Trash2 className="h-4 w-4" />
              <span className="font-medium">Clear Purchased</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClearAll}
              disabled={items.length === 0}
              className={`w-full flex items-center justify-center gap-2 p-4 rounded-2xl transition-all duration-300 ${
                items.length === 0
                  ? darkMode
                    ? 'bg-gray-900 border-gray-800 text-gray-600 cursor-not-allowed opacity-50'
                    : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                  : darkMode
                    ? 'bg-gray-900 border-gray-800 text-red-400 hover:text-red-300 hover:border-red-800 shadow-sm hover:shadow-md'
                    : 'bg-white border-gray-200 text-red-500 hover:text-red-600 hover:border-red-300 shadow-sm hover:shadow-md'
              } border`}
            >
              <Trash2 className="h-4 w-4" />
              <span className="font-medium">Clear All</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExportImport;