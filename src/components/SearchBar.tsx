import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative flex items-center justify-between gap-2 w-[42rem] max-w-full rounded-full border-2 border-gray-700 bg-[#2f3640] p-2">
      <Search className="w-5 h-5 text-white" />
      <Input
        placeholder="Search..."
        className="flex-1 bg-transparent text-white placeholder-white border-none focus:ring-0"
      />
      <Button className="p-2 w-12 h-12 rounded-full bg-gradient-to-r from-[#2AF598] to-[#009EFD] text-white hover:bg-[#1a1a1a] hover:shadow-lg focus:outline-none transition-all transform duration-200 ease-in-out">
        <Filter className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default SearchBar;
