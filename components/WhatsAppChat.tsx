// components/WhatsAppChat.tsx
import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppChatProps {
  phoneNumber?: string;
  defaultMessage?: string;
  companyName?: string;
  showOnPages?: string[];
  hideOnPages?: string[];
}

const WhatsAppChat: React.FC<WhatsAppChatProps> = ({
  phoneNumber = "918125529956",
  defaultMessage = "Hello Mass Biosciences, I'm interested in your agricultural products. Can you provide more information?",
  companyName = "Mass Biosciences",
  showOnPages = [],
  hideOnPages = ['/admin', '/admin/login']
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(defaultMessage);
  const [currentPath, setCurrentPath] = useState('');
  
  // Get current path
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  // Check if chat should be shown on current page
  const shouldShowChat = () => {
    if (hideOnPages.some(path => currentPath.startsWith(path))) {
      return false;
    }
    
    if (showOnPages.length > 0) {
      return showOnPages.some(path => currentPath.startsWith(path));
    }
    
    return true;
  };

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  if (!shouldShowChat()) {
    return null;
  }

  // Quick message options
  const quickMessages = [
    {
      title: "Product Inquiry",
      message: "Hi, I'm interested in your products. Can you share your product catalog and pricing information?"
    },
    {
      title: "Become Distributor",
      message: "Hello, I'm interested in becoming a distributor for Mass Biosciences. Could you please share the requirements and process?"
    },
    {
      title: "Technical Support",
      message: "Hi, I need technical support for one of your products. Can you assist me?"
    },
    {
      title: "Bulk Order",
      message: "Hello, I'm looking to place a bulk order. Can you provide me with the details and pricing?"
    }
  ];

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div 
        className="fixed bottom-6 right-6 z-50 cursor-pointer group"
        onClick={handleToggle}
      >
        <div className="relative">
          <div className="bg-[#25D366] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
            <FaWhatsapp size={32} />
          </div>
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
        </div>
      </div>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-full w-10 h-10 flex items-center justify-center">
                  <FaWhatsapp size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-base text-white">{companyName}</h4>
                  <p className="text-xs text-white/90 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Typically replies within minutes
                  </p>
                </div> 
              </div>
              <button 
                className="text-white hover:bg-white/10 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                onClick={handleClose}
              >
                <span className="text-lg font-bold">×</span>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 bg-gray-50 max-h-[450px] overflow-y-auto">
            {/* Welcome Message */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <p className="text-sm text-gray-700 mb-2">Hello! 👋</p>
              <p className="text-sm text-gray-700 mb-2">
                Welcome to <span className="font-semibold text-emerald-600">{companyName}</span>. How can we help you today?
              </p>
              <p className="text-sm text-gray-600">
                Feel free to ask about our products, partnership opportunities, technical support, or bulk orders.
              </p>
            </div>

            {/* Message Input */}
            <div className="bg-white rounded-lg p-3 shadow-sm mb-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={3}
                className="w-full resize-none text-sm text-gray-700 placeholder-gray-400 focus:outline-none border border-gray-200 rounded-lg p-2"
              />
              <div className="flex gap-2 mt-3">
                <button 
                  className="flex-1 bg-[#25D366] text-white py-2 px-4 rounded-lg hover:bg-[#20BA5A] transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                  onClick={handleWhatsAppClick}
                >
                  <FaWhatsapp size={16} />
                  <span>Send to WhatsApp</span>
                </button>
                <button 
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  onClick={() => setMessage(defaultMessage)}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Quick Messages */}
            <div className="space-y-2">
              <p className="text-xs text-gray-500 font-medium">Quick messages:</p>
              <div className="flex flex-col gap-2">
                {quickMessages.map((quickMsg, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setMessage(quickMsg.message)}
                    className="text-left bg-white hover:bg-emerald-50 border border-gray-200 text-emerald-600 py-2 px-3 rounded-lg transition-colors text-sm"
                  >
                    {quickMsg.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                <span className="font-medium">Business Hours:</span> Mon - Sat, 9:00 AM - 6:00 PM
              </p>
              <p className="text-xs text-gray-500 mt-1">
                We'll get back to you as soon as possible during business hours.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white border-t border-gray-200 p-3">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <span>Click "Send to WhatsApp" to start conversation</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppChat;