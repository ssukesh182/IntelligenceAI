import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import FAQ from "@/components/FAQ";
import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showQuizButton, setShowQuizButton] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowQuizButton(true);
    }
  };

  const handleQuizStart = () => {
    navigate(`/quiz/${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <div
      className="min-h-screen bg-[#1A1F2C] bg-cover bg-center flex flex-col items-center"
      style={{
        backgroundImage:
          'url("/lovable-uploads/Free Vector _ Gradient liquid abstract background.jpg")',
      }}
    >
      <NavBar />
      <div className="flex w-full">
        <Sidebar />
        <main className="flex flex-col items-center justify-center w-full min-h-screen pt-16 px-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn text-center">
            <h1 className="text-4xl font-bold text-white animate-slideIn">
              Discover DIY Projects with Educreate
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto animate-slideIn">
              Search through thousands of DIY projects or upload an image to find similar tutorials.
            </p>

            {/* Search Bar - Full Width */}
            <form onSubmit={handleSearch} className="w-full max-w-2xl flex">
              <input
                type="text"
                placeholder="Search for a topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow px-4 py-2 rounded-l-lg bg-[#2f3640] text-white border border-[#2AF598] focus:outline-none"
              />
              <button type="submit" className="bg-[#2AF598] text-black px-6 py-2 rounded-r-lg hover:bg-[#009EFD] transition">
                Search
              </button>
            </form>

            <div className="flex flex-col items-center space-y-6 w-full">
              <ImageUpload />
              {/* "Attempt Quiz" Button appears below Image Upload & Take Image */}
              {showQuizButton && (
                <Button
                  onClick={handleQuizStart}
                  className="bg-[#2AF598] text-black px-6 py-3 rounded-lg hover:bg-[#009EFD] transition"
                >
                  Attempt Quiz
                </Button>
              )}
              <FAQ />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
