import React from "react";
import { Facebook, Instagram, Youtube, X, Gamepad2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="grid grid-cols-5 gap-8 w-full text-sm text-center bg-[#F4FCF9] text-black py-6 border-t border-gray-300 ">
      
      {/* Logo */}
      <div className="flex flex-col items-center col-span-1">
        <img src="/pic/gogo.png" alt="Book Trees" className="h-" />
      </div>

      {/* Title */}
      <div className="flex flex-col justify-center col-span-1 pl-24">
        <h1 className="text-8xl font-custom logo">Book </h1>
      </div>
      <div className="flex flex-col justify-center col-span-1 pr-96">
        <h1 className="text-8xl font-custom logo">Trees</h1>
        </div>

      <div className="space-x-4 flex">
      {/* Categories */}
      <div className="col-span-1">
        <h2 className="font-semibold">หมวดหมู่</h2>
        <ul className="space-y-1">
          <li>นวนิยาย</li>
          <li>นิยาย</li>
          <li>จิตวิทยา</li>
          <li>ธุรกิจ</li>
          <li>การ์ตูน</li>
          <li>สุขภาพ</li>
          <li>สารคดี</li>
        </ul>
      </div>

      {/* About */}
      <div className="col-span-1">
        <h2 className="font-semibold">เกี่ยวกับ</h2>
        <ul className="space-y-1">
          <li>BookTrees ?</li>
          <li>ความตั้งใจ</li>
        </ul>
      </div>
      </div>

      {/* Social Icons */}
      <div className="col-span-1 flex flex-col items-center">
        <h2 className="font-semibold"></h2>
        <div className="flex justify-center space-x-4 mt-2">
          <X size={20} className="cursor-pointer" />
          <Youtube size={20} className="cursor-pointer" />
          <Instagram size={20} className="cursor-pointer" />
          <Facebook size={20} className="cursor-pointer" />
          <Gamepad2 size={20} className="cursor-pointer" />
        </div>
      </div>
      

      {/* Copyright */}
      <div className="col-span-5 text-sm text-gray-600 mt-4 border-t pt-2 w-full text-center">
        © 2025 BookTrees | All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
