import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Clock } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Clock, value: '1+', label: 'Year of Excellence' },
    { icon: Users, value: '5K+', label: 'Happy Families' },
    { icon: Heart, value: '100%', label: 'Customer Satisfaction' }
  ];

  const values = [
    {
      title: 'Authenticity',
      description: 'We preserve traditional South Indian recipes passed down through generations.',
      icon: '🏛️'
    },
    {
      title: 'Quality',
      description: 'Only the finest ingredients make it to our products, ensuring premium quality.',
      icon: '⭐'
    },
    {
      title: 'Freshness',
      description: 'Made fresh daily and delivered to your doorstep within hours of preparation.',
      icon: '🌱'
    },
    {
      title: 'Trust',
      description: 'Building lasting relationships with our customers through consistent quality.',
      icon: '🤝'
    }
  ];

  return (
    <section id="about" className="scroll-mt-32 py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-orange-100 rounded-full px-4 py-2 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Heart className="w-4 h-4 text-orange-600" />
              <span className="text-orange-600 font-medium">Our Story</span>
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Bringing <span className="text-orange-600">Authentic</span> 
              <br />South Indian Flavors to Your Home
            </h2>

            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p className="text-lg">
                Founded in 2025 by Mr. Rajesh Kumar, Authentic India Fresh Foods began as a 
                passionate venture in Pune with a simple mission: to share the authentic taste 
                of traditional South Indian cuisine with families across the city.
              </p>

              <p>
                What started as a dream to bring fresh, homemade South Indian delicacies to busy 
                families has quickly grown into a trusted brand. Our commitment to quality, 
                authenticity, and freshness drives everything we do.
              </p>

              <p>
                Every product is crafted using time-honored recipes, premium ingredients sourced 
                directly from local farmers, and traditional preparation methods that preserve the 
                authentic taste and nutritional value.
              </p>
            </div>

            {/* Founder Quote */}
            <motion.div
              className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border-l-4 border-orange-500"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <p className="text-gray-700 italic mb-3">
                "Food is not just nourishment; it's a way to connect with our roots, our culture, 
                and our loved ones. Every batch we make carries the love and tradition of generations."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Mr. Rajesh Kumar</p>
                  <p className="text-sm text-gray-600">Founder & Chief Recipe Curator</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
  <img
    src="/src/about.svg"
    alt="Traditional South Indian kitchen"
    className="w-full h-96 object-cover"
    loading="lazy"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
</div>

            {/* Floating Stats Card */}
            <motion.div
              className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">2025</div>
                <div className="text-gray-600 text-sm">Est. Year</div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-8 -right-8 bg-white rounded-2xl p-6 shadow-xl"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">100%</div>
                <div className="text-gray-600 text-sm">Natural</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from sourcing ingredients to serving our customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;