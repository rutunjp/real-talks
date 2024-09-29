"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import userStore from "./utils/user-store";

export default function Page() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [chatRoom, setChatRoom] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const { user, setUser, signOut } = userStore();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true); // Set loading state
    try {
      const res = await axios.post("/api/login", {
        userName,
        chatRoom,
      }); // Change to the correct API endpoint

      // Since Axios automatically parses JSON, we can access data directly
      const data = res.data;
      setMessage(data.message); // Show success or error message
      toast.success(data.message);
      setUser(userName);
      console.log("user", user);
      router.push("/chat-room"); // Redirect after successful submission
    } catch (error) {
      // Handle error properly
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
      setMessage(errorMessage);
    }

    setLoading(false); // Remove loading state after response
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Join a Chat Room</h1>

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
