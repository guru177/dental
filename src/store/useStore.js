import { create } from 'zustand';

// Create a global store for application state that needs to be accessed across multiple routes/modules
const useStore = create((set) => ({
  // Global App Config
  theme: 'light',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  
  // Example: Shared Patient Data cache to avoid redundant API calls
  patientsCache: [],
  setPatientsCache: (patients) => set({ patientsCache: patients }),
  
  // Example: System Notifications
  notifications: [],
  addNotification: (notification) => set((state) => ({ 
    notifications: [...state.notifications, { id: Date.now(), ...notification }] 
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
}));

export default useStore;
