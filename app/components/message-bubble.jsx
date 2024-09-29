export default function MessageBubble(message, senderIsUser) {
  console.log("message", message);
  return message.senderIsUser ? (
    <div className="rounded-2xl ml-auto w-fit px-2 py-1 bg-white">
      {message.message}
    </div>
  ) : (
    <div className="rounded-2xl px-2 py-1 w-fit text-background bg-blue-600">
      {message.message}
    </div>
  );
}
