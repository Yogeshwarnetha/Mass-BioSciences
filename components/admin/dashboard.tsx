"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    FaGem,
    FaShoppingCart,
    FaUsers,
    FaChartLine,
    FaInfoCircle,
    FaStar,
    FaEye,
    FaRupeeSign,
    FaCalendarAlt,
    FaSpinner,
    FaSyncAlt,
} from "react-icons/fa";
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";

import toast from "react-hot-toast";

const Dashboard: React.FC = () => {
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [loading, setLoading] = useState(true);
    
    const [recentActivities, setRecentActivities] = useState<any[]>([]);

  

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

  




    

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'success': return 'bg-green-100 text-green-800 border-green-200';
            case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'order': return <FaShoppingCart className="w-4 h-4" />;
            case 'product': return <FaGem className="w-4 h-4" />;
            case 'user': return <FaUsers className="w-4 h-4" />;
            case 'review': return <FaStar className="w-4 h-4" />;
            default: return <FaInfoCircle className="w-4 h-4" />;
        }
    };

    return (
        <div className="space-y-6 p-6">
            {/* Welcome Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Welcome back, Admin! 👋
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Here's what's happening with your insights and contact submissions today.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        
                        <div className="flex items-center space-x-2 text-gray-500">
                            <FaCalendarAlt className="w-4 h-4" />
                            <span className="text-sm">
                                {currentTime.toLocaleDateString()} - {currentTime.toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

           

            

            {/* Custom CSS for animations */}
            <style>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Dashboard;