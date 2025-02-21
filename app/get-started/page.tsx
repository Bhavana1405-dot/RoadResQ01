'use client';

import { motion } from 'framer-motion';
import { Shield, Car, CreditCard, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GetStarted() {
  const router = useRouter();
  const plans = [
    {
      name: "Basic Coverage",
      price: "9.99",
      features: [
        "24/7 Roadside Assistance",
        "Towing up to 10 miles",
        "Fuel Delivery",
        "Tire Changes",
      ],
      recommended: false
    },
    {
      name: "Premium Coverage",
      price: "19.99",
      features: [
        "All Basic Coverage features",
        "Towing up to 100 miles",
        "Trip Interruption Coverage",
        "Battery Jump-Start",
        "Lockout Service",
        "Rental Car Benefits"
      ],
      recommended: true
    },
    {
      name: "Ultimate Coverage",
      price: "29.99",
      features: [
        "All Premium Coverage features",
        "Unlimited Towing Distance",
        "Emergency Travel Expense",
        "RV and Motorcycle Coverage",
        "Tire Repair Coverage",
        "Enhanced Trip Interruption"
      ],
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center pt-12"
        >
          {/* Add authentication options at the top */}
          <div className="flex justify-center gap-4 mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/login')}
              className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors"
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/dashboard')}
              className="px-6 py-3 rounded-lg border border-purple-600 hover:bg-purple-600/20 text-white font-semibold transition-colors"
            >
              Continue as Guest
            </motion.button>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600 mb-6">
            Choose Your Coverage Plan
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Select the perfect plan for your peace of mind on the road
          </p>
        </motion.div>

        {/* Benefits Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {[
            {
              icon: <Shield className="w-8 h-8 text-purple-500" />,
              title: "Trusted Coverage",
              description: "Backed by industry leaders"
            },
            {
              icon: <Car className="w-8 h-8 text-purple-500" />,
              title: "Nationwide Service",
              description: "Available in 170+ locations"
            },
            {
              icon: <CreditCard className="w-8 h-8 text-purple-500" />,
              title: "Flexible Payments",
              description: "Monthly or annual plans"
            },
            {
              icon: <CheckCircle className="w-8 h-8 text-purple-500" />,
              title: "Easy Claims",
              description: "Quick and hassle-free process"
            }
          ].map((benefit, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg border border-purple-600/20 backdrop-blur-lg bg-purple-900/10"
            >
              <div className="flex flex-col items-center text-center">
                {benefit.icon}
                <h3 className="mt-4 text-xl font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-gray-400">{benefit.description}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Pricing Plans */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative p-6 rounded-lg ${
                plan.recommended 
                  ? 'border-2 border-purple-500 bg-purple-900/20' 
                  : 'border border-purple-600/20 bg-purple-900/10'
              } backdrop-blur-lg`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                    Recommended
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <ul className="space-y-3 text-left mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-2" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-3 rounded-lg transition-all duration-300 ${
                    plan.recommended
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'border border-purple-600 hover:bg-purple-600/20 text-white'
                  }`}
                >
                  Upgrade Now 🚀
                </button>
              </div>
            </div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: "How quickly can I get assistance?",
                answer: "Our average response time is under 30 minutes in most areas. We prioritize your safety and aim to reach you as quickly as possible."
              },
              {
                question: "What vehicles are covered?",
                answer: "We cover most passenger vehicles, including cars, SUVs, and light trucks. Premium and Ultimate plans also cover RVs and motorcycles."
              },
              {
                question: "Can I cancel anytime?",
                answer: "Yes, you can cancel your subscription at any time. We offer a 30-day money-back guarantee for all new memberships."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="p-6 rounded-lg border border-purple-600/20 backdrop-blur-lg bg-purple-900/10"
              >
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <footer className="py-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Insurance Company. All rights reserved.</p>
      </footer>
    </div>
  );
}