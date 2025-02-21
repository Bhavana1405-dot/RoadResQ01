'use client';

import { motion } from 'framer-motion';
import { Users, Trophy, Target, Globe } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  const stats = [
    { number: "170+", label: "Locations", icon: <Globe className="w-8 h-8 text-purple-500" /> },
    { number: "50K+", label: "Happy Customers", icon: <Users className="w-8 h-8 text-purple-500" /> },
    { number: "15+", label: "Years Experience", icon: <Trophy className="w-8 h-8 text-purple-500" /> },
    { number: "99%", label: "Success Rate", icon: <Target className="w-8 h-8 text-purple-500" /> },
  ];

  const team = [
    {
      name: "Mamidala Mani",
      role: "CEO & Founder",
      image: "/photos/mm.jpg",
    },
    {
      name: "Bhavana V",
      role: "Operations Director",
      image: "/photos/b.jpg",
    },
    {
      name: "Manish",
      role: "Technical Lead",
      image: "/photos/mp.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6 md:p-12">
      {/* Hero Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600 mb-6">
          About Roadside Assist
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Your trusted partner in roadside assistance for over 15 years
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {stats.map((stat, index) => (
          <div key={index} className="p-6 rounded-xl bg-white/10 backdrop-blur-lg text-center hover:scale-105 transition-transform">
            <div className="flex flex-col items-center">
              {stat.icon}
              <span className="text-4xl font-bold mt-2">{stat.number}</span>
              <span className="text-gray-400">{stat.label}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Mission Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="text-center max-w-4xl mx-auto mt-20">
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-gray-300">
          At Roadside Assist, we're committed to providing reliable, fast, and professional roadside assistance services.
          Our mission is to ensure no one is left stranded, offering peace of mind to travelers nationwide.
        </p>
      </motion.div>

      {/* Team Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        className="max-w-7xl mx-auto mt-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <div key={index} className="p-6 rounded-xl bg-white/10 backdrop-blur-lg text-center hover:scale-105 transition-transform">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover shadow-lg"
                  sizes="(max-width: 128px) 100vw, 128px"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Values Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        className="max-w-4xl mx-auto mt-20">
        <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[{ title: "Reliability", description: "We're there when you need us, 24/7, rain or shine." },
            { title: "Professionalism", description: "Our team is trained to handle any situation with expertise." },
            { title: "Speed", description: "Quick response times to get you back on the road." },
            { title: "Customer First", description: "Your safety and satisfaction are our top priorities." }]
            .map((value, index) => (
              <div key={index} className="p-6 rounded-xl bg-white/10 backdrop-blur-lg text-center hover:scale-105 transition-transform">
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 mt-20">
        <p>&copy; {new Date().getFullYear()} Roadside Assist. All rights reserved.</p>
      </footer>
    </div>
  );
}