
import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { History } from "lucide-react";

const Sidebar = () => {
    const historyItems = [
        "Previous Search 1",
        "Previous Search 2",
        "Previous Search 3",
    ];

    const [isOpen, setIsOpen] = useState(true); // State to track sidebar open/close
    const [activeItem, setActiveItem] = useState(null); // State to track active item

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Sidebar Toggle Button */}

            <button
    className={`fixed top-16 ${isOpen ? "left-[260px]" : "left-4"} z-50 p-3 rounded-md text-black bg-transparent hover:bg-transparent transition-colors`}
    onClick={toggleSidebar}
>
<span className="text-3xl font-bold text-[#F8F8F8]">&#9776;</span> {/* Off-white color */}
</button>



            {/* Sidebar */}
            <div
                className={`w-64 border-r border-gray-800 h-screen fixed left-0 top-16 
                  bg-gradient-to-b from-[#FADADD]/90 to-[#F8C8DC]/90 backdrop-blur-md 
                  transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                  
            >
                <div className="p-4 border-b border-gray-800">
                    <div className="flex items-center gap-2">
                        <History className="w-5 h-5 text-gray-300" />
                        <h2 className="font-semibold text-gray-200">History</h2>
                    </div>
                </div>
                <ScrollArea className="h-[calc(100vh-4rem)] p-4">
                    <div className="space-y-2">
                        {historyItems.map((item, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded-md cursor-pointer transition-colors text-gray-300 ${activeItem === index ? 'bg-gray-700' : 'hover:bg-gray-800/50'}`}
                                onClick={() => setActiveItem(index)}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </>
    );
};

export default Sidebar;