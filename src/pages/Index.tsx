import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import ImageUpload from "@/components/ImageUpload";
import FAQ from "@/components/FAQ";

const Index = () => {
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fadeIn text-center">
            <h1 className="text-4xl font-bold text-white animate-slideIn">
              Discover DIY Projects with Educreate
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto animate-slideIn">
              Search through thousands of DIY projects or upload an image to find similar tutorials
            </p>

            <div className="flex flex-col items-center space-y-8 w-full">
              <SearchBar />
              <ImageUpload />
              <FAQ />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
