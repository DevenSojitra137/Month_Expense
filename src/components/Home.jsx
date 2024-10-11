import React from 'react';
import UserPanle from './UserPanle/UserPanle';
import { ArrowRightCircle, ChartBar, Calendar, DollarSign, BellRing } from 'lucide-react';
import { Outlet } from 'react-router-dom';


function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <UserPanle/>
      <Outlet />
    </div>
  );
}

export default Home;