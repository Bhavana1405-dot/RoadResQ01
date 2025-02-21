'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { CheckCircle } from 'lucide-react';

export default function LoginSuccess() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/about/Login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center mt-20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-8 text-green-500"
        >
          <CheckCircle size={80} />
        </motion.div>

        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          Login Successful!
        </h1>

        <p className="text-xl text-gray-300 mb-8">
          Welcome{user.displayName ? `, ${user.displayName}` : ''}! You have successfully logged in.
        </p>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/dashboard')}
            className="w-full max-w-md mx-auto py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors"
          >
            Go to Dashboard
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/profile')}
            className="w-full max-w-md mx-auto py-3 rounded-lg border border-purple-600 hover:bg-purple-600/20 text-white font-semibold transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">View Profile</h3>
            <p className="text-sm text-gray-400">Update your information and preferences</p>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}