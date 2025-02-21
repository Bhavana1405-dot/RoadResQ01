'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Home, Car, Phone, User, LogOut, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { icon: <Home size={20} />, label: 'Home', href: '/' },
    { icon: <Car size={20} />, label: 'Services', href: '/services' },
    { icon: <Phone size={20} />, label: 'Contact', href: '/contact' },
    { icon: <User size={20} />, label: 'Profile', href: '/profile' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-purple-600 rounded-lg md:hidden"
      >
        <Menu className="w-5 h-5 text-white" />
      </button>

      {/* Desktop Collapse Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-[210px] top-6 z-50 p-1.5 bg-purple-600 rounded-full hidden md:block"
      >
        {isOpen ? (
          <ChevronLeft className="w-4 h-4 text-white" />
        ) : (
          <ChevronRight className="w-4 h-4 text-white" />
        )}
      </button>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ 
          width: isOpen ? '250px' : '80px',
          x: isMobileOpen ? 0 : (isMobile ? -300 : 0)
        }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="fixed left-0 top-0 h-screen bg-black/90 border-r border-purple-600/20 backdrop-blur-sm
                  flex flex-col justify-between z-40 transition-all duration-300"
      >
        <div className="p-6">
          <motion.div
            animate={{ opacity: isOpen ? 1 : 0 }}
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600"
          >
            {isOpen && <Link href="/">RoadResQ</Link>}
          </motion.div>

          <nav className="mt-12">
            <ul className="space-y-3">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-4 p-2 rounded-lg transition-colors
                              ${pathname === item.href 
                                ? 'bg-purple-600/20 text-purple-400' 
                                : 'text-gray-300 hover:bg-purple-600/10 hover:text-purple-400'}`}
                  >
                    <div className={`${!isOpen ? 'mx-auto' : ''}`}>
                      {item.icon}
                    </div>
                    {isOpen && <span>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="p-6">
          <button
            onClick={() => router.push('/about/Login')}
            className={`flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition-colors
                      ${!isOpen ? 'justify-center' : ''}`}
          >
            <LogOut size={20} />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar; 
