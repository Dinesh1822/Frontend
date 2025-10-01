import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      location: 'Koregaon Park, Pune',
      rating: 5,
      text: 'The idli batter is absolutely perfect! My family loves the soft, fluffy idlis we get every morning. It tastes exactly like my grandmother used to make. The quality is consistently excellent.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      product: 'Premium Idli Batter'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      location: 'Baner, Pune',
      rating: 5,
      text: 'Just started ordering from Authentic India and I\'m impressed! The dosa batter makes the crispiest dosas, and their sambar powder is incredible. Highly recommend to anyone missing authentic South Indian taste.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      product: 'Crispy Dosa Batter'
    },
    {
      id: 3,
      name: 'Meera Nair',
      location: 'Wakad, Pune',
      rating: 5,
      text: 'As a working mother, this has been a lifesaver! Fresh, authentic taste without the hassle of preparation. My kids love the idlis and dosas, and I love the convenience.',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      product: 'Complete Breakfast Kit'
    },
    {
      id: 4,
      name: 'Suresh Reddy',
      location: 'Hinjewadi, Pune',
      rating: 5,
      text: 'The coconut chutney is fresh and delicious every single time. It reminds me of my mother\'s cooking. The delivery is always on time, and the packaging is excellent.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      product: 'Coconut Chutney'
    },
    {
      id: 5,
      name: 'Anitha Krishnan',
      location: 'Kothrud, Pune',
      rating: 5,
      text: 'Authentic India has made our Sunday breakfast special again! The vada mix is so easy to use, and the results are restaurant-quality. My husband is impressed every weekend!',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150',
      product: 'Medu Vada Mix'
    },
    {
      id: 6,
      name: 'Venkat Iyer',
      location: 'Viman Nagar, Pune',
      rating: 5,
      text: 'Outstanding quality and taste! The rasam powder creates the most aromatic and flavorful rasam. It\'s like having a piece of Tamil Nadu in Pune. Will definitely continue ordering.',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      product: 'Rasam Powder'
    }
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
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
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
            <Star className="w-4 h-4 text-orange-600 fill-current" />
            <span className="text-orange-600 font-medium">Customer Love</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            What Our <span className="text-orange-600">Customers</span> Say
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who trust us for authentic South Indian flavors. 
            Here's what they have to say about their experience.
          </p>
        </motion.div>

        {/* Overall Rating */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-800">4.9</span>
            <span className="text-gray-600">out of 5</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">500+ reviews</span>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-orange-200">
                <Quote className="w-8 h-8" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Product */}
              <div className="mb-4">
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                  {testimonial.product}
                </span>
              </div>

              {/* Customer Info */}
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Customer Retention Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">2hrs</div>
              <div className="text-gray-600">Average Response Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">5K+</div>
              <div className="text-gray-600">Happy Families Served</div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Our Happy Customers
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;