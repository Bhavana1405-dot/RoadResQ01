<<<<<<< HEAD
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const Navigation = () => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-sm border-b border-purple-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-white">
            RoadResQ
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
              Services
            </Link>
            <Link 
              href="/about/Signup" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Sign up
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/about/Login')}
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
            >
              Login
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
=======
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const Navigation = () => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-sm border-b border-purple-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-white">
            RoadResQ
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
              Services
            </Link>
            <Link 
              href="/about/Signup" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Sign up
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/about/Login')}
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
            >
              Login
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
>>>>>>> 7f5fc52 (first commit)
