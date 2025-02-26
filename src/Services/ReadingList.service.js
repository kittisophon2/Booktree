import http from "../http-common"; 
import { jwtDecode } from "jwt-decode"; 

// 📌 ดึงรายการหนังสือของผู้ใช้
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  return { Authorization: `Bearer ${token}` };
};

// ใช้ในฟังก์ชันต่างๆ เช่น
const getUserReadingList = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const decoded = jwtDecode(token);
    const userId = decoded.userId;

    if (!userId) {
      console.error("❌ Invalid userId from token:", decoded);
      throw new Error("Invalid user_id from token");
    }

    const response = await http.get(`/readings/${userId}`, {
      headers: getAuthHeaders(),
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error fetching user reading list:", error.response?.data || error.message);
    throw error;
  }
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
      const user_id = decoded.userId;

      if (!user_id) {
          console.error("❌ Decoded token does not contain a valid user_id:", decoded);
          throw new Error("Invalid user_id from token");
      }

      console.log("📌 Sending request with:", { user_id, book_id });

      // ✅ เพิ่มหนังสือลงในคลัง
      const response = await http.post(
          "/readings",
          { user_id, book_id, status: "TO_READ" },
          { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ ตรวจสอบว่าเพิ่มสำเร็จแล้วค่อยเพิ่มตัวนับ
      if (response.data) {
          console.log("📌 Book added successfully, now incrementing count...");

          await http.put(
              `/books/increment-added-to-list/${book_id}`,
              {},
              { headers: { Authorization: `Bearer ${token}` } }
          );

          console.log("✅ Successfully incremented book add count");
      }

      return response.data;
  } catch (error) {
      console.error("❌ Error adding to reading list:", error.response?.data || error.message);
      throw error;
  }
};

  
  


// 📌 อัปเดตสถานะการอ่าน (เริ่มอ่าน)
const startReading = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await http.patch(`/readings/${id}/start`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error starting reading:", error.response?.data || error.message);
    throw error;
  }
};

const finishReading = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await http.patch(`/readings/${id}/finish`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error finishing reading:", error.response?.data || error.message);
    throw error;
  }
};


// 📌 ลบหนังสือออกจาก Reading List
const removeFromReadingList = async (book_id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const decoded = jwtDecode(token);
    const user_id = decoded.userId; // ✅ เปลี่ยนเป็น userId ให้ตรงกัน

    if (!user_id) {
      console.error("❌ Invalid userId from token:", decoded);
      throw new Error("Invalid user_id from token");
    }

    const response = await http.delete(`/readings/${user_id}/${book_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error removing from reading list:", error.response?.data || error.message);
    throw error;
  }
};

  
  

const ReadingListService = {
  getUserReadingList,
  addToReadingList,
  startReading,
  finishReading,
  removeFromReadingList,
};

export default ReadingListService;