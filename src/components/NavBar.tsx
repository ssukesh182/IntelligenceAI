
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogIn, UserPlus, Info } from "lucide-react";

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-semibold">
            Educreate
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/about">
              <Button variant="ghost" className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                Details
              </Button>
            </Link>
            <Link to="/signin">
              <Button variant="ghost" className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                SignIn
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="default" className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                SignUp
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
