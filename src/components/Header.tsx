import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Phone, MapPin, Receipt } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchOrders = async (phone: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders?phone=${encodeURIComponent(phone)}`);
      const data = await res.json();
      setFilteredOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setFilteredOrders([]);
    }
  };

  const handleViewOrders = () => {
    setShowOrders(true);
  };

  const handleFilterOrders = () => {
    if (phoneInput.trim().length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }
    fetchOrders(phoneInput.trim());
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Product', href: '#products' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Top Bar */}
      <div className="bg-orange-600 text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>Free delivery in Pune</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Fresh • Authentic • Traditional</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          {/* Logo on the left */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <img
  src="/src/Authentic India Fresh Foods White.svg"
  alt="Authentic India Fresh Foods Logo"
  className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain"
/>
          </motion.div>

          {/* Centered Navigation */}
          <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors hover:text-orange-500 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.button
              onClick={handleViewOrders}
              className={`text-sm font-medium flex items-center gap-1 px-3 py-1 rounded-md border ${
                isScrolled
                  ? 'bg-white text-orange-600 border-orange-500 hover:bg-orange-50'
                  : 'bg-transparent text-white border-white hover:bg-white hover:text-orange-600'
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Receipt className="w-4 h-4" /> My Orders
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden ml-auto">
            <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="lg:hidden mt-4 bg-white rounded-lg shadow-lg p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-3 text-gray-700 hover:text-orange-500 transition-colors border-b border-gray-100 last:border-b-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="mt-4 space-y-3">
              <a
                href="#products"
                className="block w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-lg font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                View Menu
              </a>
              <button
                onClick={() => {
                  handleViewOrders();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-orange-600 border border-orange-500 rounded-lg py-3 font-medium text-center hover:bg-orange-50"
              >
                <Receipt className="inline w-4 h-4 mr-1" /> My Orders
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* My Orders Panel */}
      {showOrders && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-24 right-6 w-full max-w-lg z-50 rounded-2xl border p-6 shadow-2xl transition-all duration-300 ${
            isScrolled ? 'bg-white border-orange-400' : 'bg-white/90 backdrop-blur-md border-white'
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-orange-600">📦 Your Orders</h3>
            <button
              className="text-red-500 text-sm font-semibold hover:underline"
              onClick={() => setShowOrders(false)}
            >
              Close
            </button>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              onClick={handleFilterOrders}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 text-sm"
            >
              Find
            </button>
          </div>

          {filteredOrders.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">No orders found for this number.</p>
          ) : (
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {filteredOrders.map((order, index) => (
                <div
                  key={index}
                  className="border border-orange-100 bg-orange-50 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-orange-700">Order #{order.order_id}</span>
                    <span className="text-xs text-gray-500">{new Date(order.created_at).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-700">🛒 {order.product_name} × {order.quantity}</p>
                  <p className="text-sm text-gray-600">💳 {order.payment_mode} • ₹{order.total_price}</p>
                  <p className="text-xs text-gray-500 mt-1">📍 {order.location}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
