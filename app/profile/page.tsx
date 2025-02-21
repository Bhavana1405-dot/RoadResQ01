'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'next/navigation';
import {
  User,
  Phone,
  MapPin,
  Car,
  AlertCircle,
  Shield,
  Activity,
  Clock,
  FileText,
  Bell,
  Settings,
  Heart,
  Loader
} from 'lucide-react';

interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

interface VehicleInfo {
  make: string;
  model: string;
  year: string;
  color: string;
  plate: string;
}

interface MedicalInfo {
  bloodType: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
}

export default function Profile() {
  const router = useRouter();
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState('personal');

  // Redirect if not authenticated
  useEffect(() => {
    if (!auth?.user) {
      router.replace('/about/Login');
    }
  }, [auth?.user, router]);

  // Show loading state while checking auth
  if (!auth?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader className="w-6 h-6 text-purple-500" />
        </motion.div>
      </div>
    );
  }

  const [profile, setProfile] = useState({
    personal: {
      name: auth.user.displayName || 'User',
      email: auth.user.email || '',
      phone: '+1 (555) 123-4567',
      address: '123 Emergency Ave, Safety City, SC 12345',
      memberSince: '2023',
      responseTime: '4.2',
      successRate: '98%',
    },
    emergency: {
      contacts: [
        {
          name: 'Jane Doe',
          relation: 'Spouse',
          phone: '+1 (555) 987-6543',
        },
        {
          name: 'Robert Smith',
          relation: 'Family Doctor',
          phone: '+1 (555) 456-7890',
        },
      ] as EmergencyContact[],
    },
    vehicles: [
      {
        make: 'Toyota',
        model: 'Camry',
        year: '2022',
        color: 'Silver',
        plate: 'ABC-1234',
      },
    ] as VehicleInfo[],
    medical: {
      bloodType: 'O+',
      allergies: ['Penicillin', 'Peanuts'],
      medications: ['Insulin'],
      conditions: ['Type 2 Diabetes'],
    } as MedicalInfo,
    preferences: {
      notifications: true,
      locationSharing: true,
      autoAlert: true,
      dataSharing: false,
    },
  });

  const tabContent = {
    personal: (
      <div className="space-y-6">
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white text-3xl">
              {profile.personal.name.charAt(0)}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="text-2xl font-bold">{profile.personal.name}</h3>
            <p className="text-gray-400">Premium Member</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            icon={<User className="w-5 h-5 text-purple-500" />}
            title="Contact Information"
            items={[
              { label: 'Email', value: profile.personal.email },
              { label: 'Phone', value: profile.personal.phone },
              { label: 'Address', value: profile.personal.address },
            ]}
          />

          <InfoCard
            icon={<Activity className="w-5 h-5 text-purple-500" />}
            title="Performance Metrics"
            items={[
              { label: 'Member Since', value: profile.personal.memberSince },
              { label: 'Avg. Response Time', value: profile.personal.responseTime + ' minutes' },
              { label: 'Success Rate', value: profile.personal.successRate },
            ]}
          />
        </div>
      </div>
    ),
    emergency: (
      <div className="space-y-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            Emergency Contacts
          </h3>
          <div className="space-y-4">
            {profile.emergency.contacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-gray-400">{contact.relation}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <p className="text-purple-400">{contact.phone}</p>
                  <button className="p-2 hover:bg-purple-500/20 rounded-full transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    vehicles: (
      <div className="space-y-6">
        {profile.vehicles.map((vehicle, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold flex items-center">
                <Car className="w-5 h-5 text-purple-500 mr-2" />
                Vehicle Information
              </h3>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                Primary
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-400">Make</p>
                <p className="font-medium">{vehicle.make}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Model</p>
                <p className="font-medium">{vehicle.model}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Year</p>
                <p className="font-medium">{vehicle.year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Color</p>
                <p className="font-medium">{vehicle.color}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">License Plate</p>
                <p className="font-medium">{vehicle.plate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    medical: (
      <div className="space-y-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Heart className="w-5 h-5 text-red-500 mr-2" />
            Medical Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-2">Blood Type</p>
              <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg inline-block">
                {profile.medical.bloodType}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Allergies</p>
              <div className="flex flex-wrap gap-2">
                {profile.medical.allergies.map((allergy, index) => (
                  <span key={index} className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Medications</p>
              <div className="flex flex-wrap gap-2">
                {profile.medical.medications.map((medication, index) => (
                  <span key={index} className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                    {medication}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Medical Conditions</p>
              <div className="flex flex-wrap gap-2">
                {profile.medical.conditions.map((condition, index) => (
                  <span key={index} className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    preferences: (
      <div className="space-y-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <Settings className="w-5 h-5 text-purple-500 mr-2" />
            System Preferences
          </h3>
          <div className="space-y-4">
            {Object.entries(profile.preferences).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div>
                  <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p className="text-sm text-gray-400">
                    {getPreferenceDescription(key)}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handlePreferenceChange(key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  };

  function getPreferenceDescription(key: string) {
    const descriptions: { [key: string]: string } = {
      notifications: 'Receive alerts and updates about emergency services',
      locationSharing: 'Share your location with emergency responders',
      autoAlert: 'Automatically alert emergency contacts in critical situations',
      dataSharing: 'Share anonymous data to improve emergency response times',
    };
    return descriptions[key] || '';
  }

  function handlePreferenceChange(key: string) {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: !prev.preferences[key as keyof typeof prev.preferences],
      },
    }));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Profile Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          {['personal', 'emergency', 'vehicles', 'medical', 'preferences'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl backdrop-blur-lg transition-all ${
                activeTab === tab
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <span className="capitalize">{tab}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tabContent[activeTab as keyof typeof tabContent]}
        </motion.div>
      </motion.div>
    </div>
  );
}

function InfoCard({ icon, title, items }: { icon: React.ReactNode; title: string; items: { label: string; value: string }[] }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index}>
            <p className="text-sm text-gray-400">{item.label}</p>
            <p className="font-medium">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}