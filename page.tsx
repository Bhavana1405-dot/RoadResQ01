'use client';

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/src/firebase';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    try {
      // Add your signup logic here
      router.push('/dashboard');
    } catch (error: any) {
      alert(error.message || "Failed to sign up");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Sign Up Success:", result.user);
      router.push('/dashboard');
    } catch (error: any) {
      console.error("Google Sign Up Error:", error);
      alert(error.message || "Failed to sign up with Google");
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
            Create Account
          </h1>
          
          <div className="space-y-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleSignIn}
              className="w-full py-3 rounded-lg bg-white text-black font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <FcGoogle className="w-5 h-5" />
              <span>Sign up with Google</span>
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
              <label className="text-gray-300 text-sm">Full Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-purple-600/20 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-white"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-300 text-sm">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-purple-600/20 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-white"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-gray-300 text-sm">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-purple-600/20 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-white"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-300 text-sm">Confirm Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-purple-600/20 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-white"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors"
            >
              Create Account
            </motion.button>

            <p className="text-center text-gray-300">
              Already have an account?{' '}
              <Link href="/about/Login" className="text-purple-400 hover:text-purple-300">
                Sign in
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup; 