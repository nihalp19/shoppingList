import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useShoppingStore = create(
    persist(
        (set, get) => ({
            // State
            items: [],
            categories: ['Groceries', 'Electronics', 'Clothing', 'Health', 'Home', 'Other'],
            darkMode: true,
            filter: {
                category: 'all',
                showPurchased: true,
                sortBy: 'name' 
            },

           
            addItem: (item) => {
                const newItem = {
                    id: Date.now().toString(),
                    ...item,
                    purchased: false,
                    createdAt: new Date().toISOString()
                };
                set((state) => ({
                    items: [...state.items, newItem]
                }));
            },

            updateItem: (id, updates) => {
                set((state) => ({
                    items: state.items.map(item =>
                        item.id === id ? { ...item, ...updates } : item
                    )
                }));
            },

            deleteItem: (id) => {
                set((state) => ({
                    items: state.items.filter(item => item.id !== id)
                }));
            },

            togglePurchased: (id) => {
                set((state) => ({
                    items: state.items.map(item =>
                        item.id === id ? { ...item, purchased: !item.purchased } : item
                    )
                }));
            },

            clearPurchased: () => {
                set((state) => ({
                    items: state.items.filter(item => !item.purchased)
                }));
            },

            clearAll: () => {
                set({ items: [] });
            },

            setFilter: (filter) => {
                set((state) => ({
                    filter: { ...state.filter, ...filter }
                }));
            },

            toggleDarkMode: () => {
                set((state) => ({ darkMode: !state.darkMode }));
            },

            addCategory: (category) => {
                set((state) => ({
                    categories: [...state.categories, category]
                }));
            },

            exportData: () => {
                const { items, categories } = get();
                return {
                    items,
                    categories,
                    exportDate: new Date().toISOString()
                };
            },

            importData: (data) => {
                if (data.items && Array.isArray(data.items)) {
                    set({
                        items: data.items,
                        categories: data.categories || get().categories
                    });
                    return true;
                }
                return false;
            },

            getFilteredItems: () => {
                const { items, filter } = get();
                let filtered = [...items];

                if (filter.category !== 'all') {
                    filtered = filtered.filter(item => item.category === filter.category);
                }

                if (!filter.showPurchased) {
                    filtered = filtered.filter(item => !item.purchased);
                }

                filtered.sort((a, b) => {
                    switch (filter.sortBy) {
                        case 'price':
                            return b.price - a.price;
                        case 'category':
                            return a.category.localeCompare(b.category);
                        case 'date':
                            return new Date(b.createdAt) - new Date(a.createdAt);
                        default:
                            return a.name.localeCompare(b.name);
                    }
                });

                return filtered;
            },

            getTotalCost: () => {
                const { items } = get();
                return items.reduce((total, item) => total + item.price, 0);
            },

            getPurchasedCost: () => {
                const { items } = get();
                return items
                    .filter(item => item.purchased)
                    .reduce((total, item) => total + item.price, 0);
            },

            getRemainingCost: () => {
                const { items } = get();
                return items
                    .filter(item => !item.purchased)
                    .reduce((total, item) => total + item.price, 0);
            }
        }),
        {
            name: 'shopping-list-storage',
            partialize: (state) => ({
                items: state.items,
                categories: state.categories,
                darkMode: state.darkMode,
                filter: state.filter
            })
        }
    )
);

export { useShoppingStore };