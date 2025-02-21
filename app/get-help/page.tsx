"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Phone, Car, Wrench, Battery, Key, Fuel } from 'lucide-react';

export default function GetHelp() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Three.js Scene Setup
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

  const services = [
    { icon: <Car size={40} />, name: "Towing Service", description: "24/7 emergency towing to nearest service station" },
    { icon: <Battery size={40} />, name: "Battery Jump Start", description: "Quick battery boost to get you moving" },
    { icon: <Wrench size={40} />, name: "Tire Change", description: "Professional tire change and repair service" },
    { icon: <Fuel size={40} />, name: "Fuel Delivery", description: "Emergency fuel delivery when you run dry" },
    { icon: <Key size={40} />, name: "Lock-out Assistance", description: "Professional locksmith services" },
    { icon: <Car size={40} />, name: "Roadside Repair", description: "Basic mechanical repairs on-site" }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div ref={mountRef} className="absolute inset-0 z-0" />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600 mb-6">
            Emergency Assistance
          </h1>
          <div className="flex flex-col items-center justify-center space-y-6">
            <p className="text-2xl text-gray-300 max-w-2xl">
              24/7 Emergency Roadside Assistance
            </p>
            <a
              href="tel:1-800-ROADHELP"
              className="flex items-center space-x-3 px-8 py-4 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-all duration-300"
            >
              <Phone className="w-6 h-6" />
              <span className="text-2xl font-bold">1-800-ROADHELP</span>
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/50 backdrop-blur-sm border border-purple-600/20 rounded-xl p-6
                         hover:bg-purple-900/20 transition-all duration-300
                         transform hover:-translate-y-1 hover:scale-[1.02]"
            >
              <div className="text-purple-400 mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-purple-400 mb-2">{service.name}</h3>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/"
            className="px-6 py-3 border-2 border-purple-600 text-purple-400 rounded-lg
                     hover:bg-purple-600 hover:text-white transition-all duration-300"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 