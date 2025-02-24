
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex gap-2 w-full max-w-2xl">
      <Input
        placeholder="Search for projects..."
        className="flex-1"
      />
      <Button className="flex items-center gap-2">
        <Search className="w-4 h-4" />
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
