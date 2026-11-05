import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from '../../public/logo_home.png';
const Layout = ({ children }) => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigation = [
        { name: "Home", href: "/" },
        { name: "Loyalty Points", href: "/loyalty" },
        // { name: "Rewards", href: "/rewards" },
        { name: "Invoices", href: "/invoices" },
        { name: "Products", href: "/products" },
    ];
    const isActive = (path) => location.pathname === path;
    return (<div className="min-h-screen bg-background">
      {/* Header */}
      
      <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-border">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <img src={logo}/>
              </div>
              <span className="text-xl font-bold text-foreground">Jindal India </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (<Link key={item.name} to={item.href} className={`text-sm font-medium transition-colors hover:text-primary ${isActive(item.href) ? "text-primary" : "text-muted-foreground"}`}>
                  {item.name}
                </Link>))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hidden md:flex" onClick={() => navigate('/profile')}>
                <User className="w-4 h-4 mr-2"/>
                Profile
              </Button>

              {/* Mobile menu button */}
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (<div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col space-y-3">
                {navigation.map((item) => (<Link key={item.name} to={item.href} className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"}`} onClick={() => setIsMenuOpen(false)}>
                    {item.name}
                  </Link>))}
                <div className="px-4 pt-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2"/>
                    Profile
                  </Button>
                </div>
              </div>
            </div>)}
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Floating QR Button */}
     
    </div>);
};
export default Layout;
