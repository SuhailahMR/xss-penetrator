import { MainNav } from "@/components/MainNav";

export function Header() {
  return (
    <div className="border-b bg-[#800020]">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-bold text-white">Threat Finder</h2>
          <MainNav />
        </div>
      </div>
    </div>
  );
}