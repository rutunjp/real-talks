import { LogOut } from "lucide-react";

export default function ChatboxHeader({ user }) {
  return (
    <div className="flex p-4 bg-slate-300 flex-row w-full  justify-between">
      <h1 className=" font-medium text-lg">Welcome {user}</h1>
      <button>
        <LogOut />
      </button>
    </div>
  );
}
