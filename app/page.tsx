'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowRight, Car, Mail, MapPin, Phone, Wrench } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Card from '@/components/ui/Card';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import ServicesSection from '@/components/ServicesSection';
import { useRouter } from 'next/navigation';
import Chat from '@/components/ui/Chat';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Three.js Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) mountRef.current.appendChild(renderer.domElement);

    // Particles Effect
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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div ref={mountRef} className="absolute inset-0 z-0" />
      <Navigation />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600"
        >
          ROADSIDE ASSISTANCE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 text-xl max-w-2xl text-gray-300"
        >
          Get 24/7 roadside assistance at over 170+ locations. Instant help at your fingertips.
        </motion.p>
        <motion.div 
          className="mt-8 flex space-x-4" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Link
            href="/get-help"
            className="group px-6 py-3 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-all duration-300 flex items-center space-x-2"
          >
            <span>Get Help Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/get-started">
            <MovingBorderButton
              borderRadius="1.75rem"
              className="px-6 py-3 text-base"
              containerClassName="w-full sm:w-auto"
              borderClassName="bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)]"
            >
              Get Started
            </MovingBorderButton>
          </Link>
        </motion.div>
      </div>

      <ServicesSection />

      {/* Footer Section */}
      <footer className="relative z-10 bg-black/90 border-t border-purple-600/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                Roadside Assist
              </h3>
              <p className="text-gray-400">24/7 Emergency roadside assistance you can trust.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/get-help" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Get Help
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold">Services</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Breakdown Assistance</li>
                <li className="text-gray-400">Mobile Repairs</li>
                <li className="text-gray-400">Towing Service</li>
                <li className="text-gray-400">Battery Replacement</li>
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Phone className="w-4 h-4" />
                  <span>1-800-ROADSIDE</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>help@roadsideassist.com</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>170+ Locations Nationwide</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="border-t border-purple-600/20 mt-12 pt-8 text-center text-gray-400"
          >
            <p>&copy; {new Date().getFullYear()} Roadside Assist. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>

      <div className="fixed bottom-4 right-4 z-50">
        <motion.div
          initial={{ width: "60px", height: "60px" }}
          whileHover={{ 
            width: "400px", 
            height: "500px",
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          className="relative bg-black/90 rounded-2xl border border-purple-600/20 overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 1 }}
            whileHover={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
          >
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            <div className="h-full">
              <Chat />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
