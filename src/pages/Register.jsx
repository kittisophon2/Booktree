import React from "react";
import { User, Lock } from "lucide-react";

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="bg-[#F4FCF9] p-12 rounded-2xl shadow-2xl w-[450px]">
        <div className="flex flex-col items-center">
          <img
            src="/pic/gogo.png" 
            alt="BookTrees Logo"
            className=" h-64 mb-6"
          />
          <h1 className="text-xl font-semibold text-gray-700">BookTrees</h1>
        </div>
        <div className="mt-8">
          <div className="mb-6">
            <label className="block text-gray-600 mb-2 text-lg">ชื่อผู้ใช้งาน</label>
            <div className="flex items-center border rounded-lg px-4 py-3 text-lg">
              <User className="text-gray-400 " size={24} />
              <input
                type="text"
                placeholder="ชื่อผู้ใช้งาน"
                className="w-full pl-3 outline-none text-lg"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 mb-2 text-lg">รหัสผ่าน</label>
            <div className="flex items-center border rounded-lg px-4 py-3 text-lg">
              <Lock className="text-gray-400" size={24} />
              <input
                type="password"
                placeholder="รหัสผ่าน"
                className="w-full pl-3 outline-none text-lg"
              />
            </div>
          </div>
          <button className="w-full bg-[#304896] text-white py-3 rounded-[50px] text-4xl font-semibold hover:bg-blue-800">
            ล็อกอิน
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
