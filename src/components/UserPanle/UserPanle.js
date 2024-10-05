import React from "react";
import { FaUserAlt } from "react-icons/fa";

const UserPanle = () => {
  return (
    <>
      <div className="sticky top-0 z-10">
        <div className="flex items-center justify-between bg-[#510674] px-8 py-4">
          <div className="logo">
            <a href="#">
              <h1 className="text-white text-[30px]">MonthExpense</h1>
            </a>
          </div>
          <div className="icon me-8  text-[white] hover:text-[black] transition duration-400">
            <a href="#">
              <i className="text-[25px]">
                <FaUserAlt />
              </i>
            </a>
            <ul className="hidden">
              <li><a href="#">Sign In</a></li>
              <li><a href="#">Sign Out</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPanle;
