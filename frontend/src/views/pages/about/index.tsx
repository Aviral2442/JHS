import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Heart, 
  Award, 
  TrendingUp, 
  Shield,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Home,
  Handshake,
  Globe,
  Calendar,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  imageColor: string;
  description: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface Value {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

export default function AboutPage() {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      department: 'Leadership',
      imageColor: 'bg-blue-100',
      description: 'Former home services entrepreneur with 15+ years experience'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'CTO',
      department: 'Technology',
      imageColor: 'bg-indigo-100',
      description: 'Ex-Google engineer passionate about service innovation'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      role: 'Head of Operations',
      department: 'Operations',
      imageColor: 'bg-purple-100',
      description: 'Built and scaled operations for multiple service companies'
    },
    {
      id: 4,
      name: 'David Brown',
      role: 'Head of Quality',
      department: 'Quality Assurance',
      imageColor: 'bg-green-100',
      description: '20 years in home services quality management'
    },
    {
      id: 5,
      name: 'Lisa Rodriguez',
      role: 'Marketing Director',
      department: 'Marketing',
      imageColor: 'bg-pink-100',
      description: 'Digital marketing expert in the home services space'
    },
    {
      id: 6,
      name: 'James Wilson',
      role: 'Customer Success Lead',
      department: 'Customer Service',
      imageColor: 'bg-orange-100',
      description: 'Dedicated to ensuring customer satisfaction'
    }
  ];

  const milestones: Milestone[] = [
    {
      year: '2018',
      title: 'HomeEase Founded',
      description: 'Started with just 5 service professionals in San Francisco'
    },
    {
      year: '2019',
      title: 'Series A Funding',
      description: 'Raised $5M to expand to 3 new cities'
    },
    {
      year: '2020',
      title: 'Tech Platform Launch',
      description: 'Launched our proprietary booking and management platform'
    },
    {
      year: '2021',
      title: 'National Expansion',
      description: 'Expanded to 10 major metropolitan areas'
    },
    {
      year: '2022',
      title: '1M Services Booked',
      description: 'Celebrated serving over 100,000 happy customers'
    },
    {
      year: '2023',
      title: 'Series B & Awards',
      description: 'Raised $20M and won "Best Home Services Platform" award'
    }
  ];

  const values: Value[] = [
    {
      title: 'Customer First',
      description: 'Every decision starts with our customers needs',
      icon: Heart,
      color: 'text-red-500'
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in every service',
      icon: Star,
      color: 'text-yellow-500'
    },
    {
      title: 'Transparency',
      description: 'Clear pricing, no hidden fees',
      icon: Shield,
      color: 'text-blue-500'
    },
    {
      title: 'Innovation',
      description: 'Constantly improving our platform and services',
      icon: Sparkles,
      color: 'text-purple-500'
    }
  ];

  const stats = [
    { label: 'Happy Customers', value: '100K+', icon: Users },
    { label: 'Services Completed', value: '1M+', icon: CheckCircle },
    { label: 'Cities Served', value: '25+', icon: MapPin },
    { label: 'Service Professionals', value: '5K+', icon: Handshake },
    { label: 'Avg. Rating', value: '4.9/5', icon: Star },
    { label: 'Response Time', value: '<2 hrs', icon: Clock }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-blue-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              Our Story Since 2018
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Making Home Services{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                Effortless
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to transform how homeowners find and book trusted 
              professionals for all their home service needs.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl p-8 text-white"
          >
            <div className="flex items-center mb-6">
              <div className="bg-white/20 p-3 rounded-xl mr-4">
                <Target className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold">Our Mission</h2>
            </div>
            <p className="text-lg text-blue-100">
              To simplify home maintenance by connecting homeowners with verified professionals 
              through a seamless, transparent, and reliable platform.
            </p>
            <div className="mt-8 p-4 bg-white/10 rounded-xl">
              <p className="italic">
                "We believe everyone deserves a beautiful, well-maintained home without the stress 
                of finding reliable help."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-gray-100"
          >
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-xl mr-4">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-lg text-gray-700">
              To become the most trusted home services platform globally, revolutionizing 
              how people care for their homes with technology and exceptional service.
            </p>
            <div className="mt-8 flex items-center space-x-2">
              <div className="flex -space-x-2">
                {['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400'].map((color, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-white ${color}`}></div>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                Serving homeowners across 25+ cities and growing
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-50 p-3 rounded-xl">
                  <stat.icon className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Our Story */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              From a small startup to the leading home services platform, here's how we got here.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-200 to-blue-200"></div>

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="w-1/2 px-8">
                  <div className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 ${
                    index % 2 === 0 ? 'text-right' : 'text-left'
                  }`}>
                    <div className="inline-flex items-center bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                      <Calendar className="h-3 w-3 mr-1" />
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-6 h-6 bg-indigo-600 rounded-full border-4 border-white shadow-lg"></div>
                </div>
                
                <div className="w-1/2 px-8">
                  {/* Empty for spacing */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            These core principles guide everything we do at HomeEase.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 mb-6 mx-auto">
                <value.icon className={`h-8 w-8 ${value.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">{value.title}</h3>
              <p className="text-gray-600 text-center">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Users className="h-4 w-4 mr-2" />
              Meet Our Leadership
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Team Behind HomeEase</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              A diverse team of passionate individuals dedicated to making home services better.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className={`w-20 h-20 rounded-2xl ${member.imageColor} flex items-center justify-center mr-4`}>
                      <span className="text-2xl font-bold text-gray-700">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-indigo-600 font-medium">{member.role}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm text-gray-500">{member.department}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">{member.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail className="h-4 w-4 mr-2" />
                    {member.name.toLowerCase().replace(' ', '.')}@homeease.com
                  </div>
                </div>
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <button className="w-full flex items-center justify-center text-indigo-600 hover:text-indigo-800 font-medium group-hover:translate-x-2 transition-transform">
                    Connect on LinkedIn
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Quality Assurance */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-3xl p-12"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-white text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="h-4 w-4 mr-2" />
                Our Quality Promise
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Verified Excellence in Every Service
              </h2>
              <p className="text-gray-700 mb-8">
                Every professional on our platform undergoes rigorous vetting and continuous 
                quality monitoring to ensure you receive the best service possible.
              </p>
              <div className="space-y-4">
                {[
                  'Background checks and license verification',
                  'Comprehensive skills assessment',
                  'Ongoing performance reviews',
                  'Customer feedback monitoring',
                  'Insurance and bonding coverage',
                  'Continuous training programs'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
                    <Award className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Industry Recognition</h3>
                  <p className="text-gray-600">Award-winning service platform</p>
                </div>
                <div className="space-y-6">
                  {[
                    { award: 'Best Home Services Platform 2023', issuer: 'TechHome Awards' },
                    { award: 'Customer Excellence Award', issuer: 'Service Industry Association' },
                    { award: 'Innovation in Service Tech', issuer: 'Digital Transformation Council' }
                  ].map((award, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                        <TrendingUp className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{award.award}</div>
                        <div className="text-sm text-gray-600">{award.issuer}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Thousands of Happy Homeowners
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Experience the HomeEase difference. Book your first service today and see why 
              we're the most trusted home services platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Book a Service
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Contact Our Team
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-2xl mb-6">
            <Home className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Our team is always here to help. Whether you're a homeowner looking for services 
            or a professional wanting to join our platform, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
              <Phone className="h-5 w-5 mr-2" />
              Call Us: (555) 123-4567
            </a>
            <a href="#" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
              <Mail className="h-5 w-5 mr-2" />
              Email: hello@homeease.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}