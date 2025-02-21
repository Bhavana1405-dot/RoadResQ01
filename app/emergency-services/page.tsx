'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Loader, ArrowLeft } from 'lucide-react';
import { supabase } from '@/src/supabase';
import Link from 'next/link';

interface EmergencyContact {
  id: number;
  name: string;
  phone: string;
  description: string;
  type: string;
}

// Sample emergency contacts data
const sampleContacts: EmergencyContact[] = [
  {
    id: 1,
    name: 'Emergency Ambulance',
    phone: '911',
    description: 'For medical emergencies and immediate assistance',
    type: 'ambulance'
  },
  {
    id: 2,
    name: 'Police Emergency',
    phone: '911',
    description: 'For law enforcement and emergency situations',
    type: 'police'
  },
  {
    id: 3,
    name: 'Fire Department',
    phone: '911',
    description: 'For fire emergencies and rescue operations',
    type: 'fire'
  },
  {
    id: 4,
    name: 'Roadside Assistance',
    phone: '1-800-AAA-HELP',
    description: '24/7 vehicle breakdown and towing service',
    type: 'roadside'
  },
  {
    id: 5,
    name: 'Poison Control',
    phone: '1-800-222-1222',
    description: 'For poison-related emergencies and information',
    type: 'medical'
  }
];

export default function EmergencyServicesPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);

  useEffect(() => {
    fetchEmergencyContacts();
  }, []);

  const fetchEmergencyContacts = async () => {
    try {
      setLoading(true);
      
      // Try to fetch from Supabase
      const { data, error } = await supabase
        .from('emergency_contacts')
        .select('*')
        .order('type');

      if (error) {
        if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
          // If table doesn't exist, use sample data
          console.log('Using sample emergency contacts data');
          setContacts(sampleContacts);
          return;
        }
        throw error;
      }

      setContacts(data || sampleContacts);
    } catch (err: any) {
      console.error('Error details:', err);
      // If there's any error, fallback to sample data
      console.log('Falling back to sample emergency contacts data');
      setContacts(sampleContacts);
    } finally {
      setLoading(false);
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'ambulance':
        return 'text-red-500 bg-red-500/20';
      case 'police':
        return 'text-blue-500 bg-blue-500/20';
      case 'fire':
        return 'text-orange-500 bg-orange-500/20';
      case 'roadside':
        return 'text-yellow-500 bg-yellow-500/20';
      default:
        return 'text-purple-500 bg-purple-500/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader className="w-8 h-8 text-purple-500" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link 
            href="/"
            className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8"
        >
          Emergency Services
        </motion.h1>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contacts.map((contact) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${getIconColor(contact.type)}`}>
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{contact.name}</h3>
                  <p className="text-gray-400">{contact.description}</p>
                </div>
              </div>
              <a
                href={`tel:${contact.phone}`}
                className="mt-4 w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>{contact.phone}</span>
              </a>
            </motion.div>
          ))}
        </div>

        {contacts.length === 0 && !loading && !error && (
          <div className="text-center text-gray-400 mt-8">
            No emergency contacts available at the moment.
          </div>
        )}
      </div>
    </div>
  );
}
