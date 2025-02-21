'use client';

import { motion } from 'framer-motion';
import { Wrench, Car, Phone, Clock } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Car className="w-12 h-12 text-purple-500" />,
      title: "Breakdown Assistance",
      description: "24/7 emergency roadside assistance for vehicle breakdowns, including battery jumps, flat tire changes, and fuel delivery."
    },
    {
      icon: <Wrench className="w-12 h-12 text-purple-500" />,
      title: "Mobile Repairs",
      description: "On-the-spot mechanical repairs and diagnostics to get you back on the road quickly and safely."
    },
    {
      icon: <Clock className="w-12 h-12 text-purple-500" />,
      title: "Quick Response",
      description: "Fast response times with real-time tracking of our service vehicles to your location."
    },
    {
      icon: <Phone className="w-12 h-12 text-purple-500" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support team ready to assist you with any roadside emergencies."
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>
        <p className="text-lg text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          We provide comprehensive roadside assistance services to keep you safe and get you back on the road.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-lg border border-purple-600/20 backdrop-blur-lg bg-purple-900/10 hover:bg-purple-900/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                {service.icon}
                <h2 className="text-2xl font-semibold mt-4 mb-2">{service.title}</h2>
                <p className="text-gray-300">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Need Assistance?</h2>
          <p className="text-gray-300 mb-8">Our team is ready to help you 24/7</p>
          <button className="px-8 py-3 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-all duration-300">
            Contact Us Now
          </button>
        </motion.div>
      </motion.div>
    </main>
  );
}