import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
interface WhatsAppChatProps {
  phoneNumber?: string;
  defaultMessage?: string;
  companyName?: string;
  showOnPages?: string[]; // Pages to show the chat on
  hideOnPages?: string[]; // Pages to hide the chat on
}

const WhatsAppChat: React.FC<WhatsAppChatProps> = ({
  phoneNumber = "917416175558", // Replace with your actual WhatsApp number
  defaultMessage = "Hello TaxDeck, I need help with company incorporation and tax filings. Can you assist me?",
  companyName = "TaxDeck",
  showOnPages = [],
  hideOnPages = ['/admin', '/admin/login'] // Hide on admin pages by default
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
    // Hide on admin pages
    if (hideOnPages.some(path => currentPath.startsWith(path))) {
      return false;
    }
    
    // If showOnPages is specified, only show on those pages
    if (showOnPages.length > 0) {
      return showOnPages.some(path => currentPath.startsWith(path));
    }
    
    // Otherwise show on all non-admin pages
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

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div 
        className="fixed bottom-6 right-6 z-50 cursor-pointer group"
        onClick={handleToggle}
      >
        <div className="relative">
          <div className="bg-[#25D366] text-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform duration-300">

            <FaWhatsapp size={28} />

          </div>
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
        </div>
      </div>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-[#145886] text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-full p-2">
                  <MessageCircle size={24} />
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
                className="text-white hover:bg-white/10 rounded-full p-2 transition-colors"
                onClick={handleClose}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 bg-gray-50 max-h-[400px] overflow-y-auto">
            {/* Welcome Message */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <p className="text-sm text-gray-700 mb-2">Hello! 👋</p>
              <p className="text-sm text-gray-700 mb-2">
                Welcome to <span className="font-semibold text-[#145886]">{companyName}</span>. How can we help you today?
              </p>
              <p className="text-sm text-gray-600">
                Feel free to ask about Company Incorporation, GST Filings, ITR, Annual Compliances, or DPIIT Registration.
              </p>
            </div>

            {/* Message Input */}
            <div className="bg-white rounded-lg p-3 shadow-sm mb-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={3}
                className="w-full resize-none text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              <div className="flex gap-2 mt-3">
                <button 
                  className="flex-1 bg-[#25D366] text-white py-2 px-4 rounded-lg hover:bg-[#20BA5A] transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                  onClick={handleWhatsAppClick}
                >
                  <Send size={16} />
                  Send to WhatsApp
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
                <button 
                  onClick={() => setMessage("Hi, I need help with Company Incorporation. Can you guide me through the process?")}
                  className="text-left bg-white hover:bg-[#145886]/5 border border-gray-200 text-[#145886] py-2 px-3 rounded-lg transition-colors text-sm"
                >
                  Company Incorporation
                </button>
                <button 
                  onClick={() => setMessage("I need assistance with GST filings and compliance. What services do you offer?")}
                  className="text-left bg-white hover:bg-[#145886]/5 border border-gray-200 text-[#145886] py-2 px-3 rounded-lg transition-colors text-sm"
                >
                  GST Filings
                </button>
                <button 
                  onClick={() => setMessage("Can you help me with Income Tax Return filing? What are your charges?")}
                  className="text-left bg-white hover:bg-[#145886]/5 border border-gray-200 text-[#145886] py-2 px-3 rounded-lg transition-colors text-sm"
                >
                  ITR Filings
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white border-t border-gray-200 p-3">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <MessageCircle size={12} />
              Click &quot;Send to WhatsApp&quot; to start conversation
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppChat;