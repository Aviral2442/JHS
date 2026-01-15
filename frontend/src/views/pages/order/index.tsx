import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  Clock as ClockIcon, 
  XCircle, 
  Filter, 
  Search, 
  DollarSign,
  Star,
  User
} from 'lucide-react';

// Types for TypeScript
interface ServiceProvider {
  id: string;
  name: string;
  rating: number;
  avatar: string;
}

interface Order {
  id: string;
  serviceName: string;
  serviceProvider: ServiceProvider;
  date: string;
  time: string;
  duration: string;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled' | 'in-progress';
  address: string;
  description: string;
  serviceType: string;
}

const AllOrdersPage: React.FC = () => {
  // State management
  const [orders, _setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      serviceName: 'Plumbing Repair',
      serviceProvider: {
        id: 'SP-001',
        name: 'John Plumbing Co.',
        rating: 4.8,
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      date: '2023-10-15',
      time: '10:00 AM',
      duration: '2 hours',
      price: 120,
      status: 'completed',
      address: '123 Main St, Apt 4B, New York, NY',
      description: 'Fix leaking kitchen faucet and install new shower head',
      serviceType: 'plumbing'
    },
    {
      id: 'ORD-002',
      serviceName: 'Home Cleaning',
      serviceProvider: {
        id: 'SP-002',
        name: 'CleanPro Services',
        rating: 4.5,
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      date: '2023-10-20',
      time: '2:00 PM',
      duration: '3 hours',
      price: 95,
      status: 'upcoming',
      address: '456 Oak Ave, Los Angeles, CA',
      description: 'Deep cleaning of entire house including kitchen and bathrooms',
      serviceType: 'cleaning'
    },
    {
      id: 'ORD-003',
      serviceName: 'Electrical Wiring',
      serviceProvider: {
        id: 'SP-003',
        name: 'Safe Electric Inc.',
        rating: 4.9,
        avatar: 'https://i.pravatar.cc/150?img=8'
      },
      date: '2023-10-10',
      time: '9:00 AM',
      duration: '4 hours',
      price: 250,
      status: 'in-progress',
      address: '789 Pine Rd, Chicago, IL',
      description: 'Install new electrical outlets in living room and bedroom',
      serviceType: 'electrical'
    },
    {
      id: 'ORD-004',
      serviceName: 'AC Maintenance',
      serviceProvider: {
        id: 'SP-004',
        name: 'CoolAir Solutions',
        rating: 4.7,
        avatar: 'https://i.pravatar.cc/150?img=11'
      },
      date: '2023-10-05',
      time: '11:00 AM',
      duration: '1.5 hours',
      price: 80,
      status: 'cancelled',
      address: '321 Elm St, Miami, FL',
      description: 'Seasonal maintenance and filter replacement',
      serviceType: 'hvac'
    },
    {
      id: 'ORD-005',
      serviceName: 'Carpet Cleaning',
      serviceProvider: {
        id: 'SP-005',
        name: 'Fresh Carpets Ltd.',
        rating: 4.6,
        avatar: 'https://i.pravatar.cc/150?img=15'
      },
      date: '2023-10-25',
      time: '1:00 PM',
      duration: '2.5 hours',
      price: 150,
      status: 'upcoming',
      address: '654 Maple Dr, Houston, TX',
      description: 'Deep steam cleaning for all carpets in 3-bedroom house',
      serviceType: 'cleaning'
    },
    {
      id: 'ORD-006',
      serviceName: 'Appliance Repair',
      serviceProvider: {
        id: 'SP-006',
        name: 'FixIt Appliances',
        rating: 4.4,
        avatar: 'https://i.pravatar.cc/150?img=20'
      },
      date: '2023-10-12',
      time: '3:00 PM',
      duration: '2 hours',
      price: 110,
      status: 'completed',
      address: '987 Cedar Ln, Phoenix, AZ',
      description: 'Repair dishwasher that is not draining properly',
      serviceType: 'appliance'
    }
  ]);
  
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceTypeFilter, setServiceTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

  // Service type options
  const serviceTypes = [
    'all', 'plumbing', 'cleaning', 'electrical', 'hvac', 'appliance'
  ];

  // Status options
  const statusOptions = [
    { value: 'all', label: 'All Orders', icon: null },
    { value: 'upcoming', label: 'Upcoming', icon: <ClockIcon className="h-4 w-4" /> },
    { value: 'in-progress', label: 'In Progress', icon: <ClockIcon className="h-4 w-4" /> },
    { value: 'completed', label: 'Completed', icon: <CheckCircle className="h-4 w-4" /> },
    { value: 'cancelled', label: 'Cancelled', icon: <XCircle className="h-4 w-4" /> }
  ];

  // Apply filters
  useEffect(() => {
    let result = orders;
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }
    
    // Apply service type filter
    if (serviceTypeFilter !== 'all') {
      result = result.filter(order => order.serviceType === serviceTypeFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        order.serviceName.toLowerCase().includes(query) ||
        order.description.toLowerCase().includes(query) ||
        order.serviceProvider.name.toLowerCase().includes(query)
      );
    }
    
    setFilteredOrders(result);
  }, [statusFilter, serviceTypeFilter, searchQuery, orders]);

  // Get status badge color
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'upcoming':
        return <ClockIcon className="h-4 w-4 mr-1" />;
      case 'in-progress':
        return <ClockIcon className="h-4 w-4 mr-1" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Reset filters
  const resetFilters = () => {
    setStatusFilter('all');
    setServiceTypeFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Orders</h1>
          <p className="text-gray-600 mt-2">View and manage all your service bookings</p>
          
          <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by service name, description, or provider..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filter Toggle Button (Mobile) */}
            <button
              onClick={() => setIsFilterVisible(!isFilterVisible)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>
        </header>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className={`lg:w-1/4 ${isFilterVisible ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                <button 
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Reset all
                </button>
              </div>
              
              {/* Status Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Order Status</h3>
                <div className="space-y-2">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setStatusFilter(option.value)}
                      className={`flex items-center w-full px-3 py-2 text-left rounded-lg transition ${statusFilter === option.value ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {option.icon}
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Service Type Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Service Type</h3>
                <div className="space-y-2">
                  {serviceTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setServiceTypeFilter(type)}
                      className={`flex items-center w-full px-3 py-2 text-left rounded-lg transition ${serviceTypeFilter === type ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <span className="capitalize">{type === 'all' ? 'All Services' : type}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Stats */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-700 mb-3">Order Summary</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Upcoming</p>
                    <p className="text-xl font-bold">{orders.filter(o => o.status === 'upcoming').length}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-xl font-bold">{orders.filter(o => o.status === 'completed').length}</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          
          {/* Main Content */}
          <main className="lg:w-3/4">
            {/* Results Info */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-700">
                Showing <span className="font-semibold">{filteredOrders.length}</span> of <span className="font-semibold">{orders.length}</span> orders
              </p>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">Sort by:</span>
                <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                  <option>Recent</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Date: Earliest</option>
                </select>
              </div>
            </div>
            
            {/* Orders Grid */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-200">
                <p className="text-gray-500 text-lg">No orders found matching your filters.</p>
                <button 
                  onClick={resetFilters}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear filters to see all orders
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    {/* Order Header */}
                    <div className="p-5 border-b border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{order.serviceName}</h3>
                          <p className="text-gray-600 text-sm mt-1">Order ID: {order.id}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status.replace('-', ' ')}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Order Details */}
                    <div className="p-5">
                      {/* Service Provider */}
                      <div className="flex items-center mb-4">
                        <div className="relative">
                          <img 
                            src={order.serviceProvider.avatar} 
                            alt={order.serviceProvider.name}
                            className="h-12 w-12 rounded-full object-cover border-2 border-gray-100"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                            <div className="bg-blue-100 rounded-full p-1">
                              <User className="h-3 w-3 text-blue-600" />
                            </div>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-800">{order.serviceProvider.name}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="ml-1 text-sm text-gray-700">{order.serviceProvider.rating}</span>
                            <span className="mx-1 text-gray-400">•</span>
                            <span className="text-sm text-gray-500 capitalize">{order.serviceType}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{order.description}</p>
                      
                      {/* Details */}
                      <div className="space-y-3 mb-5">
                        <div className="flex items-center text-gray-700">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm">{formatDate(order.date)}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Clock className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm">{order.time} • {order.duration}</span>
                        </div>
                        <div className="flex items-start text-gray-700">
                          <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                          <span className="text-sm line-clamp-2">{order.address}</span>
                        </div>
                      </div>
                      
                      {/* Price and Actions */}
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <div className="flex items-center">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                          <span className="text-xl font-bold text-gray-800">${order.price}</span>
                        </div>
                        <div className="flex gap-2">
                          {order.status === 'upcoming' && (
                            <>
                              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                                Reschedule
                              </button>
                              <button className="px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-200">
                                Cancel
                              </button>
                            </>
                          )}
                          {order.status === 'completed' && (
                            <button className="px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-200">
                              View Details
                            </button>
                          )}
                          {order.status === 'cancelled' && (
                            <button className="px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-200">
                              Book Again
                            </button>
                          )}
                          {order.status === 'in-progress' && (
                            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                              Track Service
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Stats Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-linear-to-r from-blue-500 to-blue-600 rounded-xl p-5 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-blue-100">Total Spent</p>
                    <p className="text-2xl font-bold mt-2">$805</p>
                  </div>
                  <DollarSign className="h-8 w-8 opacity-80" />
                </div>
                <p className="text-blue-100 text-sm mt-3">Across all completed services</p>
              </div>
              
              <div className="bg-linear-to-r from-green-500 to-green-600 rounded-xl p-5 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-green-100">Services Completed</p>
                    <p className="text-2xl font-bold mt-2">{orders.filter(o => o.status === 'completed').length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 opacity-80" />
                </div>
                <p className="text-green-100 text-sm mt-3">Satisfaction rate: 98%</p>
              </div>
              
              <div className="bg-linear-to-r from-purple-500 to-purple-600 rounded-xl p-5 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-purple-100">Upcoming Services</p>
                    <p className="text-2xl font-bold mt-2">{orders.filter(o => o.status === 'upcoming').length}</p>
                  </div>
                  <Calendar className="h-8 w-8 opacity-80" />
                </div>
                <p className="text-purple-100 text-sm mt-3">Next: {formatDate(orders.find(o => o.status === 'upcoming')?.date || '')}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AllOrdersPage;