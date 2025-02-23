import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Search, User, SquareLibrary, BookType, Info } from "lucide-react";

const categories = [
  { category_id: "67bb277d483ab08559a89753", name: "Fiction" },
  { category_id: "67bb277d483ab08559a89754", name: "Non-Fiction" },
  { category_id: "67bb277d483ab08559a89755", name: "Graphic Novels & Comics" },
  { category_id: "67bb277d483ab08559a89756", name: "Fantasy" },
  { category_id: "67bb277d483ab08559a89757", name: "Romance" },
  { category_id: "67bb277d483ab08559a89758", name: "Business & Economics" },
  { category_id: "67bb277d483ab08559a89759", name: "Science Fiction" },
  { category_id: "67bb36a914a1c18db1a6ba76", name: "Mystery" }
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-[#F4FCF9] p-2 shadow-md">
      <div className="flex ml-32">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-black font-medium text-xl flex items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-black font-bold" : "text-gray-700 hover:text-black"
              }
            >
              <img src="/pic/gogo.png" alt="BookTree" className="h-16" />
              <h1 className="font-medium logo text-lg">BookTree</h1>
            </NavLink>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6 relative">
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-gray-500 hover:text-black flex items-center text-2xl font-semibold transition-all duration-500"
              >
                <BookType size={26} className="inline-block mr-1" /> หมวดหมู่
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-auto bg-white rounded-md shadow-lg z-10 py-2 border border-gray-200">
                  <ul className="flex space-x-4 text-gray-700 px-4">
                    {categories.map(category => (
                      <li
                        key={category.category_id}
                        className="menu py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {category.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <NavLink
            to="/readings"
            className={({ isActive }) =>
              isActive ? "text-black text-2xl font-semibold" : "text-gray-500 hover:text-black text-2xl font-semibold transition-all duration-500"
            }
          >
            <SquareLibrary size={26} className="inline-block mr-1" /> คลังหนังสือ
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-black text-2xl font-semibold" : "text-gray-500 hover:text-black text-2xl font-semibold transition-all duration-500"
            }
          >
            <Info size={26} className="inline-block mr-1" /> เกี่ยวกับ
          </NavLink>
        </div>

        {/* Search Bar */}
        <div className="container flex pl-80 items-center ml-96 gap-7">
          <div className="flex items-center bg-white px-3 py-1 rounded-md shadow-sm">
            <input
              type="text"
              placeholder="ค้นหาข้อมูล"
              className="outline-none text-sm text-gray-500"
            />
            <Search size={18} className="text-gray-500 ml-2" />
          </div>

          {/* User Info */}
          <div className="relative">
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "text-black font-bold" : "text-gray-700 hover:text-black"
              }
            >
              <button className="text-gray-500 hover:text-black flex items-center text-2xl font-semibold transition-all duration-500">
                <User size={26} className="mr-1" /> เข้าสู่ระบบ
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
