
import { ScrollArea } from "@/components/ui/scroll-area";
import { History } from "lucide-react";

const Sidebar = () => {
  const historyItems = [
    "Previous Search 1",
    "Previous Search 2",
    "Previous Search 3",
  ];

  return (
    <div className="w-64 border-r border-gray-200 h-screen fixed left-0 top-16 bg-white/80 backdrop-blur-md">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-gray-500" />
          <h2 className="font-semibold">History</h2>
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)] p-4">
        <div className="space-y-2">
          {historyItems.map((item, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
            >
              {item}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
