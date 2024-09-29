"use client";
import { SendHorizonal } from "lucide-react";
import { useEffect, useState } from "react";
import MessageBubble from "../components/message-bubble";
import userStore from "../utils/user-store";
import ChatboxHeader from "../components/chatbox-header";
export default function Home() {
  const { user, setUser, signOut } = userStore();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");

  useEffect(() => {
    console.log("sender", typeof sender);
    console.log("user", user);
  }, []);
  function handleSend() {
    setMessage("");
  }
  return (
    <div className="bg-gray-200 m-auto  h-[512px] flex w-1/2 flex-col place-self-center rounded-lg border-[1px] border-gray-400">
      <ChatboxHeader user={user} />
      <div className="p-4">
        {messages.map((message, id) =>
          message.sender === user ? (
            <MessageBubble
              key={id}
              message={message.message}
              senderIsUser={true} // Assuming this means the sender is the user
            />
          ) : (
            <MessageBubble
              key={id}
              message={message.message}
              senderIsUser={false} // Assuming this means the sender is not the user
            />
          )
        )}
      </div>
      <div className="flex mt-auto flex-row gap-2 p-2 w-full">
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="w-full p-2 rounded-lg"
          placeholder="Enter message..."
        />

        <button
          className="hover:-rotate-45 duration-150 p-2 hover:scale-125 hover:ease-in-out"
          onClick={() => handleSend()}
        >
          <SendHorizonal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
