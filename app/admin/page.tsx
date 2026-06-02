"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ContactDashboard from "@/components/admin/dashboard";
import AdminDashboardLayout from "@/components/admin";

export default function AdminPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const adminAuthToken = Cookies.get("adminAuthToken");
        if (!adminAuthToken) {
            router.push("/admin/login");
        } else {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <AdminDashboardLayout>
            <ContactDashboard />
        </AdminDashboardLayout>
    );
}
