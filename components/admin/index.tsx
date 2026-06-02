"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Typography, Avatar, Tooltip, IconButton, Badge, Chip } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
    FaGem,
    FaShoppingCart,
    FaUsers,
    FaImage,
    FaCog,
    FaTags,
    FaMoneyBillAlt,
    FaShippingFast,
    FaEnvelopeOpenText,
    FaListAlt,
    FaBars,
    FaTimes,
    FaBell,
    FaSignOutAlt,
    FaChevronLeft,
    FaChevronRight,
    FaTachometerAlt,
    FaSearch,
    FaPalette,
    FaNewspaper,
    FaFileInvoiceDollar,
    FaEnvelope,
} from "react-icons/fa";
import Cookies from "js-cookie";
// import './index.css';

const adminMenuSections = [
    {
        title: "Overview",
        items: [
            { id: 1, text: "Dashboard", route: "/admin", icon: <FaTachometerAlt className="w-5 h-5" />, badge: null },
            { id: 2, text: "Contact Submissions", route: "/admin/contacts", icon: <FaEnvelope className="w-5 h-5" />, badge: null },
            { id: 3, text: "Insights", route: "/admin/insights", icon: <FaNewspaper className="w-5 h-5" />, badge: null },
            { id: 4, text: "About Page", route: "/admin/about", icon: <FaFileInvoiceDollar className="w-5 h-5" />, badge: null },
            // { id: 9, text: "Analytics", route: "/admin/analytics", icon: <FaChartLine className="w-5 h-5" />, badge: null },
        ]
    },
    
    
];

interface AdminDashboardProps {
    children: ReactNode;
}

