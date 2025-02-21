<<<<<<< HEAD
'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { 
  BellRing, 
  AlertTriangle, 
  Phone, 
  HeartPulse, 
  Map, 
  Users 
} from 'lucide-react';

const ServicesSection = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    {
      title: "Nearest Ambulance Assistance",
      description: "Instantly locate and call the nearest ambulance service using real-time GPS tracking. Direct integration with government and private emergency response teams for faster dispatch. One-tap SOS button to share your live location with paramedics and emergency contacts.",
      icon: <Map className="w-8 h-8 text-blue-600" />,
    },
    {
      title: "Accident Reporting System",
      description: "Report accidents instantly with a simple form or voice command. Automatic location sharing with emergency responders and local authorities. AI-powered accident severity assessment to prioritize critical cases.",
      icon: <AlertTriangle className="w-8 h-8 text-yellow-600" />,
    },
    {
      title: "Emergency Hotline & Quick Dial",
      description: "Direct access to police, fire department, and ambulance services. One-touch dial feature for immediate emergency help. Customizable emergency contact list for quick notification of family members.",
      icon: <Phone className="w-8 h-8 text-green-600" />,
    },
    {
      title: "First Aid Guidance",
      description: "AI chatbot provides step-by-step first aid instructions based on the injury. Video tutorials for CPR, bleeding control, and other lifesaving techniques. Quick symptom checker for non-critical injuries.",
      icon: <HeartPulse className="w-8 h-8 text-red-600" />,
    },
    {
      title: "Live Traffic & Safe Route Alerts",
      description: "Identify accident-prone areas and suggest safer alternative routes. Warn nearby drivers about accidents and potential roadblocks. Crowd-sourced accident reports to enhance real-time updates.",
      icon: <BellRing className="w-8 h-8 text-purple-600" />,
    },
    {
      title: "Emergency Broadcast & Community Help",
      description: "Notify nearby users about an accident so they can assist or provide information. Volunteers and nearby medical professionals can opt-in for real-time alerts to offer help. Direct communication channel with emergency responders.",
      icon: <Users className="w-8 h-8 text-indigo-600" />,
    },
  ];

  return (
    <section className="relative min-h-screen bg-black">
      <div ref={mountRef} className="absolute inset-0 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600"
        >
          Emergency Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black/50 backdrop-blur-sm rounded-xl p-6
                       hover:bg-purple-900/20 transition-all duration-300
                       border border-purple-600/20 hover:border-purple-600/40
                       transform hover:-translate-y-1 hover:scale-[1.02]
                       group shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-purple-400 group-hover:text-purple-300">
                  {service.title}
                </h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

=======
'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  BellRing, 
  AlertTriangle, 
  Phone, 
  HeartPulse, 
  Map, 
  Users,
  ArrowRight
} from 'lucide-react';

const ServicesSection = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
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
    {
      title: "Nearest Ambulance Assistance",
      description: "Locate and dispatch the nearest ambulance with real-time GPS tracking. One-tap SOS button for instant location sharing with emergency services.",
      icon: <Map className="w-8 h-8 text-blue-600" />,
      href: "/ambulance",
    },
    {
      title: "Accident Reporting System",
      description: "Quick accident reporting with location sharing and AI-powered severity assessment for emergency responders.",
      icon: <AlertTriangle className="w-8 h-8 text-yellow-600" />,
      href: "/report-accident",
    },
    {
      title: "Emergency Hotline & Quick Dial",
      description: "Instant access to emergency services with one-touch dial feature. Quick notification system for emergency contacts.",
      icon: <Phone className="w-8 h-8 text-red-600" />,
      href: "/emergency-services",
      priority: true,
    },
    {
      title: "First Aid Guidance",
      description: "Step-by-step first aid instructions via AI chatbot. Access to emergency care videos and quick symptom assessment.",
      icon: <HeartPulse className="w-8 h-8 text-red-600" />,
      href: "/first-aid",
    },
    {
      title: "Live Traffic & Safe Route Alerts",
      description: "Real-time accident alerts and safer route suggestions. Crowd-sourced updates for enhanced road safety.",
      icon: <BellRing className="w-8 h-8 text-purple-600" />,
      href: "/traffic-alerts",
    },
    {
      title: "Emergency Broadcast & Community Help",
      description: "Alert nearby users and medical professionals about emergencies. Direct communication channel with emergency responders.",
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      href: "/community-help",
    },
  ];

  return (
    <section className="relative min-h-screen bg-black">
      <div ref={mountRef} className="absolute inset-0 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600"
        >
          Emergency Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={index} href={service.href}>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-black/50 backdrop-blur-sm rounded-xl p-6
                         hover:bg-purple-900/20 transition-all duration-300
                         border ${service.priority ? 'border-red-600/40 hover:border-red-600/60' : 'border-purple-600/20 hover:border-purple-600/40'}
                         transform hover:-translate-y-1 hover:scale-[1.02]
                         group shadow-lg text-left w-full`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 ${service.priority ? 'bg-red-500/10 group-hover:bg-red-500/20' : 'bg-purple-500/10 group-hover:bg-purple-500/20'} rounded-lg transition-colors duration-300`}>
                    {service.icon}
                  </div>
                  <h3 className={`text-xl font-semibold ${service.priority ? 'text-red-400 group-hover:text-red-300' : 'text-purple-400 group-hover:text-purple-300'}`}>
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className={`flex items-center justify-end ${service.priority ? 'text-red-400 group-hover:text-red-300' : 'text-purple-400 group-hover:text-purple-300'}`}>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

>>>>>>> 7f5fc52 (first commit)
export default ServicesSection;