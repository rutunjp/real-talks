"use client";
import { SendHorizonal } from "lucide-react";
import { useEffect, useState } from "react";
import MessageBubble from "./components/message-bubble";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      sender: "Ramesh",
      message: "Hii",
    },
  ]);
  const [message, setMessage] = useState("");
  let sender;
  let user;
  // useEffect(()=>{

  // },[])
  function handleSend() {
    setMessage("");
  }
  return (
    <div className="w-1/2 m-auto flex flex-col place-self-center h-[512px] p-4 bg-gray-200 rounded-lg border-[1px] border-gray-400">
      <h1>Chat room</h1>
      {sender === user ? (
        <MessageBubble senderIsUser={true} />
      ) : (
        <MessageBubble senderIsUser={false} />
      )}

      <div className="flex mt-auto flex-row gap-2 w-full">
        <input
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 rounded-lg"
          placeholder="Enter message..."
        />

        <button onClick={() => handleSend()}>
          <SendHorizonal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
