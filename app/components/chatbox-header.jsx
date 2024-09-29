import { LogOut } from "lucide-react";
import { useStore } from "zustand";
import userStore from "../utils/user-store";
import { useRouter } from "next/navigation";

export default function ChatboxHeader({ user }) {
  const router = useRouter();
  const { signOut } = userStore();
  return (
    <div className="flex p-4 bg-slate-300 flex-row w-full  justify-between">
      <h1 className=" font-medium text-lg">Welcome {user}</h1>
      <button
        className="flex flex-row gap-1 bg-slate-100 p-2 rounded-md"
        onClick={() => {
          signOut();
          router.push("/");
        }}
      >
        Sign out <LogOut />
      </button>
    </div>
  );
}
