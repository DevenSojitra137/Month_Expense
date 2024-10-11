
import { create } from 'zustand';


const getInitialUserId = () => {
  return localStorage.getItem('userId') || "";
};

const useUserStore = create((set) => ({
  userId: getInitialUserId(),
  
 
  setUserId: (newUserId) => {
    set({ userId: newUserId });
    localStorage.setItem('userId', newUserId); 
  },
}));

export default useUserStore;