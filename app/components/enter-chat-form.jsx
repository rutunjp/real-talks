"use client";
import { useState } from "react";

export default function ChatRoomForm() {
  const [userName, setUserName] = useState("");
  const [chatRoom, setChatRoom] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true); // Set loading state

    try {
      const res = await axios.post("/api/sendMessage", {
        userName: userName,
        chatRoom: chatRoom,
      });

      // Handle the response
      console.log(res.data);
    } catch (error) {
      // Handle the error
      console.error(
        "Error while creating chat room:",
        error.response ? error.response.data : error.message
      );
    }

    setLoading(false); // Remove loading state after response
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Join a Chat Room</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {/* Username Input */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Chat Room Input */}
        <div className="mb-4">
          <label
            htmlFor="chatRoom"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Chat Room
          </label>
          <input
            type="text"
            id="chatRoom"
            value={chatRoom}
            onChange={(e) => setChatRoom(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? "Joining..." : "Join"}
          </button>
        </div>
      </form>

      {/* Message Display */}
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
}
