
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import ImageUpload from "@/components/ImageUpload";
import FAQ from "@/components/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#E5DEFF]">
      <NavBar />
      <Sidebar />
      <main className="ml-64 pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fadeIn">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold animate-slideIn">
              Discover DIY Projects with ImagiQuest
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto animate-slideIn">
              Search through thousands of DIY projects or upload an image to find similar tutorials
            </p>
          </div>

          <div className="flex flex-col items-center space-y-8">
            <div className="w-full flex justify-center animate-slideIn">
              <SearchBar />
            </div>

            <div className="w-full flex justify-center animate-slideIn">
              <ImageUpload />
            </div>

            <div className="w-full flex justify-center animate-slideIn">
              <FAQ />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
