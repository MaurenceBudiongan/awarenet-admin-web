import { useUser } from "@descope/nextjs-sdk/client";

export default function TopBar() {
  const { user } = useUser();
  return (
    <div className="fixed top-0 z-10 flex h-16 w-full items-center justify-between border-b-2 border-gray-200 bg-zinc-100 p-4">
      <div className="font-bold text-black">Awarenet Admin</div>
      <div className="cursor-pointer">{user?.name}</div>
    </div>
  );
}
