'use client';

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { FcGoogle } from 'react-icons/fc';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  getAuth,
  getRedirectResult,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth, googleProvider } from '@/src/firebase';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) mountRef.current.appendChild(renderer.domElement);

    const particles = new THREE.BufferGeometry();
    const particleCount = 800;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0xaaaaaa, size: 0.04 });
    const particleMesh = new THREE.Points(particles, material);
    scene.add(particleMesh);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      particleMesh.rotation.y += 0.0008;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          console.log("Google Sign In Success (Redirect):", result.user);
          router.push('/login-success');
        }
      } catch (error) {
        console.error("Redirect Sign In Error:", error);
      }
    };
    
    checkRedirectResult();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // First authenticate with your backend
      const res = await fetch("http://localhost:5000/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });
      
      if (!res.ok) {
        throw await res.json();
      }
      
      const data = await res.json();
      localStorage.setItem("token", data.token);

      // Then sign in with Firebase using the same credentials
      await signInWithEmailAndPassword(auth, username, password);
      router.push("/login-success");
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        alert("Invalid credentials. Redirecting to Signup.");
        router.push("/signup");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      // Configure Google provider
      googleProvider.setCustomParameters({
        prompt: 'select_account'
      });

      // Try popup first
      try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log("Google Sign In Success:", result.user);
        router.push('/login-success');
      } catch (popupError: any) {
        if (popupError.code === 'auth/popup-blocked') {
          // If popup is blocked, show a user-friendly message
          const confirmRedirect = window.confirm(
            'Popup was blocked. Would you like to continue with redirect authentication?'
          );
          if (confirmRedirect) {
            // Redirect to Google sign-in page
            await auth.signInWithRedirect(googleProvider);
          }
        } else {
          throw popupError;
        }
      }
    } catch (error: any) {
      console.error("Google Sign In Error:", error);
      alert(error.message || "Failed to sign in with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div ref={mountRef} className="absolute inset-0 z-0" />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 rounded-2xl bg-black/50 backdrop-blur-sm border border-purple-600/20"
        >
          <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
            Welcome Back
          </h1>
          
          <div className="space-y-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/dashboard')}
              className="w-full py-3 rounded-lg border border-purple-600/20 hover:bg-purple-600/20 text-white font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            >
              Continue as Guest
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className={`w-full py-3 rounded-lg bg-white text-black font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <FcGoogle className="w-5 h-5" />
              )}
              <span>{isLoading ? 'Signing in...' : 'Sign in with Google'}</span>
            </motion.button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-600/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-300">Or continue with</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-gray-300 text-sm">Username</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-purple-600/20 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-white"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-gray-300 text-sm">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-purple-600/20 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-white"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-purple-600/20" />
                <span className="text-gray-300">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-purple-400 hover:text-purple-300">
                Forgot Password?
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors"
            >
              Sign In
            </motion.button>

            <p className="text-center text-gray-300">
              Don't have an account?{' '}
              <Link href="/about/Signup" className="text-purple-400 hover:text-purple-300">
                Register
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
