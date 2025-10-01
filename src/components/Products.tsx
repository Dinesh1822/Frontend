import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Leaf, Award } from 'lucide-react';
import idliBatterImage from '../Batter.jpg';
import { useState } from 'react';
import OrderModal from './OrderModal.tsx';
const Products: React.FC = () => {
  const products = [
    {
      id: 1,
      name: 'Premium Idli/Dosa Batter',
      description: 'Soft, fluffy idlis/Dosa every time with our traditional fermented batter made from premium urad dal and rice.',
      image: idliBatterImage,
      price: '₹120',
      weight: '1kg',
      rating: 4.9,
      features: ['Naturally Fermented', 'No Preservatives', 'Ready to Cook'],
      badge: 'Bestseller'
    }
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(products[0]);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="products" className="scroll-mt-32 py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-orange-100 rounded-full px-4 py-2 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Leaf className="w-4 h-4 text-orange-600" />
            <span className="text-orange-600 font-medium">Fresh & Natural</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Our <span className="text-orange-600">Premium</span> Products
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our range of authentic South Indian food products, made with traditional recipes 
            and the finest ingredients for an unforgettable culinary experience.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
  className="flex justify-center"
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
          {products.map((product) => (
    <motion.div
      key={product.id}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden w-full max-w-sm"
      variants={itemVariants}
      whileHover={{ y: -10 }}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                    product.badge === 'Bestseller' ? 'bg-green-500' :
                    product.badge === 'Premium' ? 'bg-purple-500' :
                    product.badge === 'New' ? 'bg-blue-500' :
                    product.badge === 'Fresh' ? 'bg-orange-500' :
                    product.badge === 'Signature' ? 'bg-red-500' :
                    'bg-gray-500'
                  }`}>
                    {product.badge}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-800">{product.rating}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-orange-50 text-orange-600 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price and Weight */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-800">{product.price}</span>
                    <span className="text-gray-500 ml-1">/ {product.weight}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Fresh Daily</span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <motion.button
  onClick={() => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }}
  className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  Order Now
</motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quality Assurance */}
        <motion.div
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">100% Natural</h4>
              <p className="text-gray-600 text-sm">No artificial preservatives or chemicals</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Fresh Daily</h4>
              <p className="text-gray-600 text-sm">Made fresh every morning</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Premium Quality</h4>
              <p className="text-gray-600 text-sm">Finest ingredients sourced locally</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Traditional Recipe</h4>
              <p className="text-gray-600 text-sm">Authentic family recipes passed down generations</p>
            </div>
          </div>
        </motion.div>
      </div>
      <OrderModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  productName={selectedProduct.name}
  productPrice={parseInt(selectedProduct.price.replace('₹', ''))}
/>
    </section>
  );
};

export default Products;