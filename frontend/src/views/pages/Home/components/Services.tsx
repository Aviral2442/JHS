import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Paintbrush, Droplet, Zap, Hammer, Leaf, Trash2, Shield } from 'lucide-react';

const services = [
  {
    id: 1,
    name: "Plumbing",
    description: "Professional plumbing repairs and installations",
    icon: Wrench,
  },
  {
    id: 2,
    name: "Painting",
    description: "Interior and exterior painting services",
    icon: Paintbrush,
  },
  {
    id: 3,
    name: "Cleaning",
    description: "Deep cleaning and maintenance services",
    icon: Droplet,
  },
  {
    id: 4,
    name: "Electrical",
    description: "Licensed electrical repair and installation",
    icon: Zap,
  },
  {
    id: 5,
    name: "Carpentry",
    description: "Custom woodwork and furniture repair",
    icon: Hammer,
  },
  {
    id: 6,
    name: "Gardening",
    description: "Lawn care and landscape maintenance",
    icon: Leaf,
  },
  {
    id: 7,
    name: "Waste Removal",
    description: "Junk removal and disposal services",
    icon: Trash2,
  },
  {
    id: 8,
    name: "Security",
    description: "Home security system installation",
    icon: Shield,
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function BentoServicesSection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Services
          </h2>
          <p className="mt-4 text-gray-600">
            Comprehensive home services for every need
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-4"
        >
          {/* Card 1: Discount/Promo Style - Top Left */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-3xl p-6 shadow-md cursor-pointer overflow-hidden relative"
          >
            <div className="mb-2">
              <span className="text-emerald-600 text-xs font-semibold uppercase tracking-wide">
                Special Offer
              </span>
            </div>
            <h3 className="text-4xl font-bold text-emerald-600 mb-4">
              ${services[0].name}
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              {services[0].description}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Service Code</div>
              <div className="font-mono text-xs">||||||||||||||||||||</div>
            </div>
          </motion.div>

          {/* Card 2: Typeface/Typography Style - Top Center */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-8 shadow-lg cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/30 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/30 rounded-full -ml-12 -mb-12"></div>
            <div className="relative z-10">
              <h3 className="text-white text-sm font-medium mb-2 uppercase tracking-wide">
                {services[1].name}
              </h3>
              <div className="text-6xl font-bold text-white mb-4">
                Aa
              </div>
              <div className="flex gap-2">
                <div className="w-12 h-3 bg-emerald-400 rounded"></div>
                <div className="w-12 h-3 bg-white rounded"></div>
                <div className="w-12 h-3 bg-gray-800 rounded"></div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Building/Photo - Top Right (Tall) */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="lg:row-span-2 rounded-3xl shadow-lg cursor-pointer overflow-hidden relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=800&fit=crop" 
              alt="Building"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 bg-white rounded-2xl px-4 py-3 shadow-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              </div>
              <div className="text-xs font-bold mt-2 text-gray-800">
                {services[2].name}
              </div>
            </div>
          </motion.div>

          {/* Card 4: Phone Product - Top Far Right (Tall) */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="lg:row-span-2 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-3xl shadow-lg cursor-pointer overflow-hidden relative p-6"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 bg-emerald-600/30 rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
              <div className="bg-gray-900 rounded-[2rem] p-1 shadow-2xl w-48">
                <div className="bg-black rounded-[1.7rem] overflow-hidden">
                  <div className="bg-emerald-600 h-6 flex items-center justify-center">
                    <div className="w-20 h-1 bg-black rounded-full"></div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="aspect-square bg-emerald-600/20 rounded-xl flex items-center justify-center">
                        <Zap className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div className="aspect-square bg-white/10 rounded-xl"></div>
                      <div className="aspect-square bg-white/10 rounded-xl"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="aspect-square bg-white/10 rounded-xl"></div>
                      <div className="aspect-square bg-white/10 rounded-xl"></div>
                      <div className="aspect-square bg-white/10 rounded-xl"></div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-white text-sm mt-4 font-medium">{services[3].description}</p>
            </div>
          </motion.div>

          {/* Card 5: Phone Screen - Second Row Left */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-emerald-600 rounded-3xl shadow-lg cursor-pointer overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/50 to-transparent"></div>
            <div className="relative p-6 flex items-center justify-center h-full">
              <div className="bg-gray-900 rounded-[1.5rem] w-36 h-full shadow-2xl overflow-hidden">
                <div className="bg-black h-full flex flex-col">
                  <div className="bg-emerald-600 px-3 py-2 flex items-center justify-between text-white text-[8px]">
                    <span>11:52</span>
                    <div className="flex gap-1">
                      <div className="w-3 h-2 border border-white/50 rounded-sm"></div>
                    </div>
                  </div>
                  <div className="flex-1 p-2 grid grid-cols-3 gap-2">
                    <div className="bg-emerald-600/30 rounded-lg flex flex-col items-center justify-center">
                      <Hammer className="w-4 h-4 text-emerald-400 mb-1" />
                      <div className="text-white text-[6px]">{services[4].name}</div>
                    </div>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="bg-white/10 rounded-lg"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 6: Logo Card - Second Row Center */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-3xl p-8 shadow-md cursor-pointer flex flex-col items-center justify-center"
          >
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              {services[5].name}
            </h3>
            <p className="text-gray-600 text-xs mt-2 text-center">
              {services[5].description}
            </p>
          </motion.div>

          {/* Card 7: Presentation Mockup - Third Row Left (Wide) */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="lg:col-span-2 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl p-6 shadow-lg cursor-pointer relative overflow-hidden"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 h-full relative">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-6 h-6">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-sm"></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-sm"></div>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-gray-600">{services[6].name}</div>
              </div>
              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-bold text-gray-900">Comprehensive home services</h4>
                <p className="text-xs text-gray-600">for every need</p>
              </div>
              <div className="absolute right-6 bottom-6 flex gap-2">
                <div className="w-12 h-12 bg-emerald-500 rounded-full"></div>
                <div className="w-8 h-8 bg-white border-4 border-emerald-500 rounded-full -ml-4 mt-2"></div>
              </div>
            </div>
          </motion.div>

          {/* Card 8: Message Card - Third Row Right */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-8 shadow-lg cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/30 rounded-full -mr-12 -mt-12"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-emerald-700/30 rounded-full -ml-10 -mb-10"></div>
            <div className="relative z-10 h-full flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white leading-tight mb-2">
                {services[7].name}
              </h3>
              <p className="text-white/90 text-sm">
                {services[7].description}
              </p>
            </div>
          </motion.div>

          {/* Card 9: Bottle Product - Fourth Row Left */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl shadow-lg cursor-pointer overflow-hidden relative p-6"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/50 to-transparent"></div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="bg-white rounded-3xl w-20 h-32 shadow-2xl flex flex-col items-center justify-between p-3">
                <div className="w-12 h-3 bg-gray-200 rounded-full"></div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="transform -rotate-90 origin-center">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                      </div>
                      <div className="text-[8px] font-bold text-emerald-600">Security</div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-8 bg-gray-100 rounded-lg"></div>
              </div>
            </div>
          </motion.div>

          {/* Card 10: Additional Service Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-3xl p-6 shadow-md cursor-pointer border-2 border-emerald-100"
          >
            <div className="bg-emerald-50 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
              <Wrench className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Professional
            </h3>
            <p className="text-gray-600 text-sm">
              Expert home services delivered with care
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}