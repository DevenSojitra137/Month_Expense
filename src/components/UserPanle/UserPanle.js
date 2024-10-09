import React from "react";
import { FaUserAlt } from "react-icons/fa";
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
  return (
    <>
      <div className="sticky top-0 z-10">
        <div className="flex items-center justify-between bg-[#510674] px-8 py-2">
          <div className="logo">
            <a href="#">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 300 60" 
                className="h-14 w-auto" // Increased height from h-10 to h-14
              >
                {/* Background rectangle for "Month" */}
                <rect x="5" y="10" width="140" height="40" rx="5" fill="#ffffff"/>
                
                {/* Text elements - Made text larger */}
                <text x="20" y="40" fontFamily="Arial" fontSize="32" fill="#510674">Month</text>
                <text x="150" y="40" fontFamily="Arial" fontSize="32" fill="#ffffff" fontWeight="bold">Expense</text>
                
                {/* Dollar sign icon - Made slightly larger */}
                <circle cx="270" cy="30" r="22" fill="#ffffff" opacity="0.9"/>
                <text x="262" y="40" fontFamily="Arial" fontSize="27" fill="#510674">$</text>
              </svg>
            </a>
          </div>
          <div className="icon me-8 text-[white] hover:text-[black] transition duration-400">
            <Link to="sign-up">
              <i className="text-[28px]"> {/* Increased icon size to match */}
                <FaUserAlt />
              </i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPanel;