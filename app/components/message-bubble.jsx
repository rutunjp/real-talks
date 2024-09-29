export default function MessageBubble(message, senderIsUser) {
  return senderIsUser ? (
    <div className="rounded-2xl bg-white">{message}</div>
  ) : (
    <div className="rounded-2xl bg-blue-600">{message}</div>
  );
}