const AdminDashboardLayout: React.FC<AdminDashboardProps> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        const adminAuthToken = Cookies.get("adminAuthToken");
        if (!adminAuthToken) {
            router.push("/admin/login");
        }
    }, [router]);

    const handleLogout = () => {
        Cookies.remove("adminAuthToken");
        router.push("/admin/login");
    };

    const isActiveRoute = (route: string) => {
        if (route === "/admin" && pathname === "/admin") return true;
        return pathname?.startsWith(route) && route !== "/admin";
    };

    const SidebarContent = ({ isMobile = false }) => (
        <div className={`${isMobile ? 'h-full' : 'h-full'} bg-white text-blue-900 flex flex-col shadow-2xl border-r border-blue-100`}>
            {/* Logo Section */}
            <div className="flex-shrink-0 p-6 border-b border-blue-100 bg-white">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <FaFileInvoiceDollar className="w-6 h-6 text-white" />
                    </div>
                    {(sidebarOpen || isMobile) && (
                        <div className="flex flex-col">
                            <Typography variant="h6" className="font-bold text-xl text-blue-900">
                                RatanV
                            </Typography>
                            <Typography variant="caption" className="text-blue-400 font-medium">
                                Admin Portal
                            </Typography>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
                {adminMenuSections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-8">
                        {(sidebarOpen || isMobile) && (
                                <Typography
                                    variant="caption"
                                    className="text-blue-400 uppercase tracking-wider font-semibold px-3 py-3 block text-xs"
                                >
                                    {section.title}
                                </Typography>
                        )}
                        <div className="space-y-2">
                            {section.items.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        router.push(item.route);
                                        if (isMobile) setMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center space-x-3 px-4 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActiveRoute(item.route)
                                        ? 'bg-blue-100 text-blue-900 shadow-lg shadow-blue-500/10'
                                        : 'text-blue-400 hover:bg-blue-50 hover:text-blue-900 hover:shadow-md'
                                        }`}
                                >
                                    {/* Active indicator */}
                                    {isActiveRoute(item.route) && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />
                                    )}

                                    <div className={`flex-shrink-0 duration-300 ${isActiveRoute(item.route)
                                        ? 'text-blue-600'
                                        : 'text-blue-400 group-hover:text-blue-600'
                                        }`}>
                                        {item.icon}
                                    </div>

                                    {(sidebarOpen || isMobile) && (
                                        <>
                                            <span className="flex-1 text-left font-medium text-sm">{item.text}</span>
                                            {item.badge && (
                                                <Chip
                                                    label={item.badge}
                                                    size="small"
                                                    color={item.badge === 'New' ? 'secondary' : 'primary'}
                                                    className={`text-xs font-bold ${item.badge === 'New'
                                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                                                        : 'bg-gradient-to-r from-red-500 to-pink-500'
                                                        } text-white border-0`}
                                                />
                                            )}
                                        </>
                                    )}

                                    {!sidebarOpen && !isMobile && (
                                        <Tooltip title={item.text} placement="right" arrow>
                                            <div className="absolute inset-0" />
                                        </Tooltip>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Collapse Toggle */}
            {!isMobile && (
                <div className="flex-shrink-0 p-4 border-t border-blue-100 bg-white">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="w-full flex items-center justify-center p-3 rounded-xl text-blue-400 hover:bg-blue-50 hover:text-blue-900 transition-all duration-300 hover:shadow-lg"
                    >
                        {sidebarOpen ? (
                            <FaChevronLeft className="w-4 h-4" />
                        ) : (
                            <FaChevronRight className="w-4 h-4" />
                        )}
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen transition-colors duration-300 bg-white text-blue-900">
            {/* Desktop Sidebar */}
            <div className={`hidden lg:flex flex-col fixed left-0 top-0 h-screen z-30 transition-all duration-500 ease-in-out ${sidebarOpen ? 'w-80' : 'w-20'} overflow-y-auto custom-scrollbar`}>
                <SidebarContent />
            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex">
                    <div
                        className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <div className="relative w-80 bg-slate-900 transform transition-transform duration-300 ease-out">
                        <div className="absolute top-4 right-4 z-10">
                            <IconButton
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-white hover:bg-slate-700/50 backdrop-blur-sm rounded-xl"
                            >
                                <FaTimes />
                            </IconButton>
                        </div>
                        <SidebarContent isMobile={true} />
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className={`flex flex-col min-h-screen transition-all duration-500 ease-in-out ${sidebarOpen ? 'lg:ml-80' : 'lg:ml-20'
                } bg-blue-50`}>
                {/* Top Header */}
                <header className="sticky top-0 z-40 backdrop-blur-lg border-b transition-colors duration-300 bg-white border-blue-100">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                        {/* Left side */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="lg:hidden p-2 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                            >
                                <FaBars className="text-blue-600" />
                            </button>

                            {/* Search Bar */}
                            <div className={`relative transition-all duration-500 ${searchOpen ? 'w-80 opacity-100' : 'w-64 opacity-90'
                                }`}>
                                <div className="relative">
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white border-blue-200 text-blue-900 placeholder-blue-400"
                                        onFocus={() => setSearchOpen(true)}
                                        onBlur={() => setSearchOpen(false)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center space-x-3">
                            {/* Notifications */}
                            <Tooltip title="Notifications" arrow>
                                <IconButton className="relative transition-all duration-300 hover:scale-105 text-blue-600 hover:bg-blue-100">
                                    <Badge badgeContent={3} color="error" overlap="circular">
                                        <FaBell />
                                    </Badge>
                                </IconButton>
                            </Tooltip>

                            {/* Settings */}
                            <Tooltip title="Settings" arrow>
                                <IconButton
                                    onClick={() => router.push('/admin')}
                                    className="transition-all duration-300 hover:scale-105 text-blue-600 hover:bg-blue-100"
                                >
                                    <FaCog />
                                </IconButton>
                            </Tooltip>

                            {/* User Profile & Logout */}
                            <div className="flex items-center space-x-3 ml-2">
                                <div className="flex items-center space-x-3 bg-blue-50 rounded-xl px-3 py-1.5">
                                    <Avatar
                                        className="w-8 h-8 bg-blue-600 shadow-lg"
                                        sx={{ width: 32, height: 32 }}
                                    >
                                        A
                                    </Avatar>
                                    <div className="hidden sm:block">
                                        <Typography variant="subtitle2" className="font-semibold text-blue-900">
                                            Admin User
                                        </Typography>
                                        <Typography variant="caption" className="text-blue-400">
                                            Administrator
                                        </Typography>
                                    </div>
                                </div>

                                <Tooltip title="Logout" arrow>
                                    <IconButton
                                        onClick={handleLogout}
                                        className="transition-all duration-300 hover:scale-105 text-blue-600 hover:bg-blue-100"
                                    >
                                        <FaSignOutAlt />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </header>



                {/* Main Content */}
                <main className="flex-1 transition-colors duration-300 bg-blue-50">
                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className="rounded-2xl transition-all duration-300 bg-white shadow-xl border border-blue-100">
                            {children || (
                                <div className="text-center py-20 px-6">
                                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                                        <FaTachometerAlt className="w-10 h-10 text-white" />
                                    </div>
                                    <Typography variant="h4" className="font-bold mb-4 text-gray-900">
                                        Welcome to Admin Dashboard
                                    </Typography>
                                    <Typography variant="body1" className="text-gray-600">
                                        Select a menu item to get started with managing your store.
                                    </Typography>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboardLayout;