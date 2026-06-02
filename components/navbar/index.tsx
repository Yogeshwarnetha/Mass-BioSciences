// components/Navbar.tsx
'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    if (href.startsWith("#")) return false;
    return pathname.startsWith(href);
  };

  // Corrected animation variants
  const containerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 20,
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-2xl"
          : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          
          {/* Logo Section - Premium Design */}
          <Link href="/" className="group relative">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex items-center gap-3"
            >
              {/* Animated Logo Container */}
              <img src="/logo.png" alt="Mass Biosciences Logo" className="w-16 h-16 md:w-24 md:h-24 object-contain" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, idx) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                onHoverStart={() => setHoveredItem(item.name)}
                onHoverEnd={() => setHoveredItem(null)}
                className="relative"
              >
                <Link
                  href={item.href}
                  className={`relative px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 inline-block ${
                    isActive(item.href)
                      ? "text-green-600"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  {/* Background hover effect */}
                  <motion.span
                    animate={{
                      backgroundColor: hoveredItem === item.name ? "rgba(16, 185, 129, 0.08)" : "transparent",
                    }}
                    className="absolute inset-0 rounded-xl -z-0"
                  />
                  
                  {/* Text */}
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Active Indicator - Modern Design */}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  
                  {/* Dot indicator on hover */}
                  {hoveredItem === item.name && !isActive(item.href) && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500"
                    />
                  )}
                </Link>
              </motion.div>
            ))}

           
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            variants={itemVariants}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-green-50 transition-all duration-300 group"
          >
            <div className="relative w-5 h-5">
              <span className={`absolute h-0.5 w-5 bg-gray-700 transform transition-all duration-300 group-hover:bg-green-600 ${isOpen ? 'rotate-45 top-2' : 'top-0'}`} />
              <span className={`absolute h-0.5 w-5 bg-gray-700 transform transition-all duration-300 group-hover:bg-green-600 ${isOpen ? 'opacity-0' : 'top-2 opacity-100'}`} />
              <span className={`absolute h-0.5 w-5 bg-gray-700 transform transition-all duration-300 group-hover:bg-green-600 ${isOpen ? '-rotate-45 top-2' : 'top-4'}`} />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-full w-96 max-w-[90vw] bg-white shadow-2xl z-50 lg:hidden"
            >
              {/* Mobile Menu Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">M</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-lg">
                        <span className="text-emerald-600">MASS</span>
                        <span className="text-gray-800"> BIOSCIENCES</span>
                      </div>
                      <p className="text-[9px] text-gray-400">INNOVATIVE GROWTH • SUSTAINABILITY</p>
                    </div>
                  </Link>
                  
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Mobile Menu Items */}
              <div className="p-6 space-y-2">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                        isActive(item.href)
                          ? "bg-gradient-to-r from-emerald-50 to-green-50 text-green-600"
                          : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

          ß

                {/* Mobile Menu Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pt-8 mt-6 border-t border-gray-100"
                >
                  <div className="space-y-2 text-center">
                    <p className="text-xs text-gray-500">📞 +91 98765 43210</p>
                    <p className="text-xs text-gray-500">✉️ info@massbiosciences.com</p>
                    <p className="text-xs text-gray-400 mt-2">© 2024 Mass Biosciences</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;