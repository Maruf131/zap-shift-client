
import React from "react";
import { FaRegUser } from "react-icons/fa";

const CustomerReviewCard = ({ item, active }) => {
  return (
    <div
      className={`${
        active ? "opacity-100 scale-100" : "opacity-40 scale-95"
      } transition-all duration-300 bg-white shadow-md rounded-3xl p-8 w-full max-w-lg mx-auto`}
    >
      {/* Icon */}
      <img src={item.icon} alt="" />

      {/* Description */}
      <p className="text-gray-600 text-start mb-6">{item.description}</p>

      {/* Dotted Line */}
      <div className="border-t border-dotted border-gray-400 my-4"></div>

      {/* Profile Row */}
      <div className="flex items-center gap-4 mt-4">
        <div className="bg-primary p-4 rounded-full"><FaRegUser /></div>

        <div className="flex flex-col items-start">
          <h4 className="font-semibold text-gray-900">{item.name}</h4>
          <p className="text-gray-500 text-sm">{item.title}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviewCard;
