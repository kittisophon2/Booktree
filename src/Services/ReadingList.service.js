import http from "../http-common"; 
import { jwtDecode } from "jwt-decode"; 

// 📌 ดึงรายการหนังสือของผู้ใช้
const getUserReadingList = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
  
    const decoded = jwtDecode(token);
    const userId = decoded.id; 
  
    return http.get(`/readings/${userId}`);
  };

// 📌 เพิ่มหนังสือลง Reading List
const addToReadingList = async (book_id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ No token found in localStorage");
        throw new Error("No token found");
      }
  
      const decoded = jwtDecode(token);
      const user_id = decoded.userId; // ✅ เปลี่ยนจาก id เป็น userId
  
      // ✅ ตรวจสอบว่า user_id มีค่าหรือไม่
      if (!user_id) {
        console.error("❌ Decoded token does not contain a valid user_id:", decoded);
        throw new Error("Invalid user_id from token");
      }
  
      console.log("📌 Sending request with:", { user_id, book_id });
  
      const response = await http.post(
        "/readings",
        { user_id, book_id, status: "TO_READ" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("❌ Error adding to reading list:", error.response?.data || error.message);
      throw error;
    }
  };
  
  


// 📌 อัปเดตสถานะการอ่าน (เริ่มอ่าน)
const startReading = (id) => {
    return http.patch(`/readings/${id}/start`);
  };
  

// 📌 อัปเดตสถานะการอ่าน (อ่านจบแล้ว)
const finishReading = (id) => {
  return http.patch(`/readings/${id}/finish`);
};

// 📌 ลบหนังสือออกจาก Reading List
const removeFromReadingList = (book_id) => {
    const token = localStorage.getItem("token");
    if (!token) return Promise.reject("No token found");
  
    const decoded = jwtDecode(token);
    const user_id = decoded.id;
  
    return http.delete(`/readings/${user_id}/${book_id}`);
  };
  
  

const ReadingListService = {
  getUserReadingList,
  addToReadingList,
  startReading,
  finishReading,
  removeFromReadingList,
};

export default ReadingListService;
