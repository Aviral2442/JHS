import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  Clock as ClockIcon, 
  XCircle, 
  Star,
  Phone,
  Mail,
  Download,
  FileText,
  CreditCard,
  Home,
  Wrench,
  MessageSquare,
  Share2,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Types for TypeScript
interface ServiceProvider {
  id: string;
  name: string;
  rating: number;
  avatar: string;
  phone: string;
  email: string;
  experience: string;
  completedJobs: number;
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
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  createdAt: string;
  scheduledDate: string;
  estimatedCompletion: string;
  specialInstructions: string;
}

interface TrackingStep {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
  time?: string;
}

const OrderDetailPage: React.FC = () => {
  // Sample order data
  const [order, _setOrder] = useState<Order>({
    id: 'ORD-001',
    serviceName: 'Plumbing Repair & Faucet Installation',
    serviceProvider: {
      id: 'SP-001',
      name: 'John Plumbing Co.',
      rating: 4.8,
      avatar: 'https://i.pravatar.cc/150?img=1',
      phone: '+1 (555) 123-4567',
      email: 'john@plumbingco.com',
      experience: '12 years',
      completedJobs: 1247
    },
    date: '2023-10-15',
    time: '10:00 AM',
    duration: '2 hours',
    price: 120,
    status: 'in-progress',
    address: '123 Main St, Apt 4B, New York, NY 10001',
    description: 'Fix leaking kitchen faucet and install new shower head with pressure balancing valve. Includes inspection of all plumbing fixtures for potential issues.',
    serviceType: 'plumbing',
    paymentMethod: 'Visa **** 4321',
    paymentStatus: 'paid',
    subtotal: 100,
    tax: 8.50,
    discount: 10,
    total: 98.50,
    createdAt: '2023-10-10',
    scheduledDate: '2023-10-15',
    estimatedCompletion: '2023-10-15 12:00 PM',
    specialInstructions: 'Please ring doorbell twice. Leave service report on kitchen counter. Pet cat in the house - please keep doors closed.'
  });

  const [showInvoice, setShowInvoice] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);

  // Tracking steps based on order status
  const getTrackingSteps = (): TrackingStep[] => {
    const baseSteps = [
      { id: 1, title: 'Order Placed', description: 'Your service request has been received', status: 'completed' as const, date: '2023-10-10', time: '9:30 AM' },
      { id: 2, title: 'Confirmed', description: 'Service provider has accepted your booking', status: 'completed' as const, date: '2023-10-10', time: '11:45 AM' },
      { id: 3, title: 'Scheduled', description: 'Service date and time confirmed', status: 'completed' as const, date: '2023-10-11', time: '2:15 PM' },
    ];

    switch (order.status) {
      case 'upcoming':
        return [
          ...baseSteps,
          { id: 4, title: 'En Route', description: 'Service provider is on the way', status: 'pending' as const },
          { id: 5, title: 'Service Started', description: 'Service work has begun', status: 'pending' as const },
          { id: 6, title: 'Completed', description: 'Service has been completed', status: 'pending' as const }
        ];
      
      case 'in-progress':
        return [
          ...baseSteps,
          { id: 4, title: 'En Route', description: 'Service provider is on the way', status: 'completed' as const, date: '2023-10-15', time: '9:45 AM' },
          { id: 5, title: 'Service Started', description: 'Service work has begun', status: 'current' as const, date: '2023-10-15', time: '10:15 AM' },
          { id: 6, title: 'Completed', description: 'Service has been completed', status: 'pending' as const }
        ];
      
      case 'completed':
        return [
          ...baseSteps,
          { id: 4, title: 'En Route', description: 'Service provider is on the way', status: 'completed' as const, date: '2023-10-15', time: '9:45 AM' },
          { id: 5, title: 'Service Started', description: 'Service work has begun', status: 'completed' as const, date: '2023-10-15', time: '10:15 AM' },
          { id: 6, title: 'Completed', description: 'Service has been completed', status: 'completed' as const, date: '2023-10-15', time: '11:45 AM' }
        ];
      
      case 'cancelled':
        return [
          ...baseSteps,
          { id: 4, title: 'Cancelled', description: 'Order has been cancelled', status: 'current' as const, date: '2023-10-12', time: '3:30 PM' }
        ];
      
      default:
        return baseSteps;
    }
  };

  const [trackingSteps] = useState<TrackingStep[]>(getTrackingSteps());

  // Get status badge color
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'upcoming':
        return 'text-white';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'text-gray-800';
    }
  };

  // Get payment status color
  const getPaymentStatusColor = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'text-white';
      default:
        return 'text-gray-800';
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Download invoice as PDF (simulated)
  const downloadInvoice = () => {
    setShowInvoice(true);
    setTimeout(() => {
      const invoiceContent = invoiceRef.current;
      if (invoiceContent) {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <title>Invoice - ${order.id}</title>
                <style>
                  body { font-family: Arial, sans-serif; padding: 20px; }
                  .invoice-header { border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
                  .invoice-details { margin: 30px 0; }
                  .invoice-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                  .invoice-table th, .invoice-table td { padding: 12px; border: 1px solid #ddd; }
                  .invoice-table th { background-color: #f5f5f5; }
                  .text-right { text-align: right; }
                  .total-section { margin-top: 30px; font-size: 1.2em; }
                  .status-badge { padding: 4px 12px; border-radius: 20px; font-size: 0.9em; }
                </style>
              </head>
              <body>
                ${invoiceContent.innerHTML}
              </body>
            </html>
          `);
          printWindow.document.close();
          printWindow.focus();
          printWindow.print();
          printWindow.close();
        }
      }
      setShowInvoice(false);
    }, 100);
  };

  // Share order details
  const shareOrder = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Order ${order.id} - ${order.serviceName}`,
          text: `Check out my service order details for ${order.serviceName}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Action buttons based on status
  const renderActionButtons = () => {
    switch (order.status) {
      case 'upcoming':
        return (
          <div className="flex flex-wrap gap-3">
            <button className="px-5 py-2.5 text-white font-medium rounded-lg flex items-center gap-2" style={{ backgroundColor: 'var(--sky-blue)' }}>
              <MessageSquare className="h-4 w-4" />
              Message Provider
            </button>
            <button className="px-5 py-2.5 bg-white border border-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Reschedule
            </button>
            <button className="px-5 py-2.5 bg-red-50 text-red-700 border border-red-200 font-medium rounded-lg hover:bg-red-100 flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Cancel Order
            </button>
          </div>
        );
      
      case 'in-progress':
        return (
          <div className="flex flex-wrap gap-3">
            <button className="px-5 py-2.5 text-white font-medium rounded-lg flex items-center gap-2" style={{ backgroundColor: 'var(--sky-blue)' }}>
              <Phone className="h-4 w-4" />
              Call Provider
            </button>
            <button className="px-5 py-2.5 bg-white border border-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Live Chat
            </button>
          </div>
        );
      
      case 'completed':
        return (
          <div className="flex flex-wrap gap-3">
            <button className="px-5 py-2.5 text-white font-medium rounded-lg flex items-center gap-2" style={{ backgroundColor: 'var(--sky-blue)' }}>
              <Star className="h-4 w-4" />
              Rate Service
            </button>
            <button className="px-5 py-2.5 bg-white border font-medium rounded-lg flex items-center gap-2" style={{ borderColor: 'var(--sky-blue)', color: 'var(--sky-blue)' }}>
              <Wrench className="h-4 w-4" />
              Book Again
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: 'var(--background-alt)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Link to="/orders" className="flex items-center" style={{ color: 'var(--gray-color)' }}>
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Orders
              </Link>
              <div className="hidden md:block h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--black-color)' }}>Order Details</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={shareOrder}
                className="px-4 py-2 bg-white border rounded-lg flex items-center gap-2"
                style={{ borderColor: 'var(--gray-color)', color: 'var(--gray-color)' }}
              >
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button
                onClick={downloadInvoice}
                className="px-4 py-2 text-white rounded-lg flex items-center gap-2"
                style={{ backgroundColor: 'var(--sky-blue)' }}
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Download Invoice</span>
              </button>
            </div>
          </div>
          
          {/* Order Summary Header */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(order.status)}`}>
                    {order.status === 'upcoming' || order.status === 'in-progress' ? 
                      <ClockIcon className="h-4 w-4 mr-1" /> : 
                      order.status === 'completed' ? 
                      <CheckCircle className="h-4 w-4 mr-1" /> : 
                      <XCircle className="h-4 w-4 mr-1" />
                    }
                    <span className="capitalize">{order.status.replace('-', ' ')}</span>
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </span>
                </div>
                <h2 className="text-xl font-bold" style={{ color: 'var(--black-color)' }}>{order.serviceName}</h2>
                <p className="mt-1" style={{ color: 'var(--gray-color)' }}>Order ID: {order.id} • Created on {formatDate(order.createdAt)}</p>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-bold" style={{ color: 'var(--black-color)' }}>{formatCurrency(order.total)}</p>
                <p className="text-sm" style={{ color: 'var(--gray-color)' }}>Total amount</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Tracking & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Tracking */}
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold" style={{ color: 'var(--black-color)' }}>Order Tracking</h3>
                <div className="flex items-center text-sm" style={{ color: 'var(--gray-color)' }}>
                  <Clock className="h-4 w-4 mr-1" />
                  Estimated completion: {order.estimatedCompletion}
                </div>
              </div>
              
              {/* Tracking Steps */}
              <div className="relative">
                {/* Connection Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="space-y-8">
                  {trackingSteps.map((step) => (
                    <div key={step.id} className="relative flex items-start">
                      {/* Status Indicator */}
                      <div className={`z-10 shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                        ${step.status === 'completed' ? 'bg-green-500' : 
                          step.status === 'current' ? '' : 'bg-gray-300'}`}
                        style={step.status === 'current' ? { backgroundColor: 'var(--sky-blue)' } : {}}>
                        {step.status === 'completed' ? (
                          <CheckCircle className="h-6 w-6 text-white" />
                        ) : step.status === 'current' ? (
                          <ClockIcon className="h-6 w-6 text-white" />
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                        )}
                      </div>
                      
                      {/* Step Content */}
                      <div className="ml-6 flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                          <div>
                            <h4 className="font-medium" style={{ color: 'var(--black-color)' }}>{step.title}</h4>
                            <p className="text-sm mt-1" style={{ color: 'var(--gray-color)' }}>{step.description}</p>
                          </div>
                          {step.date && (
                            <div className="mt-2 sm:mt-0 text-sm" style={{ color: 'var(--gray-color)' }}>
                              {step.date} • {step.time}
                            </div>
                          )}
                        </div>
                        
                        {/* Additional info for current step */}
                        {step.status === 'current' && order.status === 'in-progress' && (
                          <div className="mt-4 p-4 rounded-lg border" style={{ backgroundColor: 'rgba(0,173,181,0.1)', borderColor: 'rgba(0,173,181,0.2)' }}>
                            <div className="flex items-start">
                              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 shrink-0" style={{ color: 'var(--sky-blue)' }} />
                              <div>
                                <p className="font-medium" style={{ color: 'var(--black-color)' }}>Service in Progress</p>
                                <p className="text-sm mt-1" style={{ color: 'var(--gray-color)' }}>
                                  Your service provider is currently working on the job. 
                                  Estimated completion: <span className="font-medium">{order.estimatedCompletion}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
              <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--black-color)' }}>Service Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3" style={{ color: 'var(--gray-color)' }}>Schedule & Location</h4>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-3 mt-0.5 shrink-0" style={{ color: 'var(--gray-color)' }} />
                      <div>
                        <p className="font-medium" style={{ color: 'var(--black-color)' }}>Service Date</p>
                        <p style={{ color: 'var(--gray-color)' }}>{formatDate(order.scheduledDate)}</p>
                        <p style={{ color: 'var(--gray-color)' }}>{order.time} • {order.duration}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-3 mt-0.5 shrink-0" style={{ color: 'var(--gray-color)' }} />
                      <div>
                        <p className="font-medium" style={{ color: 'var(--black-color)' }}>Service Address</p>
                        <p style={{ color: 'var(--gray-color)' }}>{order.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Home className="h-5 w-5 mr-3 mt-0.5 shrink-0" style={{ color: 'var(--gray-color)' }} />
                      <div>
                        <p className="font-medium" style={{ color: 'var(--black-color)' }}>Service Type</p>
                        <p className="capitalize" style={{ color: 'var(--gray-color)' }}>{order.serviceType}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3" style={{ color: 'var(--gray-color)' }}>Service Description</h4>
                  <p className="mb-4" style={{ color: 'var(--gray-color)' }}>{order.description}</p>
                  
                  {order.specialInstructions && (
                    <div>
                      <h5 className="font-medium mb-2" style={{ color: 'var(--gray-color)' }}>Special Instructions</h5>
                      <div className="p-4 rounded-lg border border-gray-200" style={{ backgroundColor: 'var(--background-alt)' }}>
                        <p className="italic" style={{ color: 'var(--gray-color)' }}>{order.specialInstructions}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--black-color)' }}>Order Actions</h3>
              {renderActionButtons()}
            </div>
          </div>

          {/* Right Column - Service Provider & Invoice */}
          <div className="space-y-6">
            {/* Service Provider Card */}
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
              <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--black-color)' }}>Service Provider</h3>
              
              <div className="flex flex-col items-center text-center mb-6">
                <img 
                  src={order.serviceProvider.avatar} 
                  alt={order.serviceProvider.name}
                  className="h-24 w-24 rounded-full object-cover border-4 border-gray-100 mb-4"
                />
                <h4 className="font-bold text-xl" style={{ color: 'var(--black-color)' }}>{order.serviceProvider.name}</h4>
                <div className="flex items-center mt-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="ml-1 font-medium" style={{ color: 'var(--gray-color)' }}>{order.serviceProvider.rating}</span>
                  <span className="mx-2" style={{ color: 'var(--gray-color)' }}>•</span>
                  <span style={{ color: 'var(--gray-color)' }}>{order.serviceProvider.completedJobs} jobs</span>
                </div>
                <p className="mt-2" style={{ color: 'var(--gray-color)' }}>{order.serviceProvider.experience} experience</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3" style={{ color: 'var(--gray-color)' }} />
                  <span style={{ color: 'var(--gray-color)' }}>{order.serviceProvider.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3" style={{ color: 'var(--gray-color)' }} />
                  <span style={{ color: 'var(--gray-color)' }}>{order.serviceProvider.email}</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full py-2.5 text-white font-medium rounded-lg flex items-center justify-center gap-2" style={{ backgroundColor: 'var(--sky-blue)' }}>
                  <MessageSquare className="h-4 w-4" />
                  Contact Provider
                </button>
              </div>
            </div>

            {/* Invoice Summary */}
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold" style={{ color: 'var(--black-color)' }}>Invoice Summary</h3>
                <button
                  onClick={downloadInvoice}
                  className="flex items-center gap-2" style={{ color: 'var(--sky-blue)' }}
                >
                  <FileText className="h-4 w-4" />
                  View Full
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--gray-color)' }}>Subtotal</span>
                  <span className="font-medium">{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--gray-color)' }}>Tax</span>
                  <span className="font-medium">{formatCurrency(order.tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--gray-color)' }}>Discount</span>
                  <span className="font-medium text-green-600">-{formatCurrency(order.discount)}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between">
                  <span className="font-semibold" style={{ color: 'var(--black-color)' }}>Total</span>
                  <span className="text-xl font-bold" style={{ color: 'var(--black-color)' }}>{formatCurrency(order.total)}</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <span style={{ color: 'var(--gray-color)' }}>Payment Method</span>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" style={{ color: 'var(--gray-color)' }} />
                    <span className="font-medium">{order.paymentMethod}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--gray-color)' }}>Payment Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Need Help Section */}
            <div className="rounded-xl p-5 border" style={{ backgroundColor: 'var(--background-alt)', borderColor: 'var(--gray-color)' }}>
              <h3 className="font-semibold mb-3" style={{ color: 'var(--black-color)' }}>Need Help?</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--gray-color)' }}>
                Our customer support team is available 24/7 to assist you with any questions or concerns.
              </p>
              <div className="space-y-3">
                <button className="w-full py-2.5 bg-white border rounded-lg flex items-center justify-center gap-2" style={{ borderColor: 'var(--sky-blue)', color: 'var(--sky-blue)' }}>
                  <MessageSquare className="h-4 w-4" />
                  Live Chat Support
                </button>
                <button className="w-full py-2.5 text-white rounded-lg flex items-center justify-center gap-2" style={{ backgroundColor: 'var(--sky-blue)' }}>
                  <Phone className="h-4 w-4" />
                  Call Support: 1-800-SERVICE
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden Invoice for Download */}
        <div ref={invoiceRef} className={`fixed inset-0 z-50 bg-white p-8 overflow-auto ${showInvoice ? 'block' : 'hidden'}`}>
          <div className="max-w-4xl mx-auto">
            {/* Invoice Header */}
            <div className="invoice-header">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
                  <p className="text-gray-600 mt-2">HomeService Pro</p>
                  <p className="text-gray-600">123 Service Street, Business City, BC 12345</p>
                  <p className="text-gray-600">contact@homeservicepro.com • (555) 123-4567</p>
                </div>
                <div className="text-right">
                  <div className={`px-4 py-2 rounded-full inline-block ${getStatusColor(order.status)}`}>
                    <span className="font-medium capitalize">{order.status.replace('-', ' ')}</span>
                  </div>
                  <p className="text-gray-600 mt-4">Invoice #: {order.id}</p>
                  <p className="text-gray-600">Date: {formatDate(new Date().toISOString())}</p>
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="invoice-details grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Bill To</h3>
                <p className="text-gray-600">Customer Name</p>
                <p className="text-gray-600">123 Customer Address</p>
                <p className="text-gray-600">City, State ZIP</p>
                <p className="text-gray-600">customer@email.com</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Service Provider</h3>
                <p className="text-gray-600">{order.serviceProvider.name}</p>
                <p className="text-gray-600">{order.serviceProvider.phone}</p>
                <p className="text-gray-600">{order.serviceProvider.email}</p>
              </div>
            </div>

            {/* Service Details */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-800 mb-4">Service Details</h3>
              <table className="invoice-table">
                <thead>
                  <tr>
                    <th className="text-left">Description</th>
                    <th className="text-left">Date</th>
                    <th className="text-left">Duration</th>
                    <th className="text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div>
                        <p className="font-medium">{order.serviceName}</p>
                        <p className="text-gray-600 text-sm">{order.description}</p>
                      </div>
                    </td>
                    <td>{formatDate(order.date)}</td>
                    <td>{order.duration}</td>
                    <td className="text-right">{formatCurrency(order.subtotal)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Payment Summary */}
            <div className="total-section">
              <div className="flex justify-end">
                <div className="w-64">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>{formatCurrency(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tax:</span>
                    <span>{formatCurrency(order.tax)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Discount:</span>
                    <span className="text-green-600">-{formatCurrency(order.discount)}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-300 text-lg font-bold">
                    <span>Total:</span>
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Status */}
            <div className="mt-12">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Payment Status</h3>
                  <span className={`px-4 py-2 rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </span>
                  <p className="text-gray-600 mt-2">Payment Method: {order.paymentMethod}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">Thank you for your business!</p>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Authorized Signature</p>
                    <div className="mt-8 border-t border-gray-300 pt-4 w-48 ml-auto"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-300 text-center text-gray-600 text-sm">
              <p>If you have any questions about this invoice, please contact</p>
              <p>support@homeservicepro.com or call (555) 123-4567</p>
              <p className="mt-4">Terms: Payment due within 30 days of invoice date.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;