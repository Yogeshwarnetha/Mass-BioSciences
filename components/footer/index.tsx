// components/Footer.tsx
'use client';

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, Leaf, Shield, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const products = [
    { name: "Micronutrients", href: "/products/micronutrients" },
    { name: "Bio-Fertilizers", href: "/products/bio-fertilizers" },
    { name: "Bio-Pesticides", href: "/products/bio-pesticides" },
    { name: "Bio-Fungicides", href: "/products/bio-fungicides" },
    { name: "Growth Promoters", href: "/products/growth-promoters" },
    { name: "Organic Products", href: "/products/organic-products" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Why Choose Us", href: "#why-us" },
    { name: "Contact Us", href: "/contact" },
  ];

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/mass-biosciences", color: "hover:bg-[#0077B5]" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/massbiosciences", color: "hover:bg-[#1DA1F2]" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/massbiosciences", color: "hover:bg-[#1877F2]" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/massbiosciences", color: "hover:bg-[#E1306C]" },
  ];

  

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>
      
      {/* Decorative Gradient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl" />

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12"
        >
          
          {/* Company Info - Logo & Description */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
             
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">MASS</span>
                </span>
                <span className="text-sm font-semibold text-gray-300 tracking-wide">BIOSCIENCES</span>
              </div>
            </Link>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              Pioneering sustainable agricultural solutions with advanced micronutrients,
              bio-fertilizers, and crop protection products for maximum yield and soil health.
            </p>
            
            {/* Tagline */}
            <div className="flex items-center gap-2 pt-2">
              <div className="w-1 h-1 rounded-full bg-emerald-400" />
              <p className="text-xs text-gray-400 tracking-wider">INNOVATIVE GROWTH • SUSTAINABILITY</p>
              <div className="w-1 h-1 rounded-full bg-emerald-400" />
            </div>

           
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="text-sm font-bold text-transparent bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-emerald-400 text-sm transition-all duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h3 className="text-sm font-bold text-transparent bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text uppercase tracking-wider mb-4">
              Our Products
            </h3>
            <ul className="space-y-2.5">
              {products.map((product) => (
                <li key={product.name}>
                  <Link
                    href={product.href}
                    className="text-gray-300 hover:text-emerald-400 text-sm transition-all duration-200 flex items-start group"
                  >
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{product.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h3 className="text-sm font-bold text-transparent bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text uppercase tracking-wider mb-4">
              Get in Touch
            </h3>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              {/* Email */}
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 transition-all duration-300">
                  <Mail className="text-emerald-400 w-4 h-4 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email Us</p>
                  <a 
                    href="mailto:info@massbiosciences.com" 
                    className="text-gray-300 hover:text-emerald-400 text-sm font-medium transition-colors"
                  >
                    info@massbiosciences.com
                  </a>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 transition-all duration-300">
                  <Phone className="text-green-400 w-4 h-4 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Call Us</p>
                  <a 
                    href="tel:+919876543210" 
                    className="text-gray-300 hover:text-emerald-400 text-sm font-medium transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>
              
              {/* Office */}
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 transition-all duration-300">
                  <MapPin className="text-emerald-400 w-4 h-4 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Corporate Office</p>
                  <p className="text-gray-300 text-sm">
                    Hyderabad, Telangana<br />
                    India - 500001
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Follow Us
              </h4>
              <div className="flex space-x-2">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-400 transition-all duration-200 ${social.color} hover:text-white hover:scale-110`}
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm">
            <div className="text-center md:text-left text-gray-400">
              © {currentYear} Mass Biosciences. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-emerald-400 transition-colors text-xs">
                Privacy Policy
              </Link>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-emerald-400 transition-colors text-xs">
                Terms of Service
              </Link>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <Link href="/disclaimer" className="text-gray-400 hover:text-emerald-400 transition-colors text-xs">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;