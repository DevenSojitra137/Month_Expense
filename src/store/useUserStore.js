// useUserStore.js
import { create } from 'zustand';

// Helper function to get the initial state from localStorage
const getInitialUserId = () => {
  return localStorage.getItem('userId') || "";
};

const useUserStore = create((set) => ({
  userId: getInitialUserId(),
  
  // Function to update the userId and save it in localStorage
  setUserId: (newUserId) => {
    set({ userId: newUserId });
    localStorage.setItem('userId', newUserId); // Save to localStorage
  },
}));

export default useUserStore;