// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { motion, useScroll, useTransform } from 'framer-motion';

// Floating Particles Animation Component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-emerald-400 to-green-400 opacity-80"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 16 - 8, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  const stats = [
    { number: "100K+", label: "Happy Farmers" },
    { number: "250+", label: "Expert Team" },
    { number: "2000+", label: "Dealers Network" },
    { number: "150+", label: "Premium Products" },
  ];

  const products = [
    { name: "Micronutrients", desc: "Essential nutrients for optimal crop growth", gradient: "from-emerald-500 to-teal-500" },
    { name: "Bio-Fertilizers", desc: "Natural nitrogen-fixing solutions", gradient: "from-green-500 to-emerald-500" },
    { name: "Bio-Pesticides", desc: "Eco-friendly pest control", gradient: "from-teal-500 to-cyan-500" },
    { name: "Bio-Fungicides", desc: "Protection against fungal diseases", gradient: "from-emerald-600 to-green-600" },
    { name: "Growth Promoters", desc: "Boost plant development naturally", gradient: "from-green-600 to-lime-600" },
    { name: "Organic Products", desc: "100% certified organic solutions", gradient: "from-emerald-500 to-green-500" },
  ];

  return (
    <main className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
      
      {/* Hero Section with 3D Background */}
      <motion.section 
        style={{ opacity, scale }}
        className="relative min-h-screen w-full overflow-hidden"
      >
        {/* Particle Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80" />
          <FloatingParticles />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            {/* Brand Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
              className="inline-block mb-8"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(16, 185, 129, 0)",
                      "0 0 0 20px rgba(16, 185, 129, 0.1)",
                      "0 0 0 0 rgba(16, 185, 129, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="absolute inset-0 rounded-2xl"
                />
                <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl px-8 py-4 border border-white/20">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">MASS</span>
                    <br />
                    <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">BIOSCIENCES</span>
                  </h1>
                  <div className="h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 mt-2 rounded-full" />
                  <p className="text-sm md:text-base text-gray-600 mt-3 tracking-wider">INNOVATIVE GROWTH • SUSTAINABILITY</p>
                </div>
              </div>
            </motion.div>


            {/* Hero Text */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
            >
              Nourishing Tomorrow's
              <span className="relative inline-block mx-2">
                <span className="relative z-10 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Harvest
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                />
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent">
                Through Scientific Excellence
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="max-w-2xl mx-auto text-gray-600 text-lg md:text-xl mb-10"
            >
              Pioneering sustainable agricultural solutions with advanced micronutrients,
              bio-fertilizers, and crop protection products for maximum yield and soil health.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mb-16"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/products"
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-emerald-600 to-green-600 px-8 py-3 md:px-10 md:py-4 text-base md:text-lg font-semibold text-white inline-block"
                >
                  <span className="relative z-10">Explore Our Products</span>
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500"
                  />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="rounded-full border-2 border-green-600 bg-transparent px-8 py-3 md:px-10 md:py-4 text-base md:text-lg font-semibold text-green-700 hover:bg-green-50 transition-all inline-block"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="text-center"
            >
              <p className="text-sm font-medium uppercase tracking-wide text-gray-400 mb-4">
                Trusted By Leading Agricultural Institutions
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                {["CIB&RC", "FCO 1985", "Ecocert", "ISO Certified"].map((cert, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + idx * 0.1 }}
                    whileHover={{ scale: 1.1, color: "#10b981" }}
                    className="text-sm md:text-base font-semibold text-gray-500 cursor-pointer"
                  >
                    {cert}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </motion.section>

      {/* About Us Section - Logo Left, Text Right with Original Colors */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-24 md:py-32 bg-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-100/20 to-green-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-100/10 to-green-100/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Title */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Mass Biosciences</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto rounded-full" />
          </motion.div>

          {/* Logo and Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Logo */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              className="flex justify-center items-center"
            >
              <div className="relative group">
                {/* Animated Ring Background */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-4 border-dashed border-emerald-400/30"
                  style={{
                    width: "300px",
                    height: "300px",
                    left: "-10px",
                    top: "-10px"
                  }}
                />
                
                {/* Pulsing Background */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-100/20 to-green-100/20"
                  style={{
                    width: "280px",
                    height: "280px",
                  }}
                />
                
                {/* Logo Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20">
                  <div className="p-8 md:p-12">
                    <img
                      src="/brand.png"
                      alt="Mass Biosciences Logo"
                      className="w-64 h-64 md:w-80 md:h-80 object-contain"
                    />
                  </div>
                  
                  {/* Shine Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
                
                {/* Decorative Corner Elements */}
                <div className="absolute -top-3 -left-3 w-16 h-16 border-t-4 border-l-4 rounded-tl-2xl border-emerald-500" />
                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-4 border-r-4 rounded-br-2xl border-green-500" />
              </div>
            </motion.div>

            {/* Right Side - Text Content */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Redefining Agricultural Excellence Since 2013
                </h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  Established with a vision to revolutionize Indian agriculture, <strong className="text-green-700">Mass Biosciences</strong> 
                  stands at the forefront of agricultural innovation, committed to <strong className="text-green-700">Innovative Growth</strong> and 
                  <strong className="text-green-700"> Sustainability</strong>.
                </p>
              </div>

              <div>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  We specialize in premium <strong>Micronutrients</strong>, <strong>Bio Products</strong>, <strong>Growth Promoters</strong>, 
                  and <strong>Bio-Fungicides & Organic Products</strong> - all formulated with premium quality organic raw materials for maximum efficiency and performance.
                </p>
              </div>

              {/* Key Features List */}
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "✓ Research-Driven Formulations",
                  "✓ Eco-Friendly Solutions",
                  "✓ ISO Certified Quality",
                  "✓ PAN India Distribution",
                  "✓ 100+ Product Portfolio",
                  "✓ Expert Technical Support"
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                  </motion.div>
                ))}
              </div> */}

              {/* Stats Grid */}
              {/* <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, type: "spring", stiffness: 200 }}
                    className="text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent"
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div> */}

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pt-4"
              >
                <Link 
                  href="/about" 
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Discover Our Story
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Products Section with Cards */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 md:py-32 bg-gradient-to-br from-gray-50 to-emerald-50/40 relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Products</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto rounded-full mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Comprehensive range of agricultural solutions for modern farming
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className={`h-2 bg-gradient-to-r ${product.gradient}`} />
                <div className="p-8">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center mb-6"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-green-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{product.name}</h3>
                  <p className="text-gray-600 mb-6">{product.desc}</p>
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="inline-flex items-center text-green-600 font-semibold cursor-pointer"
                  >
                    Learn More <span className="ml-2">→</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-center mt-12"
          >
            <Link href="/products" className="inline-block px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all">
              View All Products
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 md:py-32 bg-white relative"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Mass Biosciences</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Research Driven", desc: "Cutting-edge R&D with scientific excellence", gradient: "from-emerald-500 to-teal-500" },
              { title: "Eco-Friendly", desc: "Zero toxic residue, safe for soil & environment", gradient: "from-green-500 to-emerald-500" },
              { title: "Quality Assured", desc: "ISO certified with rigorous testing", gradient: "from-teal-500 to-cyan-500" },
              { title: "Farmer Focused", desc: "Solutions designed for maximum yield", gradient: "from-emerald-600 to-green-600" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: "spring" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-emerald-50/50 hover:shadow-xl transition-all cursor-pointer"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center`}
                >
                  <div className="w-10 h-10 bg-white rounded-full" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Partner Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-24 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-700" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1440 320%22%3E%3Cpath fill=%22%23ffffff%22 fill-opacity=%220.05%22 d=%22M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z%22%3E%3C/path%3E%3C/svg%3E')] bg-cover bg-bottom opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <motion.h2
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Become a Distributor
            </motion.h2>
            <p className="text-xl text-emerald-100 mb-8">
              Join Mass Biosciences as a distributor and tap into a thriving market with innovative products. 
              Enjoy competitive margins, dedicated support, and exclusive training to boost your success.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/become-distributor" className="inline-block px-10 py-4 bg-white text-green-700 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all text-lg">
                Apply Now →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 md:py-32 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get In <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Touch</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto rounded-full" />
            <p className="text-gray-600 mt-4 text-lg">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
                  </motion.div>
                </div>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <input type="text" placeholder="Subject" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
                </motion.div>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <textarea rows={5} placeholder="Your Message" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"></textarea>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}