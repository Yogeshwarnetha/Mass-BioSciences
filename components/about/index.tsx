// app/about/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AboutPage() {
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
    { number: "10+", label: "Years of Excellence" },
    { number: "25+", label: "States Covered" },
  ];

  const milestones = [
    { year: "2013", title: "Company Founded", description: "Started operations with a vision to revolutionize Indian agriculture" },
    { year: "2015", title: "First Manufacturing Unit", description: "State-of-the-art facility with advanced R&D laboratory" },
    { year: "2018", title: "PAN India Presence", description: "Expanded distribution network across 20+ states" },
    { year: "2020", title: "International Recognition", description: "Received CIB&RC and Ecocert certifications" },
    { year: "2023", title: "100K+ Farmers", description: "Reached milestone of serving over 100,000 farmers" },
    { year: "2024", title: "Global Expansion", description: "Expanded operations to international markets" },
  ];

  const coreValues = [
    { title: "Innovation", description: "Continuously evolving with cutting-edge research and technology", gradient: "from-emerald-500 to-teal-500" },
    { title: "Sustainability", description: "Committed to eco-friendly solutions for a greener future", gradient: "from-green-500 to-emerald-500" },
    { title: "Quality", description: "Uncompromising standards in every product we deliver", gradient: "from-teal-500 to-cyan-500" },
    { title: "Farmers First", description: "Dedicated to maximizing yield and farmer prosperity", gradient: "from-emerald-600 to-green-600" },
    { title: "Excellence", description: "Striving for perfection in everything we do", gradient: "from-green-600 to-lime-600" },
    { title: "Trust", description: "Building lasting relationships through transparency", gradient: "from-emerald-500 to-green-500" },
  ];

  const teamMembers = [
    { name: "Dr. Rajesh Kumar", role: "Founder & CEO", expertise: "Agricultural Science", image: "/team/ceo.jpg" },
    { name: "Dr. Priya Sharma", role: "Head of R&D", expertise: "Biotechnology", image: "/team/rd-head.jpg" },
    { name: "Mr. Amit Patel", role: "Operations Director", expertise: "Supply Chain", image: "/team/operations.jpg" },
    { name: "Ms. Sneha Reddy", role: "Quality Assurance Head", expertise: "Quality Control", image: "/team/qa.jpg" },
  ];

  return (
    <main className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
      
      {/* Hero Section */}
      <motion.section 
        style={{ opacity, scale }}
        className="relative min-h-[50vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-600/20 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
            >
              About{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Mass Biosciences
              </span>
            </motion.h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="h-1 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto rounded-full mb-8"
            />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="max-w-3xl mx-auto text-gray-600 text-lg md:text-xl"
            >
              Redefining agricultural excellence through innovation, sustainability, 
              and scientific expertise since 2013.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Company Overview Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 md:py-28 bg-white relative"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Leading the Way in{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Agricultural Innovation
                </span>
              </h2>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                Established in 2013, Mass Biosciences has emerged as one of India's most trusted names in agricultural bioscience. 
                Our journey began with a simple yet powerful vision - to revolutionize Indian agriculture through sustainable, 
                science-backed solutions.
              </p>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                Today, we stand as a leading manufacturer and exporter of premium agricultural products, including 
                <strong className="text-emerald-600"> Micronutrients</strong>, 
                <strong className="text-emerald-600"> Bio-Fertilizers</strong>, 
                <strong className="text-emerald-600"> Bio-Pesticides</strong>, 
                <strong className="text-emerald-600"> Bio-Fungicides</strong>, and 
                <strong className="text-emerald-600"> Organic Products</strong>.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Quality Assured</p>
                    <p className="text-sm text-gray-500">ISO Certified Products</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Eco-Friendly</p>
                    <p className="text-sm text-gray-500">Zero Toxic Residue</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Stats Grid */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, type: "spring" }}
                  className="bg-gradient-to-br from-gray-50 to-emerald-50/30 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-500" />
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 md:py-28 bg-gradient-to-br from-emerald-50/50 to-green-50/30"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-emerald-500 to-green-500" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower farmers with innovative, sustainable, and high-quality agricultural solutions 
                that enhance crop yield, improve soil health, and ensure food security for future generations.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become a global leader in agricultural bioscience, driving sustainable farming practices 
                and contributing to a healthier, more prosperous world through scientific excellence and innovation.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Journey Timeline */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 md:py-28 bg-white relative"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto rounded-full" />
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Milestones that define our path to excellence
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-emerald-500 to-green-500 hidden md:block" />
            
            <div className="space-y-12 md:space-y-0 relative">
              {milestones.map((milestone, idx) => {
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className={`relative md:flex md:items-center ${
                      idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    } ${idx !== milestones.length - 1 ? 'mb-12' : ''}`}
                  >
                    {/* Timeline Dot */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 z-10" />
                    
                    {/* Mobile Dot */}
                    <div className="md:hidden absolute left-0 w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 z-10" />
                    
                    {/* Content */}
                    <div className={`pl-14 md:pl-0 md:w-1/2 ${
                      idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'
                    }`}>
                      <div className="bg-gradient-to-br from-gray-50 to-emerald-50/30 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                        <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Core Values Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 md:py-28 bg-gradient-to-br from-emerald-50/50 to-green-50/30"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Core Values
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto rounded-full" />
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, type: "spring" }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className={`w-14 h-14 mb-4 rounded-full bg-gradient-to-r ${value.gradient} group-hover:scale-110 transition-transform duration-300`} />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Manufacturing Facility */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 md:py-28 bg-white relative"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                State-of-the-Art{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Manufacturing Facility
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full" />
              <p className="text-gray-600 text-lg leading-relaxed">
                Our advanced manufacturing facility is equipped with cutting-edge technology and 
                adheres to strict quality control measures. We maintain ISO-certified processes 
                to ensure every product meets the highest standards of purity and efficacy.
              </p>
              <div className="space-y-3">
                {[
                  "ISO 9001:2015 Certified Facility",
                  "Advanced R&D Laboratory",
                  "Quality Control at Every Stage",
                  "Eco-friendly Manufacturing Process"
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-green-600/20" />
                <img
                  src="/facility.jpg"
                  alt="Manufacturing Facility"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full blur-3xl opacity-30" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Certifications Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 md:py-28 bg-gradient-to-br from-emerald-50/50 to-green-50/30"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Certifications
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto rounded-full" />
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Recognized for our commitment to quality and excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "CIB&RC Registered", desc: "Central Insecticides Board & Registration Committee" },
              { name: "FCO 1985 Certified", desc: "Fertilizer Control Order Certified" },
              { name: "Ecocert Certified", desc: "Organic Product Certification" },
              { name: "ISO 9001:2015", desc: "Quality Management System" },
            ].map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: "spring" }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-bold text-gray-800 mb-2">{cert.name}</h3>
                <p className="text-xs text-gray-500">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
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
              Join Us in Our Mission
            </motion.h2>
            <p className="text-xl text-emerald-100 mb-8">
              Partner with Mass Biosciences to drive sustainable agriculture and make a difference 
              in the lives of farmers across India.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/products" className="inline-block px-8 py-3 bg-white text-emerald-700 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all">
                  Explore Products
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/become-distributor" className="inline-block px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all">
                  Become a Partner
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}