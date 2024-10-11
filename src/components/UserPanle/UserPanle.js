import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearTokens, isAuthenticated } from "../../auth.js";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon: Icon, text }) => (
  <li className="flex items-center space-x-3 mb-4 p-3 rounded-lg hover:bg-purple-50 transition-all duration-300">
    <div className="bg-purple-100 p-2 rounded-full">
      <Icon className="text-purple-700" size={20} />
    </div>
    <span className="text-gray-700">{text}</span>
  </li>
);

const UserPanel = () => {
  const navigate = useNavigate();
  const [showLoginIcon, setShowLoginIcon] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setShowLoginIcon(!userId);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/v1/user/logout');
      console.log(response);
      localStorage.clear();
      clearTokens();
      navigate('/');
      setShowLoginIcon(true);
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please check your credentials and try again.');
    }
  }

  return (
    <>
      <div className="sticky top-0 z-10">
        <div className="flex items-center justify-between bg-[#510674] px-8 py-2">
          <div className="logo">
            <Link to={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 340 60"
                className="h-14 w-auto"
              >
                <rect x="5" y="10" width="140" height="40" rx="5" fill="#ffffff" />
                <text x="20" y="40" fontFamily="Arial" fontSize="32" fill="#510674">Month</text>
                <text x="150" y="40" fontFamily="Arial" fontSize="32" fill="#ffffff" fontWeight="bold">Expense</text>
                <circle cx="305" cy="30" r="22" fill="#ffffff" opacity="0.9" />
                <text x="297" y="40" fontFamily="Arial" fontSize="27" fill="#510674">$</text>
              </svg>
            </Link>
          </div>
          <div className="icon me-8 text-[white] transition duration-400 flex gap-4 items-center">
            {showLoginIcon && (
              <Link to="sign-up">
                <i className="text-[28px] hover:text-[black]">
                  <FaUserAlt />
                </i>
              </Link>
            )}
            {isAuthenticated() && (
              <i className="text-[28px] hover:text-[black] cursor-pointer">
                <IoIosLogOut size={40} onClick={handleLogout} />
              </i>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPanel;