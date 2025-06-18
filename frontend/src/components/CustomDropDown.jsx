import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Tag } from 'lucide-react';

const CustomDropdown = ({
  options,
  value,
  onChange,
  darkMode,
  placeholder = "Select an option",
  icon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex(prev =>
            prev < options.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex(prev =>
            prev > 0 ? prev - 1 : options.length - 1
          );
          break;
        case 'Enter':
          event.preventDefault();
          if (highlightedIndex >= 0) {
            onChange(options[highlightedIndex]);
            setIsOpen(false);
            setHighlightedIndex(-1);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, highlightedIndex, options, onChange]);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  return (
    <div ref={dropdownRef} className="relative">

      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`w-full flex items-center justify-between pl-8 pr-4 py-4 bg-transparent border-0 border-b-2 transition-all duration-300 focus:outline-none ${
          isOpen
            ? darkMode 
              ? 'border-white' 
              : 'border-black'
            : darkMode 
              ? 'border-gray-800 hover:border-gray-600' 
              : 'border-gray-200 hover:border-gray-400'
        }`}
      >
        {icon && (
          <div className={`absolute left-0 top-4 ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>
            {icon}
          </div>
        )}
        
        <span className={`text-left flex-1 ${
          value 
            ? darkMode ? 'text-white' : 'text-black'
            : darkMode ? 'text-gray-500' : 'text-gray-400'
        }`}>
          {value || placeholder}
        </span>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={darkMode ? 'text-gray-400' : 'text-gray-600'}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute top-full left-0 right-0 mt-2 py-2 rounded-2xl shadow-2xl backdrop-blur-sm border z-50 ${
              darkMode 
                ? 'bg-gray-900/95 border-gray-700' 
                : 'bg-white/95 border-gray-200'
            }`}
          >
            <div className="max-h-60 overflow-y-auto">
              {options.map((option, index) => (
                <motion.button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  whileHover={{ x: 4 }}
                  className={`w-full px-4 py-3 text-left flex items-center justify-between transition-all duration-200 ${
                    highlightedIndex === index
                      ? darkMode 
                        ? 'bg-gray-800 text-white' 
                        : 'bg-gray-100 text-black'
                      : darkMode 
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                  
                  <AnimatePresence>
                    {value === option && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.2 }}
                        className={darkMode ? 'text-white' : 'text-black'}
                      >
                        <Check className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
            
            <div className={`absolute bottom-0 left-0 right-0 h-4 pointer-events-none bg-gradient-to-t ${
              darkMode 
                ? 'from-gray-900/95 to-transparent' 
                : 'from-white/95 to-transparent'
            } rounded-b-2xl`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDropdown;
