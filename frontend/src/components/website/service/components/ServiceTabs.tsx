// components/ServiceTabs.tsx
import React from 'react';
import { Service } from '../../../../types/service.types';

interface ServiceTabsProps {
  services: Service[];
  selectedService: string | null;
  onSelectService: (serviceId: string | null) => void;
}

const ServiceTabs: React.FC<ServiceTabsProps> = ({
  services,
  selectedService,
  onSelectService,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="flex flex-wrap gap-2">
        {/* All Services Tab */}
        <button
          onClick={() => onSelectService(null)}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
            !selectedService
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span className="font-medium">All Services</span>
        </button>

        {/* Service Tabs */}
        {services.map(service => (
          <button
            key={service.id}
            onClick={() => onSelectService(service.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
              selectedService === service.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {/* Service Icon - You can add actual icons based on service */}
            <div className={`p-1 rounded ${
              selectedService === service.id ? 'bg-white/20' : 'bg-blue-100'
            }`}>
              {service.slug === 'painting' && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" />
                </svg>
              )}
              {service.slug === 'cleaning' && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              )}
            </div>
            <span className="font-medium">{service.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceTabs;