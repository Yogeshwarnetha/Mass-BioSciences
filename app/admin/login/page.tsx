"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { loginAdmin } from "@/apirequests/adminAuth";
import toast, { Toaster } from "react-hot-toast";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

export default function AdminLoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // If already logged in, redirect to admin dashboard
        const adminAuthToken = Cookies.get("adminAuthToken");
        if (adminAuthToken) {
            router.push("/admin");
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await loginAdmin(formData);
            
            if (response.data?.token) {
                // Store the token in cookies
                Cookies.set("adminAuthToken", response.data.token, { expires: 1 }); // expires in 1 day
                
                toast.success("Login successful! Redirecting...");
                
                // Redirect to admin dashboard
                setTimeout(() => {
                    router.push("/admin");
                }, 1000);
            }
        } catch (error: any) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Toaster position="top-right" />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
                <div className="max-w-md w-full">
                    {/* Login Card */}
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white text-center">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <FaUser className="w-10 h-10 text-blue-600" />
                            </div>
                            <h1 className="text-3xl font-bold mb-2">Admin Portal</h1>
                            <p className="text-blue-100">TaxDeck Management System</p>
                        </div>

                        {/* Form */}
                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaUser className="text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="admin@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaLock className="text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Signing in...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaSignInAlt />
                                            <span>Sign In</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 px-8 py-4 text-center text-sm text-gray-600">
                            Secure admin access only
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="text-center mt-6 text-gray-600">
                        <p className="text-sm">
                            Need help? Contact system administrator
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
